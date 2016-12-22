/*
 * Canvas screen
 * Canvas where generate output
 * @Author: Filip Gulan
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
        matrix.initialize(16, 16, 0, 3, 4, 4); 
    }
}