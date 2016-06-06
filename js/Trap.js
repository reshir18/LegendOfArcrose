var Trap = function(x, y, w, h, d) 
{
	ActionObject.call(this, x, y, w, h);
    this.damages = d;
};

Trap.prototype = Object.create(ActionObject.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
Trap.prototype.constructor = Trap;

Trap.prototype.playAction = function(player)
{
    player.TakeDamages(this.damages);
    ui.Update(0, player.GetHp());
}

Trap.prototype.placeActionObject = function()
{
	return ActionObject.prototype.placeActionObject(this, "black");
}

Trap.prototype.checkContact = function(player)
{
	if(ActionObject.prototype.checkContact(player.GetSprite(), this))
    {
        this.playAction(player);
    }
}