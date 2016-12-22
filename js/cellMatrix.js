/*
 * Matrix of cells, basic logic of entire application
 * @Author: Filip Raiper34 Gulan
 */
cellMatrix = function cell(game)
{
    this.game = game;
};

cellMatrix.prototype = Object.create(Object.prototype);
cellMatrix.prototype.constructor = cellMatrix;

/**
 * Initialize matrix using params and draw into canvas
 * @param int widthCount
 * @param int heightCount
 * @param int surroundingType
 * @param int stagesCount
 * @param int stepsCount
 * @param int seedsCount
 */
cellMatrix.prototype.initialize = function(widthCount, heightCount, surroundingType, stagesCount, stepsCount, seedsCount)
{
    //Atributes
    this.widthCount = widthCount;
    this.heightCount = heightCount;
    this.surroundingType = surroundingType;
    this.stagesCount = stagesCount;
    this.stepsCount = stepsCount;
    this.seedsCount = seedsCount;
    
    //Array of cells
    this.content = new Array(widthCount);
    for(i = 0; i < widthCount; i++) //create array of arrays - 2d array
    {
        this.content[i] = new Array(heightCount)
    }
    //Temp array, for computation
    this.tempContent = new Array(widthCount);
    for(i = 0; i < widthCount; i++) //create array of arrays - 2d array
    {
        this.tempContent[i] = new Array(heightCount)
    }
    
    //Renderer
    if(typeof this.renderer != 'undefined')
    {
        this.renderer.kill();
    }
    this.renderer = this.game.add.graphics(0, 0);
    
    //Compose matrix
    this.generateCells();
    this.generateSeeds();
    this.doEvolution();
    //this.write();
    this.draw();
};

/**
 * Generate cells into matrix
 */
cellMatrix.prototype.generateCells = function()
{
    for(i = 0; i < this.widthCount; i++)
    {
        for(j = 0; j < this.heightCount; j++)
        {
            this.content[i][j] = new cell();
        }
    }
    //Temp
    for(i = 0; i < this.widthCount; i++)
    {
        for(j = 0; j < this.heightCount; j++)
        {
            this.tempContent[i][j] = new cell();
        }
    }
};

/**
 * Generate random seeds into matrix
 */
cellMatrix.prototype.generateSeeds = function()
{
    for(i = 0; i < this.seedsCount; i++)
    {
        while(true)
        {
            var randomStage = parseInt(Math.random() * 100) % this.stagesCount;
            var randomI = parseInt(Math.random() * 100) % this.widthCount;
            var randomJ = parseInt(Math.random() * 100) % this.heightCount;
            if(this.content[randomI][randomJ].stage == 0)
            {
                this.content[randomI][randomJ].stage = randomStage;
                this.tempContent[randomI][randomJ].stage = randomStage;
                break;
            }
        }
    }
};

/**
 * Draw matrix into canvas
 */
cellMatrix.prototype.draw = function()
{
    var randomColor = parseInt(Math.random() * 100) % this.colors.length;
    for(i = 0; i < this.widthCount; i++)
    {
        for(j = 0; j < this.heightCount; j++)
        {
            var calculatedHeight = this.game.world.height/this.heightCount;
            var calculatedWidth = this.game.world.width/this.widthCount;
            //var randomColor = parseInt(Math.random() * 100) % this.colors.length;
            this.renderer.beginFill(this.colors[(randomColor + this.content[i][j].stage) % this.colors.length], 1);
            this.renderer.drawRect(i * calculatedWidth - 1, j * calculatedHeight - 1, calculatedWidth + 1, calculatedHeight + 1);
            this.renderer.endFill();
        }
    }
};

/**
 * Write matrix into console - debuging purpose
 */
cellMatrix.prototype.write = function()
{
    for(i = 0; i < this.widthCount; i++)
    {
        var line = "";
        for(j = 0; j < this.heightCount; j++)
        {
            line = line + " | " + this.content[i][j].stage; 
        }
        console.log(line);
    }
}

/**
 * Do evolution whole cycle on matrix
 */
cellMatrix.prototype.doEvolution = function()
{
    for(var i = 0; i < this.stepsCount; i++)
    {
        this.evolve();
    }
};

/**
 * Make one evolve of matrix, eg one step
 */
cellMatrix.prototype.evolve = function()
{
    for(var i = 0; i < this.widthCount; i++)
    {
        for(var j = 0; j < this.heightCount; j++)
        {
            this.tempContent[i][j].stage = this.getEvolvedStage(i, j);
        }
    }
    //Replace actual with new computed cells
    for(var i = 0; i < this.widthCount; i++)
    {
        for(var j = 0; j < this.heightCount; j++)
        {
            this.content[i][j].stage = this.tempContent[i][j].stage;
        }
    }
;};

/**
 * Get evolved stage of cell on x and y position
 * @param int x
 * @param int y
 * @returns int evolved stage
 */
cellMatrix.prototype.getEvolvedStage = function(x, y)
{
    if(this.content[x][y].stage == 0)
    {
        if(this.surroundingType == 0) //von neumann
        {
            if(this.vonNeumanNeighbourhood(x,y) != 0)
            {
                return 1;
            }
            return 0;
        }
        else if(this.surroundingType == 1) //moore
        {
            if(this.mooreNeighbourhood(x,y) != 0)
            {
                return 1;
            }
            return 0;
        }
        else if(this.surroundingType == 2) //experimental
        {
            if(this.experimentalNeighbourhood(x,y) != 0)
            {
                return 1;
            }
            return 0;
        }
    }
    return (this.content[x][y].stage + 1) % this.stagesCount;
};

/**
 * Get if cell is evolving according on von Neuman neighbourhood
 * @param int x
 * @param int y
 * @returns int evoleve/notevolve
 */
cellMatrix.prototype.vonNeumanNeighbourhood = function(x, y)
{
    //Left
    var neighbour = this.getNeighbourStage(x + 1, y);
    if(neighbour != 0)
    {
        return 1;
    }
    //Right
    neighbour = this.getNeighbourStage(x - 1, y);
    if(neighbour != 0)
    {
        return 1;
    }
    //Top
    neighbour = this.getNeighbourStage(x, y - 1);
    if(neighbour != 0)
    {
        return 1;
    }
    //Down
    neighbour = this.getNeighbourStage(x, y + 1);
    if(neighbour != 0)
    {
        return 1;
    }
    return 0;
};

/**
 * Get if cell is evolving according on moore neighbourhood
 * @param int x
 * @param int y
 * @returns int evoleve/notevolve
 */
cellMatrix.prototype.mooreNeighbourhood = function(x, y)
{
    //Left
    var neighbour = this.getNeighbourStage(x + 1, y);
    if(neighbour != 0)
    {
        return 1;
    }
    //Right
    neighbour = this.getNeighbourStage(x - 1, y);
    if(neighbour != 0)
    {
        return 1;
    }
    //Top
    neighbour = this.getNeighbourStage(x, y - 1);
    if(neighbour != 0)
    {
        return 1;
    }
    //Down
    neighbour = this.getNeighbourStage(x, y + 1);
    if(neighbour != 0)
    {
        return 1;
    }
    //Left Top
    var neighbour = this.getNeighbourStage(x + 1, y + 1);
    if(neighbour != 0)
    {
        return 1;
    }
    //Left Down
    var neighbour = this.getNeighbourStage(x + 1, y - 1);
    if(neighbour != 0)
    {
        return 1;
    }
    //Right Top
    var neighbour = this.getNeighbourStage(x - 1, y + 1);
    if(neighbour != 0)
    {
        return 1;
    }
    //Right Down
    var neighbour = this.getNeighbourStage(x - 1, y - 1);
    if(neighbour != 0)
    {
        return 1;
    }
    return 0;
};

/**
 * Get if cell is evolving according on experimental neighbourhood
 * @param int x
 * @param int y
 * @returns int evoleve/notevolve
 */
cellMatrix.prototype.experimentalNeighbourhood = function(x, y)
{
    //Left Top
    var neighbour = this.getNeighbourStage(x + 1, y + 1);
    if(neighbour != 0)
    {
        return 1;
    }
    //Left Down
    var neighbour = this.getNeighbourStage(x + 1, y - 1);
    if(neighbour != 0)
    {
        return 1;
    }
    //Right Top
    var neighbour = this.getNeighbourStage(x - 1, y + 1);
    if(neighbour != 0)
    {
        return 1;
    }
    //Right Down
    var neighbour = this.getNeighbourStage(x - 1, y - 1);
    if(neighbour != 0)
    {
        return 1;
    }
    return 0;
};

/**
 * Get stage of cell on x and y position
 * @param int x
 * @param int y
 * @returns int stage
 */
cellMatrix.prototype.getNeighbourStage = function(x, y)
{
    if(x >= this.widthCount || y >= this.heightCount || x < 0 || y < 0) //out of boundaries
    {
        return 0;
    }
    else
    {
        return this.content[x][y].stage;
    }
};

/**
 * Material design colors - 18 colors in total
 * @type Array
 */
cellMatrix.prototype.colors = [
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

