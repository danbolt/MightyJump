var LevelStart =
{
	create: function()
	{
		CurrentLevel++;

		game.add.text(64, 240 / 2, 'level ' + CurrentLevel + ' get ready', { font: '8px Conv_Gamegirl', fill: 'white', align: 'center' });

		game.time.events.add(1500, function() { game.state.start('Gameplay'); }, this);
	}
};