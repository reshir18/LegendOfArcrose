createjs.Ticker.setFPS(40);
createjs.Ticker.useRAF = true;
createjs.Ticker.on("tick", gameLoop);
let actorsAutoUpdate = [];
let actorsWaitInputUpdate = [];

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

var uiContainer = new createjs.Container();
uiContainer.snapToPixel = true;

var controls = {
        left: false,
        up: false,
        right: false,
        down: false,
    };


let player = new Player("images/mainCharacter.png", 32, 32);

         
let map = new Map(World.width, World.height, mainStage);
var ui = new UI(uiContainer);
map.Create(50, "green", "#00FF00");


actorsAutoUpdate.push(new Trap(100,100,50,50,0.5));
actorsWaitInputUpdate.push(new HealPad(1400,300,50,50,50,20));
actorsAutoUpdate.forEach(actorsPlaceOnMap);
actorsWaitInputUpdate.forEach(actorsPlaceOnMap);

mainStage.addChild(mainContainer);
mainStage.addChild(player.GetSprite());
mainStage.addChild(uiContainer);


ui.CreateBar(125, Screen.height - 80, "red", 100, 200, 20);
ui.CreateBar(125, Screen.height - 40, "blue", 100, 200, 20);

function gameLoop(event) 
{
    player.Update();
    actorsAutoUpdate.forEach(actorsCheckContact);

    if ( player.GetSprite().x - 16 > Screen.width*.3 && player.GetSprite().x -16 < World.width - Screen.width*.7) 
    {
        mainStage.x = -player.GetSprite().x + Screen.width*.3;
        uiContainer.x = player.GetSprite().x - Screen.width*.3;
    }
    if ( player.GetSprite().y- 16 > Screen.height *.7 && player.GetSprite().y < World.height - 84 ) 
    {
        mainStage.y = -player.GetSprite().y + Screen.height *.7;
        uiContainer.y = player.GetSprite().y - Screen.height *.7;
    }
    mainStage.update(event);
}

function actorsCheckContact(item, index) {
    item.checkContact(player);
}

function actorsPlaceOnMap(item, index) {
    mainContainer.addChild(item.placeActionObject());
}

window.addEventListener("keydown", function(e)
{
    switch(e.keyCode)
    {
        case 37: // left arrow
            player.ChangeDirectionX("Left");
            break;
        case 38: // up arrow
            player.ChangeDirectionY("Back");
            break;
        case 39: // right arrow
            player.ChangeDirectionX("Right");
            break;
        case 40: // down arrow
            player.ChangeDirectionY("Front");
            break;
    }
}, false);

window.addEventListener("keyup", function(e)
{
    switch(e.keyCode)
    {
        case 37: // left arrow
            player.MoveEnd("runLeft", "standLeft", true);
            break;
        case 38: // up arrow
            player.MoveEnd("runBack", "standBack", false);
            break;
        case 39: // right arrow
            player.MoveEnd("runRight", "standRight", true);
            break;
        case 40: // down arrow
            player.MoveEnd("runFront", "standFront", false);
            break;
        case 32:
            actorsWaitInputUpdate.forEach(actorsCheckContact);
            player.CastSpell();
            break;      
    }
}, false);
