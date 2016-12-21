/*
 * 
 * @Author: Filip Raiper34 Gulan
 */
cellMatrix = function cell(game, widthCount, heightCount, surroundingType, stagesCount, steps)
{
    this.initialize(game, widthCount, heightCount, surroundingType, stagesCount, steps);
};

cellMatrix.initialize = function(game, widthCount, heightCount, surroundingType, stagesCount, steps)
{
    this.game = game;
    this.widthCount = widthCount;
    this.heightCount = heightCount;
    this.surroundingType = surroundingType;
    this.stagesCount = stagesCount;
    this.steps = steps;
    
    //Array of cells
    this.content = new Array(widthCount);
    for(i = 0; i < widthCount; i++) //create array of arrays - 2d array
    {
        this.content[i] = new Array(heightCount)
    }
};

cellMatrix.generateCells = function()
{
    
};

cellMatrix.generateSeeds = function()
{
    
}

cellMatrix.draw = function()
{
    
};

cellMatrix.colors = [
    0xf44336, //red
    0xe91e63, //pink
    0x9c27b0, //purple
    0x673ab7, //deeppurple
    0x3f51b5, //indigo
    0x2196f3, //blue
    0x03a9f4, //lightblue
    0x00bcd4, //cyan
    0x009688, //teal
    0x4caf50, //teal
    0x8bc34a, //lightgreen
    0xcddc39, //lime
    0xffeb3b, //yellow
    0xffc107, //amber
    0xff9800, //orange
    0xff5722, //deeporange
    0x795548, //brown
    0x9e9e9e //grey
];

cellMatrix.prototype = Object.create(Object.prototype);
cellMatrix.prototype.constructor = cellMatrix;

