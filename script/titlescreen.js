var TitleScreen = 
{
    spaceDown: false,

	create: function()
	{
		this.spaceDown = false;

		game.add.text(80, 240 / 2, 'title screen', { font: '8px Conv_Gamegirl', fill: 'white', align: 'center' });

		game.add.text(48, 240 / 2 + 32, 'press space to start', { font: '8px Conv_Gamegirl', fill: 'white', align: 'center' });
	},

	update: function()
	{
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.spaceDown == false)
		{
			this.spaceDown = true;
		}
		else if (!(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) && this.spaceDown == true)
		{
			this.spaceDown = false;

			CurrentLevel = 0;
			PlayerScore = 0;

			game.state.start('LevelStart');
		}
	}
};