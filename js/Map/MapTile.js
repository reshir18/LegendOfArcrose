var MapTile = function(x, y, wh, t, i, c) 
{
    this.x = x;
    this.y = y; 
    this.size = wh;
    this.type = t;
    this.index = i;
    this.tileColor = c;
    this.position = {x: this.x, y: this.y, width: this.size, height: this.size};
    this.hasAction = false;
};

MapTile.prototype = Object.create(MapTile.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
MapTile.prototype.constructor = MapTile;

MapTile.prototype.landAction = function(player)
{
   //alert("this object has no action");
}

MapTile.prototype.Create = function(tile)
{
	let rectTemp = new createjs.Shape();
    rectTemp.graphics.beginFill(tile.tileColor).drawRect(tile.x, tile.y, tile.size, tile.size);
    return rectTemp;
}

MapTile.prototype.Position = function()
{
	return this.position;
}
