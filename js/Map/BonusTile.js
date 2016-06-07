var HealPadTile = function(x, y, wh, i, c)
{
	MapTile.call(this, x, y, wh, "healPad", i, "#00CCFF");
    this.damages = 0.5;
    this.hasAction = true;
};

HealPadTile.prototype = Object.create(MapTile.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
HealPadTile.prototype.constructor = HealPadTile;

HealPadTile.prototype.landAction = function(player)
{
    if(player.GetMana() >= 1 && !player.IsFullHp())
    {
        player.Heal(2.5);
        player.TakeMana(1);
        ui.Update(0, player.GetHp());
        ui.Update(1, player.GetMana());
    }
}

HealPadTile.prototype.Create = function(tile)
{
	let rectTemp = new createjs.Shape();
    rectTemp.graphics.beginFill(tile.tileColor).drawRect(tile.x, tile.y, tile.size, tile.size);
    return rectTemp;
}

HealPadTile.prototype.Position = function()
{
	return this.position;
}

var ItemTile = function(x, y, wh, i, item, defaultColor)
{
    MapTile.call(this, x, y, wh, "item", i, "#663300");
    this.newItem = item;
    this.hasAction = true;
    this.defaultColor = defaultColor;
    this.rectangle = new createjs.Shape();
};

ItemTile.prototype = Object.create(MapTile.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
ItemTile.prototype.constructor = ItemTile;

ItemTile.prototype.landAction = function(player)
{
	player.GiveItem(this.newItem);
	this.hasAction = false;
	this.rectangle.graphics.clear();
	this.rectangle.graphics.beginFill(this.defaultColor).drawRect(this.x, this.y, this.size, this.size);
}

ItemTile.prototype.Create = function(tile)
{
    this.rectangle.graphics.beginFill(tile.tileColor).drawRect(tile.x, tile.y, tile.size, tile.size);
    return this.rectangle;
}

ItemTile.prototype.Position = function()
{
    return this.position;
}