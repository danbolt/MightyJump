var PreloadState =
{
	preload: function()
	{
		game.load.tilemap('level1', '../level/level1.csv');
		game.load.image('tiles', '../image/testTiles.png');
	},

	create: function()
	{
		game.state.start('Gameplay');
	}
};