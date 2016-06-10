createjs.Ticker.setFPS(50);
//createjs.Ticker.useRAF = true;
var textFPS = new createjs.Text("Hello World", "20px Arial", "#ff7700");
textFPS.x = 100;

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

var pausedStage = new createjs.Stage(canvas);
pausedStage.snapToPixelsEnabled = true;
pausedStage.autoClear = true;

var mainContainer = new createjs.Container();
mainContainer.snapToPixel = true;

var mapContainer = new createjs.Container();
mainContainer.snapToPixel = true;

var uiContainer = new createjs.Container();
uiContainer.snapToPixel = true;

var uiPausedContainer = new createjs.Container();
uiPausedContainer.snapToPixel = true;

var itemContainer = new createjs.Container();
itemContainer.snapToPixel = true;

var mobContainer = new createjs.Container();
mobContainer.snapToPixel = true;

var controls = {
        left: false,
        up: false,
        right: false,
        down: false,
    };

var preload = new createjs.LoadQueue();
preload.on("fileload", handleFileLoad, this);
preload.loadFile("maps/Beta1.txt");
preload.loadFile("maps/Beta2.txt");
var mapArray = [];

function handleFileLoad(event)
{
	if(mapArray.length > 0)
	{
		mapArray = event.result.split( "\n");
		return;
	}
	mapArray = event.result.split( "\n");
  	map.Create(50, "green", "#00FF00", mapArray);
  	console.log(mapArray);
  	createjs.Ticker.paused = false;
}

