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

    this.stats = new PlayerStats();
    this.stats.GiveStat("speed", 4);
    this.stats.GiveStat("level", 1);
    this.stats.GiveStat("maxHp", 100);
    this.stats.GiveStat("maxMana", 100);
    this.stats.GiveStat("hp", this.stats.GetStat("maxHp"));
    this.stats.GiveStat("mana", this.stats.GetStat("maxMana"));
    this.stats.GiveStat("xp", 0);
    this.stats.GiveStat("attack", 10);

    this.spellMove = "spellFront";
    this.currentMove = "standFront";
    this.newMove = this.currentMove;
    
    this.left = 0;
    this.top = 0;
    this.oldPosition = {x:16, y:16};
    
    this.currentItem = [];
    this.currentItemSelected = -1;
    
    this.reverseHp = false;
    this.isCasting = false;

};

Player.prototype = Object.create(Player.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
Player.prototype.constructor = Player;

Player.prototype.levelUp = function(){this.stats.ChangeStatLevelUp();}

Player.prototype.GetSprite = function(){return this.sprite;}

Player.prototype.GetX = function(){return this.sprite.x;}

Player.prototype.GetY = function(){return this.sprite.y;}

Player.prototype.GetHp = function(){return this.stats.GetStat("hp");}

Player.prototype.IsFullHp = function(){return this.stats.GetStat("hp") == this.stats.GetStat("maxHp");}

Player.prototype.GetMana = function(){return this.stats.GetStat("mana");}

Player.prototype.GetXp = function(){return this.stats.GetStat("xp");}

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

    if(this.left == -1)
        this.newMove = "runLeft";
    else if(this.left == 1)
        this.newMove = "runRight";
    else if(this.top == -1)
        this.newMove = "runBack";
    else if(this.top == 1)
        this.newMove = "runFront";
    else
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
    this.isCasting = true;
    this.sprite.gotoAndStop(this.spellMove);
    this.sprite.play();
}

Player.prototype.CastSpellStop = function()
{
    this.isCasting = false;
    this.sprite.gotoAndStop(this.newMove);
    this.sprite.play();
}

Player.prototype.TakeDamages = function(dmg)
{
    if(this.reverseHp && this.stats.GetStat("mana") <= 0)
        this.UseItem();
    if(this.reverseHp)
        this.stats.ChangeStat("mana", Math.max(0,this.GetMana() - dmg * 1.5));
    else
        this.stats.ChangeStat("hp", Math.max(0,this.GetHp() - dmg));

    ui.Update(0, this.GetHp());
    ui.Update(1, this.GetMana());
}

Player.prototype.UseItem = function()
{
    if(this.currentItem.length > 0)
        this.currentItem[this.currentItemSelected].Use(this);
}

Player.prototype.GiveItem = function(item)
{
    if(this.currentItemSelected == -1)
        ui.DrawFirstItem();
    this.currentItemSelected++;
    this.currentItem.push(item);
    ui.DrawCurrentItem(this.currentItemSelected);
}

Player.prototype.SwitchItem = function(pos)
{
    if(this.currentItem.length <= 0)
        return;
    this.currentItemSelected += pos;
    if(this.currentItemSelected < 0)
        this.currentItemSelected = this.currentItem.length-1;
    if(this.currentItemSelected == this.currentItem.length)
        this.currentItemSelected = 0;

    ui.DrawCurrentItem(this.currentItemSelected);
}

Player.prototype.TakeMana = function(amount){this.stats.ChangeStat("mana", Math.max(0,this.GetMana() - amount));}

Player.prototype.Heal = function(amount){this.stats.ChangeStat("hp", Math.min(this.stats.GetStat("maxHp"),this.GetHp() + amount));}

Player.prototype.RestoreMana = function(amount){this.stats.ChangeStat("mana", Math.min(this.stats.GetStat("maxMana"),this.GetMana() + amount));}

Player.prototype.GiveXp = function(amount)
{
    this.stats.ChangeStat("xp", this.stats.GetStat("xp") + amount);
    if(this.stats.GetStat("maxMana") >= this.stats.GetStat("level") * 100)
    {
        this.levelUp();
        this.GiveXp(0);
    }
}

Player.prototype.HurtMob = function(mob)
{
    if(!this.isCasting)
        this.TakeDamages(mob.getAttack());
    else
        mob.TakeDamages(this.stats.GetStat("attack"));
}

Player.prototype.Update = function()
{
    if(this.currentMove !== this.newMove && (this.spellMove !== this.currentMove || !this.isCasting))
    {
        this.sprite.gotoAndPlay(this.newMove);
        if(this.isCasting && this.newMove !== this.spellMove)
        {
            this.newMove = this.spellMove;
            this.sprite.gotoAndPlay(this.newMove);

        }
        this.currentMove = this.newMove;
    }
    this.oldPosition = {x:this.sprite.x, y:this.sprite.y};
    this.sprite.x += this.left * this.stats.GetStat("speed");
    this.sprite.y += this.top * this.stats.GetStat("speed");
    itemContainer.x = this.sprite.x;
    itemContainer.y = this.sprite.y;
    this.checkBorder();
}

Player.prototype.SetOldPosition = function()
{
    this.sprite.x = this.oldPosition.x;
    this.sprite.y = this.oldPosition.y;
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