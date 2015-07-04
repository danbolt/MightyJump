var GameplayState =
{
	player: null,
	hater: null,
	map: null,
	layer: null,

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

		// Instantiate the player
		this.player = game.add.sprite(0, 0, 'wizard'); //Step 2 specify image for player
		this.player.animations.add('walkRight', [0, 1], 5, true, true);
		this.player.animations.add('walkLeft', [2, 3], 5, true, true);
		this.player.animations.add('shootRight', [4], 5, false, true);
		this.player.animations.add('shootLeft', [5], 5, false, true);
		game.physics.enable(this.player);//
		this.player.body.setSize(16, 16);
		
		// Instantiate the hater
		this.hater = game.add.sprite(0, 0, 'sword');
		game.physics.enable(this.hater);
		this.hater.body.setSize(16, 16);

		// Instantiate a tilemap
		this.map = game.add.tilemap('level1', 16, 16);
		this.map.addTilesetImage('tiles');
		this.layer = this.map.createLayer(0);
		this.layer.resizeWorld();
		this.map.setCollisionBetween(0, 7);

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
		game.debug.text(window.mobileAndTabletCheck() ? "mobile!" : "desktop", 16, 16, 'white');

		//game.debug.body(this.player, 'blue');//Draw the player member variable.  Give it colour blue
		game.debug.body(this.hater, 'red');
	}
};