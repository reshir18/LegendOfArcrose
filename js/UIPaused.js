var UIPaused = function(s)
{
    this.stage = s;
    this.allTexts = [];
    let menuStats = new UIBar(0, 0,0, 0, Screen.width, 100);
    this.stage.addChild(menuStats.CreateDisplayZones());

    let menuItems = new UIBar(0, 100,0, 0, Screen.width - 300, Screen.height - 100);
    this.stage.addChild(menuItems.CreateDisplayZones());

    let menuItemDescription = new UIBar(Screen.width - 300, 100,0, 0, 300, Screen.height - 100);
    this.stage.addChild(menuItemDescription.CreateDisplayZones());


    this.drawPlayerFace();
    this.SetStats();
    let data = {
        images: ["images/Items/items.png"],
        frames: {width:64, height:64},
        animations: {
            shield:0,
            bow:1,
            wand: 2
        }
    };

    this.displayAllImages(data);
};

UIPaused.prototype = Object.create(UIPaused.prototype);

UIPaused.prototype.constructor = UIPaused;

UIPaused.prototype.createStatText = function(x, y, color, text)
{
    let textTemp = new createjs.Text(text, "28px Arial", color);
    textTemp.x = x;
    textTemp.y = y;
    this.stage.addChild(textTemp);
    this.allTexts.push(textTemp);

}

UIPaused.prototype.Update = function(index, text){this.allTexts[index].text = text;}

UIPaused.prototype.drawPlayerFace = function()
{
    let persoFace = new createjs.Bitmap("images/mainCharacterFace.png");
    persoFace.setTransform(25, 25, 1, 1);
    this.stage.addChild(persoFace);
}

UIPaused.prototype.SetStats = function()
{
    this.createStatText(125, 20, "red", this.constructTexts1(Math.ceil(player.GetHp()), player.GetMaxHp(), "HP"));
    this.createStatText(125, 60, "blue", this.constructTexts1(Math.ceil(player.GetMana()), player.GetMaxMana(), "MANA"));
    this.createStatText(350, 60, "green", this.constructTexts1(Math.ceil(player.GetXp()), player.GetLevel() * 100, "EXP"));
}

UIPaused.prototype.UpdateAllStats = function()
{
    this.Update(0, this.constructTexts1(Math.ceil(player.GetHp()), player.GetMaxHp(), "HP"));
    this.Update(1, this.constructTexts1(Math.ceil(player.GetMana()), player.GetMaxMana(), "MANA"));
    this.Update(2, this.constructTexts1(Math.ceil(player.GetXp()), player.GetLevel() * 100, "EXP"));
}

UIPaused.prototype.constructTexts1 = function(value, maxValue, desc)
{
    return  desc + " : " + value + "/" + maxValue;
}

UIPaused.prototype.displayAllImages = function(data)
{
    let posY = 125;
    let posX = 0;
    for(let i = 0; i < itemsArray.length; i++)
    {
        if(i == 3)
        {
            posX = 0;
            posY += 25 + (64*1.5);
        }
        let imgTemp = new createjs.Sprite(new createjs.SpriteSheet(data));
        imgTemp.setTransform(25 + (posX*(64*1.5)), posY, 1.5, 1.5);
        imgTemp.gotoAndStop(itemsArray[i]);
        this.stage.addChild(imgTemp);
        posX++
        imgTemp.on("click", function(){console.log(this.currentAnimation);});
    }
}