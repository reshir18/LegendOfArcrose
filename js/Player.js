let dirrectionArray = [];
dirrectionArray["Left"] = -1;
dirrectionArray["Back"] = -1;
dirrectionArray["Right"] = 1;
dirrectionArray["Front"] = 1;
var Player = function(spritePath, width, height) 
{
    let data = 
    {
        images: [spritePath],
        frames: {width:width, height:height, regX: width/2, regY: height/2},
        framerate: 10,
        animations: {
            standFront:1,
            runFront:[0,5],
            spellFront:[6,8],
            standLeft:10,
            runLeft:[9,14],
            spellLeft:[15,17],
            standRight:19,
            runRight:[18,23],
            spellRight:[24,26],
            standBack:28,
            runBack:[27,32],
            spellBack:[33,35],
        }
    };
    this.sprite = new createjs.Sprite(new createjs.SpriteSheet(data));
    this.sprite.snapToPixel = true;
    this.sprite.x = 16;
    this.sprite.y = 16;
    this.speed = 3 * 2;
    this.level = 1;
    this.maxHp = 100;
    this.maxMana = 100;
    this.hp = this.maxHp;
    this.mana = this.maxMana;
    this.xp = 0;
    this.spellMove = "spellFront";
    this.currentMove = "standFront";
    this.newMove = this.currentMove;
    this.left = 0;
    this.top = 0;

};

Player.prototype = Object.create(Player.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
Player.prototype.constructor = Player;

Player.prototype.levelUp = function()
{
    this.speed ++;
    this.level ++;
    this.maxHp += 10;
    this.maxMana += 5;
    this.hp = this.maxHp;
    this.mana = this.maxMana;
    this.xp = 0;
}

Player.prototype.GetSprite = function(){return this.sprite;}
Player.prototype.GetX = function(){return this.left;}
Player.prototype.GetY = function(){return this.top;}
Player.prototype.GetHp = function(){return this.hp;}
Player.prototype.GetMana = function(){return this.mana;}

Player.prototype.Move = function(animationFrameName)
{
    this.newMove = "run" + animationFrameName;
    this.spellMove = "spell" + animationFrameName;
}

Player.prototype.MoveEnd = function(oldMove, newMove, isLeft)
{
   if(isLeft)
    this.left = 0;
   else
    this.top = 0;

   this.newMove = (this.currentMove == oldMove ? newMove : this.currentMove);
}

Player.prototype.ChangeDirectionX = function(animationFrameName)
{
    this.left = dirrectionArray[animationFrameName];
    this.Move(animationFrameName);
}

Player.prototype.ChangeDirectionY = function(animationFrameName)
{
    this.top = dirrectionArray[animationFrameName];
    this.Move(animationFrameName);
}

Player.prototype.CastSpell = function()
{
    this.sprite.gotoAndStop(this.spellMove);
    this.sprite.play();
}

Player.prototype.TakeDamages = function(dmg){this.hp = Math.max(0,this.hp - dmg);}

Player.prototype.TakeMana = function(amount){this.mana = Math.max(0,this.mana - amount);}

Player.prototype.Heal = function(amount){this.hp = Math.min(this.maxHp,this.hp + amount);}

Player.prototype.Update = function(left, right)
{
    if(this.currentMove !== this.newMove)
    {
        this.sprite.gotoAndPlay(this.newMove);
        this.currentMove = this.newMove;
    }
    this.sprite.x += this.left * this.speed;
    this.sprite.y += this.top * this.speed;
    this.checkBorder();
}

Player.prototype.checkBorder = function()
{
    if(this.sprite.x - 16 < 0)
    {
        this.sprite.x = 16;
    }
    if(this.sprite.y - 16 < 0)
    {
        this.sprite.y = 16;
    }
    if(this.sprite.x + 16 > World.width)
    {
        this.sprite.x = World.width - 16;
    }
    if(this.sprite.y + 16 > World.height)
    {
        this.sprite.y = World.height - 16;
    }
}