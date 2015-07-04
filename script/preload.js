var PreloadState =
{
	preload: function()
	{
		game.load.tilemap('level1', '../level/level1.csv');
		game.load.image('tiles', '../image/testTiles.png');
		//Step 1 Load image for 16x16 sword
		game.load.image('sword', '../image/sword.png');
		game.load.spritesheet('touchbuttons', '../image/touchButtons.png', 64, 215);
		game.load.spritesheet('wizard', '../image/wizard.png', 16, 16);
		game.load.spritesheet('projectile', '../image/projectile.png', 8, 8);
	},

	create: function()
	{
		game.state.start('Gameplay');
	}
};