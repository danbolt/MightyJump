var LevelComplete =
{
	create: function()
	{
		CurrentLevel++;

		game.add.text(64, 240 / 2 - 32, 'nice you got gem', { font: '8px Conv_Gamegirl', fill: 'white', align: 'center' });
		game.add.text(82, 240 / 2 - 16, 'level ' + CurrentLevel + ' now', { font: '8px Conv_Gamegirl', fill: 'white', align: 'center' });

		game.add.sprite(256 / 2 - 8, 240 / 2 + 16, 'wizard', 32);

		game.time.events.add(1500, function() { game.state.start('Gameplay'); }, this);
	}
};