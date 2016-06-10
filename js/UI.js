let itemsArray = ["shield", "bow", "wand"];
let LEVEL_STRING = "Level:  ";
var UI = function(s)
{
    this.stage = s;
    this.bars = [];
    let barTemp = new UIBar(0, Screen.height - 100,0, 0, Screen.width, 100);
    this.stage.addChild(barTemp.CreateDisplayZones());
    this.drawPlayerFace();
    let data = {
        images: ["images/Items/items.png"],
        frames: {width:64, height:64},
        animations: {
            shield:0,
            bow:1,
            wand: 2
        }
    };
    this.textLevelCurrent = new createjs.Text(LEVEL_STRING + "1", "28px Arial", "#222222");
    this.textLevelCurrent.x = 350;
    this.textLevelCurrent.y = Screen.height - 80;
    this.stage.addChild(this.textLevelCurrent);
    this.currentItemImage = new createjs.Sprite(new createjs.SpriteSheet(data));

    this.currentItemImage.setTransform(Screen.width - 84, Screen.height - 84, 1, 1);
};

UI.prototype = Object.create(UI.prototype);

UI.prototype.constructor = UI;

UI.prototype.CreateBar = function(x, y, color, maxValue, w, h)
{
    let barTemp = new UIBar(x, y, color, maxValue, w, h);
    let barTemp2 = new UIBar(x, y, color, maxValue, w, h);
    this.stage.addChild(barTemp.Create());
    if(color!="green")
        this.stage.addChild(barTemp2.changeValue(maxValue));
    else
        this.stage.addChild(barTemp2.changeValue(0));
    this.bars.push(barTemp2);
}

UI.prototype.Update = function(index, amount){this.bars[index].changeValue(amount);}

UI.prototype.drawPlayerFace = function()
{
    let persoFace = new createjs.Bitmap("images/mainCharacterFace.png");
    persoFace.setTransform(25, Screen.height - 75, 1, 1);
    this.stage.addChild(persoFace);
}

UI.prototype.increaseBars = function(a1, a2, a3)
{
    this.bars[0].changeMaxValue(a1);
    this.bars[1].changeMaxValue(a2);
    this.bars[2].changeMaxValue(a3);
    this.textLevelCurrent.text = LEVEL_STRING + a3 / 100;
}

UI.prototype.DrawCurrentItem = function(item)
{
    this.currentItemImage.gotoAndStop(itemsArray[item]);
}

UI.prototype.DrawFirstItem = function()
{
    this.stage.addChild(this.currentItemImage);
}