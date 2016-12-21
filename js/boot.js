/*
 * Boot
 * Prepare loading screen
 * @Author: Filip Raiper34 Gulan
 */
boot = function(game)
{
    this.game = game;
}

boot.prototype = 
{
    /*
     * Preload loading logo
     */
    preload: function()
    {
        //empty
    },
    
    /*
     * Set necesery variables, choose scale mode and start preloading assets state
     */
    create: function()
    {
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.canvas.id = 'applicationCanvas';
        //this.scale.pageAlignVertically = true;
        //this.scale.pageAlignHorizontally = true;
        this.state.start("loader");
    }
}