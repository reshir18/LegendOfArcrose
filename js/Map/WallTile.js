var WallTile = function(x, y, wh, i, c)
{
	MapTile.call(this, x, y, wh, "wall", i, "grey");
    this.hasAction = true;
};

WallTile.prototype = Object.create(MapTile.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
WallTile.prototype.constructor = WallTile;

WallTile.prototype.landAction = function(player)
{
    player.SetOldPosition();
}

WallTile.prototype.Create = function(tile)
{
	let rectTemp = new createjs.Shape();
    rectTemp.graphics.beginFill(tile.tileColor).drawRect(tile.x, tile.y, tile.size, tile.size);
    return rectTemp;
}

WallTile.prototype.Position = function()
{
	return this.position;
}