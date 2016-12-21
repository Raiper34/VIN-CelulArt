/*
 * Loader screen
 * Load of all assets into programm
 * @Author: Filip Raiper34 Gulan
 */
loader = function (game) 
{
    this.game = game;
};

loader.prototype = 
{
    /*
     * Preload all assets
     */
	preload: function () 
    {    
        //Loading progress
        //this.game.add.text(this.game.world.width/2, this.game.world.height/2, 'Loading...', { font: '36px Arial', fontWeight: 'bold', fill: "#ffffff", align: "center" });
    },
    
    /*
     * Caling after preload all assets
     */
    create: function () 
    {
        unlockUi();
        this.state.start("canvas");
    }
};
