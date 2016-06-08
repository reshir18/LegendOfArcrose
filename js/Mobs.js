var Mobs = function(x, y, w, h, l, s, xp, att) 
{
    this.posX = x;
    this.posY = y;
    this.width = w;
    this.height = h;
    this.life = l;
    this.speed = s,
    this.xp = xp;
    this.attack = att;
};

Mobs.prototype = Object.create(Mobs.prototype);

Mobs.prototype.constructor = Mobs;

Mobs.prototype.move = function(player)
{
   alert("this object has no action");
}

Mobs.prototype.checkContact = function(col, actionObject)
{
	return col.x + 16 >= actionObject.posX && col.x <= actionObject.posX + actionObject.width && 
			col.y + 16 >= actionObject.posY && col.y <= actionObject.posY + actionObject.height;
}
Mobs.prototype._CreateMob = function(image, scaleX, scaleY)
{
    this.sprite = new createjs.Bitmap("images/Mobs/" + image + ".png");
    this.sprite.setTransform(this.posX, this.posY, scaleX, scaleY);
    this.healthBar = new UIBar(this.posX, this.posY - 15, "red", this.life, this.width * scaleX, 5);
    mobContainer.addChild(this.sprite);
    mobContainer.addChild(this.healthBar.changeValue(this.life));
    
}
Mobs.prototype.TakeDamages = function(amount)
{
    if(this.life - amount <= 0)
    {
        mobContainer.removeChild(this.sprite);
        this.healthBar.changeValue(-1);
        actorsMobs.splice(this, 1);
    }
    else
    {
        this.life -= amount;
        this.healthBar.changeValue(this.life);
    }
}

Mobs.prototype.getAttack = function()
{
   return this.attack / 10;
}

var Bat = function(x, y, life, speed, xp) 
{
    Mobs.call(this, x, y, 60, 30, life, speed, xp, 2);
    this.CreateMob("bat");
};

Bat.prototype = Object.create(Mobs.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
Bat.prototype.constructor = Bat;

Bat.prototype.move = function(player)
{
   alert("this object has no action");
}

Bat.prototype.checkContact = function(col, actionObject)
{
    
}
Bat.prototype.CreateMob = function(img)
{
    Mobs.prototype._CreateMob.call(this, img, 0.7, 0.7);
}