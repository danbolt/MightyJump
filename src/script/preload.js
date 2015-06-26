var PreloadState =
{
	preload: function()
	{
		game.load.tilemap('level1', '../level/level1.csv');
		game.load.image('tiles', '../image/testTiles.png');
		game.load.spritesheet('touchbuttons', '../image/touchButtons.png', 64, 215);
	},

	create: function()
	{
		game.state.start('Gameplay');
	}
};