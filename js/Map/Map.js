var Map = function(w, h, s) 
{
    this.rows = ~~(w/55) + 2;
    this.columns = ~~(h/55) + 2; 
    this.stage = s;
    this.map = [];
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
            let mt;
            if(j == 2 && i == 2)
            {
                mt = new TrapTile(x, y, squareSize, j+i);
            }
            else if(j == 5 && i == 5)
            {
                mt = new WallTile(x, y, squareSize, j+i);
            }
            else if(j == 6 && i == 8)
            {
                mt = new HealPadTile(x, y, squareSize, j+i, 1);
            }
            else if(j == 2 && i == 1)
            {
                
                mt = new ItemTile(x, y, squareSize, j+i, new Shield(), color);
            }
            else if(j == 4 && i == 4)
            {
                mt = new ItemTile(x, y, squareSize, j+i, new Bow(), color);
            }
            else
            {
                mt = new MapTile(x, y, squareSize, "grass", j+i, color);
            }
            
            this.map.push(mt);
            this.stage.addChild(mt.Create(mt));                
        }          
    }
}

Map.prototype.GetMapTile = function(i)
{
    return this.map[i];
}