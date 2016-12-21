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
        matrix = new cellMatrix(this.game);
        matrix.initialize(10, 10, 10, 5, 5, 10); 
    }
}