var Mobs = function(x, y, w, h, l, s, xp, att, scaleX, scaleY) 
{
    this.posX = x;
    this.posY = y;
    this.width = w;
    this.height = h;
    this.life = l;
    this.speed = s,
    this.xp = xp;
    this.attack = att;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.isAlive = true;
};

Mobs.prototype = Object.create(Mobs.prototype);

Mobs.prototype.constructor = Mobs;

Mobs.prototype.Move = function(player)
{
    let moveX = 1;
    let moveY = 1;
    if(player.x  < this.posX)
        moveX = -1;
    else if (player.x - this.width * this.scaleX/2 == this.posX)
        moveX = 0;
    if(player.y < this.posY)
        moveY = -1;
    else if (player.y - this.height * this.scaleY/2 == this.posY)
        moveY = 0;

    this.posX += moveX * this.speed;
    this.posY += moveY * this.speed;
    this.sprite.setTransform(this.posX, this.posY, this.scaleX, this.scaleY);
    //this.healthBar.setTransform(this.posX, this.posY - 15);
}

Mobs.prototype._CreateMob = function(image, scaleX, scaleY)
{
    this.sprite = new createjs.Bitmap("images/Mobs/" + image + ".png");
    this.sprite.setTransform(this.posX, this.posY, this.scaleX, this.scaleY);
    //this.healthBar = new UIBar(this.posX, this.posY - 15, "red", this.life, this.width * this.scaleX, 5);
    mobContainer.addChild(this.sprite);
    //mobContainer.addChild(this.healthBar.changeValue(this.life));
    
}
Mobs.prototype.TakeDamages = function(amount)
{
    if(this.life - amount <= 0)
    {
        mobContainer.removeChild(this.sprite);
        //this.healthBar.changeValue(-1);
        this.isAlive = false;
        actorsAutoUpdate.push(new Potion(this.sprite.x,this.sprite.y,35,35,15,"heal"));
        mainContainer.addChild(actorsAutoUpdate[actorsAutoUpdate.length - 1].placeActionObject());
        return this.xp;
    }
    else
    {
        this.life -= amount;
        //this.healthBar.changeValue(this.life);
        return 0;
    }
}

Mobs.prototype.getAttack = function()
{
   return this.attack / 10;
}

var Bat = function(x, y, life, speed, xp) 
{
    Mobs.call(this, x, y, 60, 30, life, speed, xp, 2, 0.7, 0.7);
    this.CreateMob("bat");
};

Bat.prototype = Object.create(Mobs.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
Bat.prototype.constructor = Bat;

Bat.prototype.CreateMob = function(img)
{
    Mobs.prototype._CreateMob.call(this, img, 0.7, 0.7);
}