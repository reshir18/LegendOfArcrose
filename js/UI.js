var UI = function(s) 
{
    this.stage = s;
    this.bars = [];
    let barTemp = new UIBar(0, Screen.height - 100,0, 0, Screen.width, 100);
    this.stage.addChild(barTemp.CreateDisplayZones());
    this.drawPlayerFace();
};

UI.prototype = Object.create(UI.prototype);

UI.prototype.constructor = UI;

UI.prototype.CreateBar = function(x, y, c, m, w, h)
{
    let barTemp = new UIBar(x, y, c, m, w, h);
    let barTemp2 = new UIBar(x, y, c, m, w, h);
    this.stage.addChild(barTemp.Create());
    this.stage.addChild(barTemp2.changeValue(m));
    this.bars.push(barTemp2);
}

UI.prototype.Update = function(index, amount){this.bars[index].changeValue(amount);}

UI.prototype.drawPlayerFace = function()
{
    let persoFace = new createjs.Bitmap("images/mainCharacterFace.png");
    persoFace.setTransform(25, Screen.height - 75, 1, 1);
    this.stage.addChild(persoFace);              
}