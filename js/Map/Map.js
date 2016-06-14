var MapTileFactory = function(squareSize)
{
    this.squareSize = squareSize;
};

MapTileFactory.prototype = Object.create(MapTileFactory.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
MapTileFactory.prototype.constructor = MapTileFactory;



MapTileFactory.prototype.GetTileType = function(tile, i, color)
{
    console.log(tile.Type);
    switch(tile.Type)
    {
        case "wall":
            return new WallTile(tile.X * 52, tile.Y * 52, this.squareSize, i);
        case "floor":
            return new MapTile(tile.X * 52, tile.Y * 52, this.squareSize, tile.Type, i, color);
        case "healPad":
            return new HealPadTile(tile.X * 52, tile.Y * 52, this.squareSize, i, tile.Amount);
        case "spikeTile":
            return new TrapTile(tile.X * 52, tile.Y * 52, this.squareSize, i, "black", tile.Amount);
        case "portalTile":
            return new PortalTile(tile.X * 52, tile.Y * 52, this.squareSize, i, tile.Name);
        case "playerSpawn":
            player.Spawn(tile.X * 52, tile.Y * 52);
            return new MapTile(tile.X * 52, tile.Y * 52, this.squareSize, tile.Type, i, color);
        default:
            return new MapTile(tile.X * 52, tile.Y * 52, this.squareSize, "empty", i, "#333333");

    }
}

var Map = function(w, h, s)
{
    this.rows = ~~(w/55) + 2;
    this.columns = ~~(h/55) + 2;
    this.stage = s;
    this.map = [];
};

Map.prototype = Object.create(Map.prototype);

Map.prototype.constructor = Map;

Map.prototype.Create = function(squareSize, color1, color2, mapArray)
{
    this.rows = (mapArray[0].Width);
    this.columns = (mapArray[0].Height);
    World.width = this.rows * 52;
    World.height = this.columns * 52;
    let color = color2;
    let factory = new MapTileFactory(squareSize);
    for(let i = 1 ; i < Object.keys(mapArray).length; i++)
    {
        //console.log(mapArray[i].X);
        /*mt = new MapTile(mapArray[i].X * 52, mapArray[i].Y * 52, squareSize, mapArray[i].Type, i, color);
        player.Spawn(16, 16);*/
        mt = factory.GetTileType(mapArray[i], i, color);
        this.map.push(mt);
        this.stage.addChild(mt.Create(mt));
        color = (color == color2 ? color1 : color2);
    }
    /*for (let x = 0, j = 0; j < this.rows; x+=52, j++)
    {
        color = (color == color2 ? color1 : color2);
        for (let y = 0, i=0; i < this.columns; y+=52, i++)
        {
            mt = new MapTile(x, y, squareSize, "grass", j+i, color);
            let mt;
            if(mapArray[i][j] == "W")
                mt = new WallTile(x, y, squareSize, j+i);
            else if(mapArray[i][j] == "P")
                mt = new PortalTile(x, y, squareSize, j+i);
            else if(mapArray[i][j] == "G")
                mt = new MapTile(x, y, squareSize, "grass", j+i, color);
            else if(mapArray[i][j] == "T")
                mt = new TrapTile(x, y, squareSize, j+i);
            else if(mapArray[i][j] == "H")
                mt = new HealPadTile(x, y, squareSize, j+i, 1);
            else if(mapArray[i][j] == "S")
                mt = new ItemTile(x, y, squareSize, j+i, new Shield(), color);
            else if(mapArray[i][j] == "B")
                mt = new ItemTile(x, y, squareSize, j+i, new Bow(), color);
            else if(mapArray[i][j] == "*")
            {
                mt = new MapTile(x, y, squareSize, "grass", j+i, color);
                player.Spawn(x, y);
            }
            else
            {
                mt = new MapTile(x, y, squareSize, "empty", j+i, "#333333");
            }

            this.map.push(mt);
            this.stage.addChild(mt.Create(mt));
        }
    }*/
}

Map.prototype.GetMapTile = function(ind)
{
    let returnTile = this.map[ind];
    return returnTile;
}

Map.prototype.ResetMapFile = function(squareSize, color1, color2)
{
    createjs.Ticker.paused = true;
    this.stage.removeAllChildren();
    this.map = [];
    this.Create(squareSize, color1, color2, mapArray);
    createjs.Ticker.paused = false;
}