var GameplayState =
{
	player: null,
	hater: null,

	playerBullets: null,
	bulletSpeed: 125,

	enemies: null,

	map: null,
	layer: null,

	scoreText: null,

	preload: function()
	{
		//
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

		// Initialize the physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 750;
		
		// Instantiate the hater
		this.hater = game.add.sprite(32, 0, 'sword');
		game.physics.enable(this.hater);
		this.hater.body.setSize(16, 16);

		// Instantiate the player
		this.player = game.add.sprite(0, 0, 'wizard'); //Step 2 specify image for player
		this.player.animations.add('walkRight', [0, 1], 5, true, true);
		this.player.animations.add('walkLeft', [2, 3], 5, true, true);
		this.player.animations.add('shootRight', [4], 5, false, true);
		this.player.animations.add('shootLeft', [5], 5, false, true);
		this.player.facingRight = true;
		this.player.isShootButtonDown = false;
		this.player.canShoot = true;
		game.physics.enable(this.player);
		this.player.body.setSize(16, 16);

		// Instantiate the bullet group
		this.playerBullets = game.add.group(undefined, 'player bullets', false, true, Phaser.Physics.ARCADE);
		this.playerBullets.createMultiple(10, 'projectile', 0);
		this.playerBullets.setAll('outOfBoundsKill', true);
		this.playerBullets.setAll('checkWorldBounds', true);
		this.playerBullets.setAll('anchor', new Phaser.Point(0.5, 0.5));

		// set physics and animation data for the bullets.
		this.playerBullets.forEach(function(bullet) {
				bullet.body.allowGravity = false;

				bullet.animations.add('fly', [0, 1, 2, 3], 16, true, true);
				bullet.animations.play('fly');
			}, this, false);

		// Instantiate a tilemap
		this.map = game.add.tilemap(null);
		this.layer = this.map.create('default', 24, 15, 16, 16);
		this.layer.resizeWorld();
		this.map.setCollisionBetween(0, 7);
		this.map.addTilesetImage('tiles');

		for (var i = 0; i < 24; i++)
		{
			this.map.putTile(0, i, 13);
			this.map.putTile(0, i, 14);
		}

		// Have the Camera follow the player
		game.camera.follow(this.player);
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.layer);//perform collision detection between player and layer(map)
		game.physics.arcade.collide(this.hater, this.layer);
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || RightButtonDown)
		{
			this.player.body.velocity.x = 50;
			this.player.animations.play('walkRight');
			this.player.facingRight = true;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || LeftButtonDown)
		{
			this.player.body.velocity.x = -50;
			this.player.animations.play('walkLeft');
			this.player.facingRight = false;
		}
		else
		{
			this.player.body.velocity.x = 0;
		}

		if ((AButtonDown || game.input.keyboard.isDown(Phaser.Keyboard.Z)) && this.player.body.onFloor())
		{
			this.player.body.velocity.y = -250;
		}

		if ((BButtonDown || game.input.keyboard.isDown(Phaser.Keyboard.X)) && this.player.isShootButtonDown == false && this.player.canShoot == true)
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
			}
		}
		else if (!(BButtonDown || game.input.keyboard.isDown(Phaser.Keyboard.X)) && this.player.isShootButtonDown == true)
		{
			this.player.isShootButtonDown = false;
		}
	},

	render: function()
	{
		//game.debug.body(this.player, 'blue');//Draw the player member variable.  Give it colour blue
		//game.debug.body(this.hater, 'red');
	}
};