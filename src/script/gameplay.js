var GameplayState =
{
	preload: function()
	{
		//
	},

	create: function()
	{
		//
	},

	render: function()
	{
		game.debug.text(window.mobileAndTabletCheck() ? "mobile!" : "desktop", 16, 16, 'white');
	}
};