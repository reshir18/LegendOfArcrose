var TrapTile = function(x, y, wh, i, c)
{
	MapTile.call(this, x, y, wh, "trap", i, "black");
    this.damages = 0.5;
    this.hasAction = true;
};

TrapTile.prototype = Object.create(MapTile.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
TrapTile.prototype.constructor = TrapTile;

TrapTile.prototype.landAction = function(player)
{
    player.TakeDamages(this.damages);
    ui.Update(0, player.GetHp());
    ui.Update(1, player.GetMana());
}

TrapTile.prototype.Create = function(tile)
{
	let rectTemp = new createjs.Shape();
    rectTemp.graphics.beginFill(tile.tileColor).drawRect(tile.x, tile.y, tile.size, tile.size);
    return rectTemp;
}

TrapTile.prototype.Position = function()
{
	return this.position;
}

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