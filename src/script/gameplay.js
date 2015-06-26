var GameplayState =
{
	player: null,

	map: null,
	layer: null,

	preload: function()
	{
		//
	},

	create: function()
	{
		// Initialize the physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 750;

		// Instantiate the player
		this.player = game.add.sprite(0, 0, null);
		game.physics.enable(this.player);
		this.player.body.setSize(16, 16);

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
		game.physics.arcade.collide(this.player, this.layer);

		if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			this.player.body.velocity.x = 50;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		{
			this.player.body.velocity.x = -50;
		}
		else
		{
			this.player.body.velocity.x = 0;
		}

		if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && this.player.body.onFloor())
		{
			this.player.body.velocity.y = -250;
		}
	},

	render: function()
	{
		game.debug.text(window.mobileAndTabletCheck() ? "mobile!" : "desktop", 16, 16, 'white');

		game.debug.body(this.player, 'blue');
	}
};