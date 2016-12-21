/*
 * Canvas screen
 * Canvas where generate output
 * @Author: Filip Raiper34 Gulan
 */
canvas = function(game)
{
    this.game = game;
};

canvas.prototype = 
{
    
    create: function()
    {
        var graphics = this.game.add.graphics(0, 0);

        graphics.beginFill(0xFF0000, 1);
        //graphics.drawCircle(300, 300, 100);
        graphics.beginFill(0x673ab7);
        graphics.drawRect(200, 200, 300, 300);
        graphics.endFill();
        
    },
    
    update: function()
    {
        
    }
}