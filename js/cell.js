/*
 * Represent one cell in cellmatrix
 * @Author: Filip Gulan
 */
cell = function cell(game)
{
    //Atributes
    this.game = game;
    this.stage = 0;
};

cell.prototype = Object.create(Object.prototype);
cell.prototype.constructor = cell;

