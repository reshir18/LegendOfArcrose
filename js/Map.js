var Map = function(w, h, s) 
{
    this.rows = ~~(w/55) + 2;
    this.columns = ~~(h/55) + 2; 
    this.stage = s;
};

Map.prototype = Object.create(Map.prototype);

// on corrige le constructeur qui pointe sur celui de Personne
Map.prototype.constructor = Map;

Map.prototype.Create = function(squareSize, color1, color2)
{
    let color = color2;                       
    for (var x = 0, i = 0; i < this.rows; x+=52, i++) 
    {
        color = (color == color2 ? color1 : color2);           
        for (var y = 0, j=0; j < this.columns; y+=52, j++) 
        {             
            rectangle = new createjs.Shape();
            rectangle.graphics.beginFill(color).drawRect(x, y, squareSize, squareSize);
            this.stage.addChild(rectangle);                
        }          
    }
}