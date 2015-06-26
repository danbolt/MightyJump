var SetupState =
{
	resizeGame: function()
	{
		var scale = 1;

		if (window.innerWidth > window.innerHeight) 
		{
			scale = window.innerHeight / GameResolution.height * 0.95;
		}
		else
		{
			scale = window.innerWidth / GameResolution.width * 0.95;
		}

		game.scale.setUserScale(scale, scale);
		game.scale.refresh();
	},

	setScaling: function()
	{
		game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.setResizeCallback(this.resizeGame, this);
		this.resizeGame();
	},

	create: function()
	{
		this.setScaling();
		this.resizeGame();
		game.state.start('Preload');
	}
};