var game;
var GameResolution;

var LeftButtonDown = false;
var RightButtonDown = false;
var BButtonDown = false;
var AButtonDown = false;

var main = function()
{
	GameResolution =
	{
		width: 256,
		height: (window.mobileAndTabletCheck() ? 455 : 240)
	};

	game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, "gameDiv", null, false, false);
	game.state.add('Gameplay', GameplayState, false);
	game.state.add('Preload', PreloadState, false);
	game.state.add('Setup', SetupState, true);
}