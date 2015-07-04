var GameplayState =
{
	player: null,
	hater: null,
	endLevelGem: null,

	enemies: null,
	
	playerBullets: null,
	bulletSpeed: 125,

	enemies: null,

	map: null,
	layer: null,

	health: 0,
	startingHealth: 3,

	scoreText: null,
	
	endLevel: function()
	{
		game.state.start('LevelComplete');
	},

	damageEnemy: function(bullet, enemy)
	{
		bullet.kill();
		enemy.kill();

		PlayerScore += 10;
		this.scoreText.text = 'Score: ' + PlayerScore;
	},

	damagePlayer: function(player, enemy)
	{
		if (player.x < enemy.x)
		{
			this.knockBackPlayer(false);
		}
		else
		{
			this.knockBackPlayer(true);
		}
	},

	placeSwords: function(x, y, s)
	{
		this.hater = game.add.sprite(x, y, s);
		game.physics.enable(this.hater);
		this.hater.body.setSize(16, 16);	
	},

	spawnEnemy: function(x, y)
	{
		var newEnemy = this.enemies.getFirstDead();
		newEnemy.reset(x * 16, y * 16, 1);

	},
	
	getSword: function(player, sword)
	{
		sword.kill();
		PlayerScore += 100;
		this.scoreText.text = 'Score: ' + PlayerScore;
	},
	
	knockBackPlayer: function(right)
	{
		if (this.player.knockedBack == true)
		{
			return;
		}

		this.player.knockedBack = true;
		this.player.flickering = true;
		this.player.body.velocity.y = -125;
		this.player.body.velocity.x = right ? 100 : -100;
		this.game.time.events.add(300, function() { this.player.knockedBack = false; }, this);
		this.game.time.events.repeat(50, 20, function() { this.player.visible = !this.player.visible }, this);
		this.game.time.events.add(1000, function() { this.player.flickering = false; }, this);
	},

	generateLevel: function()
	{
		// Instantiate a tilemap
		this.map = game.add.tilemap(null);
		this.layer = this.map.create('default', 48, 15, 16, 16);
		this.layer.resizeWorld();
		this.map.setCollisionBetween(0, 7);
		this.map.addTilesetImage('tiles');

		// Generate the level floor
		for (var i = 0; i < 48; i++)
		{
			this.map.putTile(1, i, 13);
			this.map.putTile(1, i, 14);
		}

		var currentHeight = 0;
		// Generate the lengths
		for (var i = 0; i < 12; i++)
		{
			for (var j = 12; j > 12 - (currentHeight); j--)
			{
				var tileToPut = 2;
				if (j == 12 - (currentHeight) + 1)
				{
					tileToPut = 0;
				}

				this.map.putTile(tileToPut, i * 4, j);
				this.map.putTile(tileToPut, i * 4 + 1, j);
				this.map.putTile(tileToPut, i * 4 + 2, j);
				this.map.putTile(tileToPut, i * 4 + 3, j);
			}

			var roll = Math.random() * 10;
			if (roll < 4)
			{
				if (currentHeight < 4)
				{
					currentHeight = currentHeight + 2;
				}
			}
			else if (roll > 6)
			{
				if (currentHeight > 0)
				{
					currentHeight = currentHeight - 2;
				}
			}
			else
			{
				//
			}
		}

		this.endLevelGem = game.add.sprite(48 * 16 - 32, j * 16 - 16, 'wizard', 32);
		game.physics.enable(this.endLevelGem);
		this.endLevelGem.body.allowGravity = false;
	},

	preload: function()
	{
	},

	create: function()
	{
		// Initialize the touchscreen buttons
		var leftButton = game.add.button(0, 240, 'touchbuttons', undefined, this, 0, 0, 1, 0);
		leftButton.onInputDown.add(function() { LeftButtonDown = true; }, this);
		leftButton.onInputUp.add(function() { LeftButtonDown = false; }, this);
		leftButton.onInputOut.add(function() { LeftButtonDown = false; }, this);
		leftButton.fixedToCamera = true;
		var rightButton = game.add.button(64, 240, 'touchbuttons', function() {}, this, 2, 2, 3, 2);
		rightButton.onInputDown.add(function() { RightButtonDown = true; }, this);
		rightButton.onInputUp.add(function() { RightButtonDown = false; }, this);
		rightButton.onInputOut.add(function() { RightButtonDown = false; }, this);
		rightButton.fixedToCamera = true;
		var bButton = game.add.button(128, 240, 'touchbuttons', function() {}, this, 4, 4, 5, 4);
		bButton.onInputDown.add(function() { BButtonDown = true; }, this);
		bButton.onInputUp.add(function() { BButtonDown = false; }, this);
		bButton.onInputOut.add(function() { BButtonDown = false; }, this);
		bButton.fixedToCamera = true;
		var aButton = game.add.button(192, 240, 'touchbuttons', function() {}, this, 6, 6, 7, 6);
		aButton.onInputDown.add(function() { AButtonDown = true; }, this);
		aButton.onInputUp.add(function() { AButtonDown = false; }, this);
		aButton.onInputOut.add(function() { AButtonDown = false; }, this);
		aButton.fixedToCamera = true;

		this.generateLevel();

		// Initialize the physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 750;
		
		// Instantiate the an item
		this.placeSwords(64, 0, 'sword');

		this.enemies = game.add.group(undefined, 'enemies', false, true, Phaser.Physics.ARCADE);
		this.enemies.createMultiple(10, 'wizard', 18);
		this.enemies.forEach(function(enemy) { enemy.body.collideWorldBounds = true; enemy.body.setSize(8, 16); enemy.anchor.x = 0.5;}, this, false);

		this.spawnEnemy(8, 0);

		// Instantiate the player
		this.player = game.add.sprite(16, 64, 'wizard'); //Step 2 specify image for player
		this.player.animations.add('walkRight', [0, 1], 5, true, true);
		this.player.animations.add('walkLeft', [2, 3], 5, true, true);
		this.player.animations.add('shootRight', [4], 5, true, true);
		this.player.animations.add('shootLeft', [5], 5, true, true);
		this.player.facingRight = true;
		this.player.isShootButtonDown = false;
		this.player.canShoot = true;
		this.player.knockedBack = false;
		this.player.flickering = false;
		this.player.anchor.x = 0.5;
		game.physics.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.body.setSize(16, 16);

		// Instantiate the bullet group
		this.playerBullets = game.add.group(undefined, 'player bullets', false, true, Phaser.Physics.ARCADE);
		this.playerBullets.createMultiple(10, 'projectile', 0);
		this.playerBullets.setAll('outOfBoundsKill', true);
		this.playerBullets.setAll('checkWorldBounds', true);
		this.playerBullets.setAll('anchor', new Phaser.Point(0.5, 0.5));

		this.health = this.startingHealth;

		// set physics and animation data for the bullets.
		this.playerBullets.forEach(function(bullet) {
				bullet.body.allowGravity = false;

				bullet.animations.add('fly', [0, 1, 2, 3], 16, true, true);
				bullet.animations.play('fly');
			}, this, false);
		
		this.scoreText = game.add.text(8, 8, 'score: ' + PlayerScore, { font: '8px Conv_Gamegirl', fill: 'white' });
		this.scoreText.smoothed = false;
		this.scoreText.fixedToCamera = true;

		// Have the Camera follow the player
		game.camera.follow(this.player);
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.collide(this.hater, this.layer);
		game.physics.arcade.collide(this.enemies, this.layer);

		game.physics.arcade.overlap(this.player, this.hater, this.getSword, null, this);
		game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this);
		game.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);

		game.physics.arcade.overlap(this.player, this.endLevelGem, this.endLevel, null, this);
		
		if ((game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || RightButtonDown) && this.player.knockedBack == false)
		{
			this.player.body.velocity.x = 75;
			if (this.player.animations.currentAnim.name != 'shootRight')
			{
				this.player.animations.play('walkRight');
			}
			this.player.facingRight = true;
		}
		else if ((game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || LeftButtonDown) && this.player.knockedBack == false)
		{
			this.player.body.velocity.x = -75;
			if (this.player.animations.currentAnim.name != 'shootLeft')
			{
				this.player.animations.play('walkLeft');
			}
			this.player.facingRight = false;
		}
		else if (this.player.knockedBack == true)
		{
			//
		}
		else
		{
			this.player.body.velocity.x = 0;
		}

		if ((AButtonDown || game.input.keyboard.isDown(Phaser.Keyboard.Z)) && this.player.body.onFloor() && this.player.knockedBack == false)
		{
			this.player.body.velocity.y = -250;
		}

		if ((BButtonDown || game.input.keyboard.isDown(Phaser.Keyboard.X)) && this.player.isShootButtonDown == false && this.player.canShoot == true && this.player.knockedBack == false)
		{
			var newBullet = this.playerBullets.getFirstDead();

			this.player.isShootButtonDown = true;
			this.player.canShoot = false;
			this.game.time.events.add(250, function() { this.player.canShoot = true; }, this);

			if (newBullet != null)
			{
				newBullet.reset(this.player.x + (this.player.facingRight ? 16 : 0), this.player.y + 8, 1);
				newBullet.body.velocity.x = this.bulletSpeed * (this.player.facingRight ? 1 : -1);
				newBullet.lifespan = 750; // the bullet will live for a number of milliseconds

				this.player.animations.play(this.player.facingRight ? 'shootRight' : 'shootLeft');
				this.game.time.events.add(300, function() { this.player.animations.play(this.player.facingRight ? 'walkRight' : 'walkLeft'); }, this);
			}
		}
		else if (!(BButtonDown || game.input.keyboard.isDown(Phaser.Keyboard.X)) && this.player.isShootButtonDown == true)
		{
			this.player.isShootButtonDown = false;
		}

		if (this.player.flickering == false)
		{
			this.player.visible = true;
		}
	},

	render: function()
	{
		//this.enemies.forEach(function(enemy) { game.debug.body(enemy); }, this, false);
	}
	
};