var Items = function(name, manacost) 
{
    this.name = name;
    this.manaCost = manacost;
};

Items.prototype = Object.create(Items.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
Items.prototype.constructor = Items;

Items.prototype.Use = function(player)
{

}

Items.prototype.Create = function()
{
	
}

var Shield = function() 
{
    Items.call(this, "shield", 20);
    this.itemShield = new createjs.Shape();
    itemContainer.addChild(this.itemShield);
};

Shield.prototype = Object.create(Items.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
Shield.prototype.constructor = Shield;

Shield.prototype.Use = function(player)
{
    if(player.GetMana() >= this.manaCost)
        player.reverseHp = !player.reverseHp;
    else
        player.reverseHp = false;

    this.ShowShield(player.reverseHp);
}

Shield.prototype.Create = function()
{
   
}

Shield.prototype.ShowShield = function(visible)
{
	if(visible)
    	this.itemShield.graphics.setStrokeStyle(8,"round").beginStroke("blue").drawCircle(0, 0, 30);
	else
		this.itemShield.graphics.clear();
}
