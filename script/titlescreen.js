var TitleScreen = 
{
    spaceDown: false,

	create: function()
	{
		this.spaceDown = false;

		var logo = game.add.sprite(0, 48, 'logo');

		game.add.text(48, 240 / 2 + 64, 'press A or X to start', { font: '8px Conv_Gamegirl', fill: 'white', align: 'center' });

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
	},

	update: function()
	{
		if ((game.input.keyboard.isDown(Phaser.Keyboard.X) || AButtonDown) && this.spaceDown == false)
		{
			this.spaceDown = true;
		}
		else if (!(game.input.keyboard.isDown(Phaser.Keyboard.X) || AButtonDown) && this.spaceDown == true)
		{
			this.spaceDown = false;

			CurrentLevel = 0;
			PlayerScore = 0;
			PlayerHealth = 3;

			game.state.start('LevelStart');
		}
	}
};