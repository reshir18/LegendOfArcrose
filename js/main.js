
createjs.Ticker.on("tick", gameLoop);
var actorsAutoUpdate = [];
var actorsMobs = [];

let player = new Player("images/mainCharacter.png", 32, 32);      
let map = new Map(World.width, World.height, mapContainer);
var ui = new UI(uiContainer);
var uiPaused = new UIPaused(uiPausedContainer);
map.Create(50, "green", "#00FF00");
actorsAutoUpdate.push(new Potion(600,100,35,35,125,"xp"));

for(let i = 0; i < 10; i++)
{
    actorsMobs.push(new Bat(100 * (i + 1),100 * (i + 1),50,1,25));
}
//actorsMobs.push(new Bat(500,500,50,1,25));
actorsAutoUpdate.forEach(actorsPlaceOnMap);

mainStage.addChild(mapContainer);
mainStage.addChild(mainContainer);
mainContainer.addChild(player.GetSprite());
mainContainer.addChild(itemContainer);
mainContainer.addChild(mobContainer);
mainStage.addChild(uiContainer);
pausedStage.addChild(uiPausedContainer);
uiContainer.addChild(textFPS);

ui.CreateBar(125, Screen.height - 80, "red", 100, 200, 20);
ui.CreateBar(125, Screen.height - 40, "blue", 100, 200, 20);
ui.CreateBar(350, Screen.height - 40, "green", 100, 200, 20);

mainStage.on("stagemousedown", UseItem);

function gameLoop(event) 
{
    if (!event.paused) 
    {
        mainGameLoop(event);
    }
    else
    {
        pausedGameLoop(event);
    } 
}

function mainGameLoop(event)
{
    textFPS.text = createjs.Ticker.getMeasuredFPS();
    actorsAutoUpdate.forEach(actorsCheckContact);
    mapContainer.children.forEach(checkWallsCollider);
    
    player.Update();
    actorsMobs.forEach(checkMobsCollider);
    checkBorderCollider();
    
    mainStage.update(event);
}

function pausedGameLoop(event)
{
    pausedStage.update(event);
}

function checkBorderCollider()
{
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
}

function UseItem(evt) 
{
    player.UseItem({mouseX: evt.stageX, mouseY: evt.stageY});
    console.log("stageX/Y: "+evt.localX+","+evt.localY);
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

function checkMobsCollider(item, index)
{
    if(item.posX > uiContainer.x + Screen.width || item.posY > uiContainer.y + Screen.height || !item.isAlive)
        return;
    item.Move(player.GetSprite());    
    if(player.GetSprite().x >= item.posX && player.GetSprite().x <= item.posX + item.width && 
            player.GetSprite().y + 16 >= item.posY && player.GetSprite().y <= item.posY + item.height)
    {
        player.HurtMob(item); 
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
        case 32:
            player.CastSpell();
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
        case 81://Q key
            player.SwitchItem(-1);
            break;
        case 69://E key
            player.SwitchItem(1);
            break;
        case 32:
            player.CastSpellStop();
            break;
        case 27://ESCAPE
            uiPaused.UpdateAllStats();
            createjs.Ticker.paused = !createjs.Ticker.paused;
            break;
    }
}, false);
