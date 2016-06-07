var Potion = function(x, y, w, h, a, t) 
{
	ActionObject.call(this, x, y, w, h);
	let data = {
        images: ["images/potions.png"],
        frames: {width:w, height:h},
        animations: {
            heal:0,
            mana:1,
            xp: 2
        }
    };
    var spriteSheet = new createjs.SpriteSheet(data);
    this.amount = a;
    this.type = t;
    this.sprite = new createjs.Sprite(new createjs.SpriteSheet(data));
    this.sprite.gotoAndStop(t);
    this.sprite.setTransform(x,y);
};

Potion.prototype = Object.create(ActionObject.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
Potion.prototype.constructor = Potion;

Potion.prototype.playAction = function(player)
{
	switch(this.type)
    {
        case "heal": // A key 
            player.Heal(this.amount);
            break;
        case "xp": // W key
            player.GiveXp(this.amount);
            break;
        case "mana": // D key  
            player.RestoreMana(this.amount);
            break;
        default: 
            return;
    }
    //player.TakeDamages(this.damages);
    ui.Update(0, player.GetHp());
    ui.Update(1, player.GetMana());
    ui.Update(2, player.GetXp());
    this.type = "none";
    //ActionObject.prototype.removeActionObject(this);
}

Potion.prototype.placeActionObject = function()
{
	return this.sprite;
}

Potion.prototype.GetActionObject = function()
{
	return this.sprite;
}

Potion.prototype.checkContact = function(player)
{
	if(ActionObject.prototype.checkContact(player.GetSprite(), this))
    {
        this.playAction(player);
        return true;
    }
}