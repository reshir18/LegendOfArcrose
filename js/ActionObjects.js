var ActionObject = function(x, y, w, h) 
{
    this.posX = x;
    this.posY = y;
    this.width = w;
    this.height = h;
    this.rectangle = new createjs.Shape();
};

ActionObject.prototype = Object.create(ActionObject.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
ActionObject.prototype.constructor = ActionObject;

ActionObject.prototype.playAction = function(player)
{
   alert("this object has no action");
}

ActionObject.prototype.placeActionObject = function(actionObject, color)
{
    actionObject.rectangle.graphics.beginFill(color).drawRect(actionObject.posX, actionObject.posY, actionObject.width, actionObject.height);
    return actionObject.rectangle;
}

ActionObject.prototype.removeActionObject = function(actionObject)
{
    actionObject.rectangle.graphics.clear();
}

ActionObject.prototype.checkContact = function(col, actionObject)
{
	return col.x + 16 >= actionObject.posX && col.x <= actionObject.posX + actionObject.width && 
			col.y + 16 >= actionObject.posY && col.y <= actionObject.posY + actionObject.height;
}










