window.Game = {};
var canvas = document.getElementById("mainGame");
var context = canvas.getContext("2d");	
	// wrapper for "class" Rectangle
	(function(){
		function Rectangle(left, top, width, height){
			this.left = left || 0;
			this.top = top || 0;
            this.width = width || 0;
			this.height = height || 0;
			this.right = this.left + this.width;
			this.bottom = this.top + this.height;
		}
		
		Rectangle.prototype.set = function(left, top, /*optional*/width, /*optional*/height){
			this.left = left;
            this.top = top;
            this.width = width || this.width;
            this.height = height || this.height
            this.right = (this.left + this.width);
            this.bottom = (this.top + this.height);
		}
		
		Rectangle.prototype.within = function(r) {
			return (r.left <= this.left && 
					r.right >= this.right &&
					r.top <= this.top && 
					r.bottom >= this.bottom);
		}		
		
		Rectangle.prototype.overlaps = function(r) {
			return (this.left < r.right && 
					r.left < this.right && 
					this.top < r.bottom &&
					r.top < this.bottom);
		}

		// add "class" Rectangle to our Game object
		Game.Rectangle = Rectangle;
	})();	

	// wrapper for "class" Camera (avoid global objects)
	(function(){
	
		// possibles axis to move the camera
		var AXIS = {
			NONE: "none", 
			HORIZONTAL: "horizontal", 
			VERTICAL: "vertical", 
			BOTH: "both"
		};

		// Camera constructor
		function Camera(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight)
		{
			// position of camera (left-top coordinate)
			this.xView = xView || 0;
			this.yView = yView || 0;
			
			// distance from followed object to border before camera starts move
			this.xDeadZone = 0; // min distance to horizontal borders
			this.yDeadZone = 0; // min distance to vertical borders
			
			// viewport dimensions
			this.wView = canvasWidth;
			this.hView = canvasHeight;			
			
			// allow camera to move in vertical and horizontal axis
			this.axis = AXIS.BOTH;	
		
			// object that should be followed
			this.followed = null;
			
			// rectangle that represents the viewport
			this.viewportRect = new Game.Rectangle(this.xView, this.yView, this.wView, this.hView);				
								
			// rectangle that represents the world's boundary (room's boundary)
			this.worldRect = new Game.Rectangle(0, 0, worldWidth, worldHeight);
			
		}

		// gameObject needs to have "x" and "y" properties (as world(or room) position)
		Camera.prototype.follow = function(gameObject, xDeadZone, yDeadZone)
		{		
			this.followed = gameObject;	
			this.xDeadZone = xDeadZone;
			this.yDeadZone = yDeadZone;
		}					
		
		Camera.prototype.update = function()
		{
			// keep following the player (or other desired object)
			if(this.followed != null)
			{		
				if(this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH)
				{		
					// moves camera on horizontal axis based on followed object position
					if(this.followed.x - this.xView  + this.xDeadZone > this.wView)
						this.xView = this.followed.x - (this.wView - this.xDeadZone);
					else if(this.followed.x  - this.xDeadZone < this.xView)
						this.xView = this.followed.x  - this.xDeadZone;
					
				}
				if(this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH)
				{
					// moves camera on vertical axis based on followed object position
					if(this.followed.y - this.yView + this.yDeadZone > this.hView)
						this.yView = this.followed.y - (this.hView - this.yDeadZone);
					else if(this.followed.y - this.yDeadZone < this.yView)
						this.yView = this.followed.y - this.yDeadZone;
				}						
				
			}		
			
			// update viewportRect
			this.viewportRect.set(this.xView, this.yView);
			
			// don't let camera leaves the world's boundary
			if(!this.viewportRect.within(this.worldRect))
			{
				if(this.viewportRect.left < this.worldRect.left)
					this.xView = this.worldRect.left;
				if(this.viewportRect.top < this.worldRect.top)					
					this.yView = this.worldRect.top;
				if(this.viewportRect.right > this.worldRect.right)
					this.xView = this.worldRect.right - this.wView;
				if(this.viewportRect.bottom > this.worldRect.bottom)					
					this.yView = this.worldRect.bottom - this.hView;
			}
			
		}	
		
		// add "class" Camera to our Game object
		Game.Camera = Camera;
		
	})();
(function(){
		function Map(width, height){
			// map dimensions
			this.width = width;
			this.height = height;
			
			// map texture
			this.image = null;
		}
		
		// generate an example of a large map
		Map.prototype.generate = function(){
			var ctx = document.createElement("canvas").getContext("2d");		
			ctx.canvas.width = this.width;
			ctx.canvas.height = this.height;		
			
			var rows = ~~(this.width/55) + 1;
			var columns = ~~(this.height/55) + 1;
			
			var color = "#00FF00";				
			ctx.save();			
			ctx.fillStyle = "green";		    
			for (var x = 0, i = 0; i < rows; x+=52, i++) 
			{
				ctx.beginPath();			
				for (var y = 0, j=0; j < columns; y+=52, j++) 
				{            
					ctx.rect (x, y, 50, 50);				
				}
				color = (color == "#00FF00" ? "green" : "#00FF00");
				ctx.fillStyle = color;
				ctx.fill();
				ctx.closePath();			
			}

			ctx.restore();
			
			
			// store the generate map as this image texture
								
			/*let imageObj = new Image();
	    	imageObj.src = "./images/mapBuildings/" + "Peach Castle" + ".jpg";
			ctx.drawImage(imageObj, 600, 300);*/
			this.image = new Image();
			this.image.src = ctx.canvas.toDataURL("image/png");
			// clear context
			ctx = null;
		}
		
		// draw the map adjusted to camera
		Map.prototype.draw = function(context, xView, yView){					
			// easiest way: draw the entire map changing only the destination coordinate in canvas
			// canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
			//context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);
			
			// didactic way:
			if(this.image == null)
				return;
			var sx, sy, dx, dy;
            var sWidth, sHeight, dWidth, dHeight;
			
			// offset point to crop the image
			sx = xView;
			sy = yView;
			
			// dimensions of cropped image			
			sWidth =  context.canvas.width;
			sHeight = context.canvas.height;

			// if cropped image is smaller than canvas we need to change the source dimensions
			if(this.image.width - sx < sWidth){
				sWidth = this.image.width - sx;
			}
			if(this.image.height - sy < sHeight){
				sHeight = this.image.height - sy; 
			}
			
			// location on canvas to draw the croped image
			dx = 0;
			dy = 0;
			// match destination with source to not scale the image
			dWidth = sWidth;
			dHeight = sHeight;									
			
			context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

		}
		
		// add "class" Map to our Game object
		Game.Map = Map;
		
	})();

	// Game Script
	(function(){
		// prepaire our game canvas
		

		// game settings:	
		var FPS = 40;
		var INTERVAL = 1000/FPS; // milliseconds
		var STEP = INTERVAL/1000 // seconds
		
		// setup an object that represents the room
		var room = {
			width: 2500,
			height: 1500,
			map: new Game.Map(5000, 3000)
		};
		
		// generate a large image texture for the room
		room.map.generate();
		 
		// setup player
		//var player = new Game.Player(50, 50);
		
		// setup the magic camera !!!
		var camera = new Game.Camera(0, 0, canvas.width, canvas.height, room.width, room.height);		
		//camera.follow(player, canvas.width/2, canvas.height/2);
		
		// Game update function
		var update = function(){			
			//player.update(STEP, room.width, room.height);
			camera.update();
		}
			
		// Game draw function
		var draw = function(){
			// clear the entire canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			// redraw all objects
			room.map.draw(context, camera.xView, camera.yView);		
			//player.draw(context, camera.xView, camera.yView);		
		}
		
		// Game Loop
		var gameLoopMap = function(){        				
			update();
			draw();
		}

		// <-- configure play/pause capabilities:
		
		// I'll use setInterval instead of requestAnimationFrame for compatibility reason,
		// but it's easy to change that.
		
		var runningId = -1;
		
		Game.play = function(){	
			if(runningId == -1){
				runningId = setInterval(function(){
					gameLoopMap();
				}, INTERVAL);
				console.log("play");
			}
		}
		
		Game.togglePause = function(){		
			if(runningId == -1){
				Game.play();
			}
			else
			{
				clearInterval(runningId);
				runningId = -1;
				console.log("paused");
			}
		}	
		
		// -->
		
	})();

	window.onload = function(){	
		//Game.play();
	}