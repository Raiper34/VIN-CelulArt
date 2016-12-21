/*
 * 
 * @Author: Filip Raiper34 Gulan
 */
cell = function cell(game)
{
    //Atributes
    this.game = game;
    this.stage = 0;
};

cell.changeStage = function(stage)
{
    this.stage = stage;
}

cell.prototype = Object.create(Object.prototype);
cell.prototype.constructor = cell;

