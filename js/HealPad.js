var HealPad = function(x, y, w, h, a, c) 
{
	ActionObject.call(this, x, y, w, h);
    this.amount = h;
    this.cost = c;
};

HealPad.prototype = Object.create(ActionObject.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
HealPad.prototype.constructor = HealPad;

HealPad.prototype.playAction = function(player)
{
    if(player.GetMana() >= this.cost)
    {
        player.Heal(this.amount);
        player.TakeMana(this.cost);
        ui.Update(0, player.GetHp());
        ui.Update(1, player.GetMana());
    }
}

HealPad.prototype.placeActionObject = function()
{
    return ActionObject.prototype.placeActionObject(this, "#00CCFF");
}

HealPad.prototype.checkContact = function(player)
{
	if(ActionObject.prototype.checkContact(player.GetSprite(), this))
    {
        this.playAction(player);
    }
}