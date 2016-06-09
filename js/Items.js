var Items = function(name, manacost) 
{
    this.name = name;
    this.manaCost = manacost;
};

Items.prototype = Object.create(Items.prototype);

Items.prototype.constructor = Items;

Items.prototype.Use = function(player)
{
    ui.Update(1, player.GetMana());
}

Items.prototype.HurtMob = function(item, index, arrow)
{
    if(item.posX > uiContainer.x + Screen.width || item.posY > uiContainer.y + Screen.height || !item.isAlive)
        return;
    if(arrow.x >= item.posX && arrow.x <= item.posX + item.width && 
            arrow.y >= item.posY && arrow.y <= item.posY + item.height)
    {
        player.GiveXp(item.TakeDamages(player.GetAttack() / 2));
    }
}


var Shield = function() 
{
    Items.call(this, "shield", 20);
    this.itemShield = new createjs.Shape();
    itemContainer.addChild(this.itemShield);
};

Shield.prototype = Object.create(Items.prototype);

Shield.prototype.constructor = Shield;

Shield.prototype.Use = function(player, mouse)
{
    if(player.GetMana() >= this.manaCost)
        player.reverseHp = !player.reverseHp;
    else
        player.reverseHp = false;

    this.ShowShield(player.reverseHp);
    Items.prototype.Use(player);
}

Shield.prototype.ShowShield = function(visible)
{
	if(visible)
    	this.itemShield.graphics.setStrokeStyle(8,"round").beginStroke("blue").drawCircle(0, 0, 30);
	else
		this.itemShield.graphics.clear();
}

var Bow = function() 
{
    Items.call(this, "bow", 5);
    this.itemArrow = new createjs.Shape();
    itemContainer.addChild(this.itemArrow);
};

Bow.prototype = Object.create(Items.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
Bow.prototype.constructor = Bow;

Bow.prototype.Use = function(player, mouse)
{
    if(player.GetMana() >= this.manaCost)
    {
        player.TakeMana(this.manaCost);
        
        this.ThrowArrow(mouse, player);
        Items.prototype.Use(player);
    }
}

Bow.prototype.ThrowArrow = function(position, player)
{
    let arrowPositionX = position.mouseX;
    let arrowPositionY = position.mouseY;
    this.itemArrow.graphics.setStrokeStyle(2,"round").beginStroke("black").beginFill("red").drawCircle(0, 0, 10);
    
    if(itemContainer.x > Screen.width * 0.3)
        arrowPositionX += itemContainer.x - Screen.width * 0.3;
    if(itemContainer.y > Screen.height * 0.7)
        arrowPositionY += itemContainer.y - Screen.height * 0.7;

    arrowPositionX -= itemContainer.x;
    arrowPositionY -= itemContainer.y
    createjs.Tween.get(this.itemArrow)
        .to({x: arrowPositionX, y:arrowPositionY}, 2000 / player.GetSpeed())
        .set({x:0, y:0})
        .call(handleChange);
    function handleChange(event) 
    {
        this.graphics.clear();
        arrowPositionX += itemContainer.x;
        arrowPositionY += itemContainer.y
        arrowPositionX -= mobContainer.x;
        arrowPositionY -= mobContainer.y
        actorsMobs.forEach(function(value, index) { Items.prototype.HurtMob(value, index, this) }, {x: arrowPositionX, y:arrowPositionY});
    }
}