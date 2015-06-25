var GameplayState =
{
	player: null,

	preload: function()
	{
		//
	},

	create: function()
	{
		// Initialize the physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Instantiate the player
		this.player = game.add.sprite(0, 0, null);
		game.physics.enable(this.player);
		this.player.body.setSize(16, 16);
	},

	update: function()
	{
		//
	},

	render: function()
	{
		game.debug.text(window.mobileAndTabletCheck() ? "mobile!" : "desktop", 16, 16, 'white');

		game.debug.body(this.player, 'blue');
	}
};