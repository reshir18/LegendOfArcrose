var roundCurve = 2;
var UIBar = function(x, y, c, m, w, h) 
{
    this.positionX = x;
    this.positionY = y;
    this.color = c;
    this.maxAmount = m;
    this.width = w;
    this.height = h;
    this.rectangle = new createjs.Shape();
};

UIBar.prototype = Object.create(UIBar.prototype);

// on corrige le constructeur quiBar pointe sur celuiBar de Personne
UIBar.prototype.constructor = UIBar;

UIBar.prototype.Create = function()
{   
    let rect = new createjs.Shape(); 
    rect.graphics.beginStroke("black").beginFill("white").drawRoundRect(this.positionX, this.positionY, this.width, this.height, roundCurve, roundCurve, roundCurve, roundCurve);
    return  rect;             
}

UIBar.prototype.CreateDisplayZones = function()
{   
    let rect = new createjs.Shape(); 
    rect.graphics.beginStroke("black").beginFill("#808080").drawRoundRect(this.positionX, this.positionY, this.width, this.height, 10, 10, 10, 10);
    return  rect;             
}

UIBar.prototype.changeValue = function(newAmount)
{
    this.rectangle.graphics.clear();
    fillA = newAmount * this.width / this.maxAmount;
    this.rectangle.graphics.beginFill(this.color).drawRoundRect(this.positionX, this.positionY, fillA, this.height, roundCurve, roundCurve, roundCurve, roundCurve);
    return  this.rectangle;             
}
UIBar.prototype.changeMaxValue = function(newAmount)
{
    this.maxAmount = newAmount;
    this.changeValue(this.maxAmount);             
}