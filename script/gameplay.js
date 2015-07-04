var GameplayState =
{
	player: null,
	hater: null,
	
	playerBullets: null,
	enemies: null,

	map: null,
	layer: null,

	scoreText: null,

	score: 0,
	scoreText: null,
	
	
	placeSwords: function(x, y, s)
	{
		this.hater = game.add.sprite(x, y, s);
		game.physics.enable(this.hater);
		this.hater.body.setSize(16, 16);	
	},
	
	getSword: function(player, sword)
	{
		sword.kill();
		this.score += 10;
		this.scoreText.text = 'Score: ' + this.score;
	},
	
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
		this.placeSwords(32, 0, 'sword');
/*		
		this.hater = game.add.sprite(32, 0, 'sword');
		game.physics.enable(this.hater);
		this.hater.body.setSize(16, 16);
*/


/*
		this.scollect = game.add.group();
		this.scollect.enableBody = true;
		
		for (var i = 0; i < 12; i++)
		{
			var s = scollect.create(i * 70, 0, 'sword');
			s.body.gravity.y = 6;
			s.body.bounce.y = 0.7 + Math.random() * 0.2;
		}
*/		
		// Instantiate the player
		this.player = game.add.sprite(0, 0, 'wizard'); //Step 2 specify image for player
		this.player.animations.add('walkRight', [0, 1], 5, true, true);
		this.player.animations.add('walkLeft', [2, 3], 5, true, true);
		this.player.animations.add('shootRight', [4], 5, false, true);
		this.player.animations.add('shootLeft', [5], 5, false, true);
		game.physics.enable(this.player);
		this.player.body.setSize(16, 16);

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
		
		this.scoreText = game.add.text(5, 5, 'score: 0', { fontSize: '10px', fill: '#128' });
		
	
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.layer);//perform collision detection between player and layer(map)
		game.physics.arcade.collide(this.hater, this.layer);
//		game.physics.arcade.collide(this.scollect, this.layer);

		game.physics.arcade.overlap(this.player, this.hater, this.getSword, null, this);
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || RightButtonDown)
		{
			this.player.body.velocity.x = 50;
			this.player.animations.play('walkRight');
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || LeftButtonDown)
		{
			this.player.body.velocity.x = -50;
			this.player.animations.play('walkLeft');
		}
		else
		{
			this.player.body.velocity.x = 0;
		}

		if ((AButtonDown || game.input.keyboard.isDown(Phaser.Keyboard.Z)) && this.player.body.onFloor())
		{
			this.player.body.velocity.y = -250;
		}
	},

	render: function()
	{
		//game.debug.body(this.player, 'blue');//Draw the player member variable.  Give it colour blue
		//game.debug.body(this.hater, 'red');
	}
	
};