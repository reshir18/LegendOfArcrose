createjs.Ticker.setFPS(40);
createjs.Ticker.useRAF = true;
createjs.Ticker.on("tick", gameLoop);
let actorsAutoUpdate = [];

var Screen = {
    width: 800,
    height: 600
}

var World = {
    width: 1600,
    height: 1200
}

var canvas = document.getElementById("mainGame");
canvas.width = Screen.width;
canvas.height = Screen.height;

var mainStage = new createjs.Stage(canvas);
mainStage.snapToPixelsEnabled = true;
mainStage.autoClear = true;

var mainContainer = new createjs.Container();
mainContainer.snapToPixel = true;

var mapContainer = new createjs.Container();
mainContainer.snapToPixel = true;

var uiContainer = new createjs.Container();
uiContainer.snapToPixel = true;

var controls = {
        left: false,
        up: false,
        right: false,
        down: false,
    };

let player = new Player("images/mainCharacter.png", 32, 32);
let blockPlayer = false;
         
let map = new Map(World.width, World.height, mapContainer);
var ui = new UI(uiContainer);
map.Create(50, "green", "#00FF00");


actorsAutoUpdate.push(new Potion(600,100,35,35,125,"xp"));
actorsAutoUpdate.forEach(actorsPlaceOnMap);

mainStage.addChild(mapContainer);
mainStage.addChild(mainContainer);
mainStage.addChild(player.GetSprite());
mainStage.addChild(uiContainer);

ui.CreateBar(125, Screen.height - 80, "red", 100, 200, 20);
ui.CreateBar(125, Screen.height - 40, "blue", 100, 200, 20);
ui.CreateBar(350, Screen.height - 40, "green", 100, 200, 20);

mainStage.on("stagemousedown", UseItem);

function gameLoop(event) 
{
    actorsAutoUpdate.forEach(actorsCheckContact);
    mapContainer.children.forEach(checkWallsCollider);
    player.Update();

    if ( player.GetSprite().x > Screen.width*.3 && player.GetSprite().x -16 < World.width - Screen.width*.7) 
    {
        mainStage.x = -player.GetSprite().x + Screen.width*.3;
        uiContainer.x = player.GetSprite().x - Screen.width*.3;
    }
    if ( player.GetSprite().y > Screen.height *.7 && player.GetSprite().y < World.height - 84 ) 
    {
        mainStage.y = -player.GetSprite().y + Screen.height *.7;
        uiContainer.y = player.GetSprite().y - Screen.height *.7;
    }
    mainStage.update(event);
}

function UseItem(evt) 
{
    player.UseItem();
    console.log("stageX/Y: "+evt.stageX+","+evt.stageY);
}

function checkWallsCollider(item, index)
{
    let tile = map.GetMapTile(index);
    if(!tile.hasAction)
        return;  
    if(player.GetSprite().x >= tile.Position().x && player.GetSprite().x <= tile.Position().x + tile.Position().width && 
            player.GetSprite().y + 16 >= tile.Position().y && player.GetSprite().y <= tile.Position().y + tile.Position().height)
    {
        tile.landAction(player);
    }
    
}

function actorsCheckContact(item, index) 
{
    if(item.checkContact(player))
    {
        mainContainer.removeChild(item.GetActionObject());
    }
}

function actorsPlaceOnMap(item, index) {
    mainContainer.addChild(item.placeActionObject());
}

window.addEventListener("keydown", function(e)
{
    switch(e.keyCode)
    {
        case 65: // A key
        case 37: // left arrow
            player.ChangeDirectionX("Left");
            break;
        case 87: // W key
        case 38: // up arrow
            player.ChangeDirectionY("Back");
            break;
        case 68: // D key
        case 39: // right arrow
            player.ChangeDirectionX("Right");
            break;
        case 83: // S Key
        case 40: // down arrow
            player.ChangeDirectionY("Front");
            break;
    }
}, false);

window.addEventListener("keyup", function(e)
{
    switch(e.keyCode)
    {
        case 65: // A key
        case 37: // left arrow
            player.MoveEnd("runLeft", "standLeft", true);
            break;
        case 87: // W key
        case 38: // up arrow
            player.MoveEnd("runBack", "standBack", false);
            break;
        case 68: // D key
        case 39: // right arrow
            player.MoveEnd("runRight", "standRight", true);
            break;
        case 83: // S Key
        case 40: // down arrow
            player.MoveEnd("runFront", "standFront", false);
            break;
        case 32:
            //actorsWaitInputUpdate.forEach(actorsCheckContact);
            player.CastSpell();
            break;      
    }
}, false);
