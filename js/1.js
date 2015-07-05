var ctx = document.getElementById("ctx").getContext("2d");

	ctx.font = '30px Arial';

	// increases every time the game is updated this increases by 1
	var frameCount = 0;

	var score = 0;

	// constants
	var WIDTH = 500;
	var HEIGHT = 500;
	// message = "Bouncing";

	

	var timeWhenGameStarted = Date.now(); // returns time in ms at start of game

	// load the image into the memory

	var Img = {};


	Img.player = new Image();
	Img.player.src = "img/player.png";

	Img.enemy = new Image();
	Img.enemy.src = "img/enemy.png";

	Img.bullet = new Image();
	Img.bullet.src = "img/bullet.png";

	Img.upgrade1 = new Image();
	Img.upgrade1.src = "img/upgrade1.png";

	Img.upgrade2 = new Image();
	Img.upgrade2.src = "img/upgrade2.png";

	Img.map = new Image();
	Img.map.src = "img/map.png";






	// then display the image multiple times from memory



	// get distance between entities 
	/*
	getDistanceBetweenEntity = function (entity1,entity2){
		var vx = entity1.x - entity2.x;
		var vy = entity1.y - entity2.y;
		return Math.sqrt(vx*vx + vy*vy);
	}

	*/

	/*
	// see if collision happens. Player is first entity and enemy is second
	testCollisionEntity = function (entity1,entity2){ //  return true or false on collision
		var rect1 = {
			x:entity1.x - entity1.width/2,
			y: entity1.y - entity1.height/2,
			width: entity1.width,
			height: entity1.height,
		}

		// the x and y are minused to make sure that the center is in middle of the object drawn

		var rect2 = {
			x:entity2.x - entity2.width/2,
			y: entity2.y - entity2.height/2,
			width: entity2.width,
			height: entity2.height,
		}

		return testCollisionRect(rect1,rect2);
	}

	*/




	// when the mouse is moved
	document.onmousemove = function(mouse){

		// 8 is minus to make sure that arrow is in center of rectangles and not on the edge.
		var mouseX = mouse.clientX -8; // can put document.getElementById("ctx").getBoundingClientRect().left instead of 8
		var mouseY = mouse.clientY -8; // can put document.getElementById("ctx").getBoundingClientRect().right instead of 8.

		// making the mouse angle relative to the player
		mouseX -= WIDTH/2;
		mouseY -= HEIGHT/2;

		// aim angle dependent on mouse position that is relative to the player
		player.aimAngle = Math.atan2(mouseY,mouseX) / Math.PI * 180; // radians to degress

	}
	
	/*
	// gets new position and draws it
	updateEntity = function (entity){
		updateEntityPosition(entity);
		drawEntity(entity);
	}
	*/
	
	/*
	// gets the new position of the entity
	updateEntityPosition = function(entity){

		if(entity.type === "player"){

			if(entity.pressingRight){
			entity.x += 10;
			}

			if(entity.pressingLeft){
				entity.x -= 10;
			}

			if(entity.pressingDown){
				entity.y += 10;
			}

			if(entity.pressingUp){
				entity.y -= 10;
			}


			// is the new position valid
			// prevent out of bounds at all 4 ends by manipulating mouse position
			if(entity.x < entity.width/2){
				entity.x = entity.width/2;
			}
			if(entity.x > WIDTH - entity.width/2){
				entity.x = WIDTH - entity.width/2;
			}

			if(entity.y < entity.height/2){
				entity.y = entity.height/2;
			}
			if(entity.y > HEIGHT - entity.height/2){
				entity.y = HEIGHT - entity.height/2;
			}

		}else{

			//enemy
			entity.x += entity.spdx;
			entity.y += entity.spdy;
			

			if(entity.x < 0 || entity.x >WIDTH){
				//console.log(message);
				entity.spdx = -entity.spdx;
			}

			if( entity.y < 0 || entity.y >HEIGHT){
				//console.log(message);
				entity.spdy = -entity.spdy;
			}
		}
	}

	*/

	// returns true if colliding or false if not colliding
	testCollisionRect = function(rect1,rect2){
		return rect1.x <= rect2.x + rect2.width
			&& rect2.x <= rect1.x + rect1.width
			&& rect1.y <= rect2.y + rect2.height
			&& rect2.y <= rect1.y + rect1.height;
	}

	/*
	// draws the entity
	drawEntity = function(entity){

		// save settings
		ctx.save();

		//change colour to green
		ctx.fillStyle = entity.colour;

		// draw player.....change the x and y to come to the centre.....
		ctx.fillRect(entity.x - entity.width/2,entity.y - entity.height/2,entity.width,entity.height);
		
		// restore settings so that no problems occur and colour does not stay green.
		ctx.restore();
	}

	*/


	// when the player left clicks
	document.onclick = function(mouse){
		player.performAttack();

	}


	// when the player right clicks
	document.oncontextmenu = function(mouse){
		player.performSpecialAttack();
		// prevents menu showing up when right clicked
		mouse.preventDefault();

	}

	//called when any key is pressed
	document.onkeydown = function(event){
		
		// keycode shows what key was pressed
		// control using aswd

		if(event.keyCode === 68 ){ //d
			player.pressingRight = true; 
		}else if (event.keyCode === 83){ //s	
			player.pressingDown = true;
		}else if(event.keyCode === 65){ //a
			player.pressingLeft = true;
		}else if(event.keyCode === 87){ //w
			player.pressingUp = true;
		}

	}


	//called when any key is released so that it is not kept pressed.
	document.onkeyup = function(event){
		
		// keycode shows what key was released
		// control using aswd

		if(event.keyCode === 68 ){ //d
			player.pressingRight = false; 
		}else if (event.keyCode === 83){ //s	
			player.pressingDown = false;
		}else if(event.keyCode === 65){ //a
			player.pressingLeft = false;
		}else if(event.keyCode === 87){ //w
			player.pressingUp = false;
		}

	}

	/*
	// updates the position of the player depending on which key is pressed
	updatePlayerPosition = function(){
		if(player.pressingRight){
			player.x += 10;
		}

		if(player.pressingLeft){
			player.x -= 10;
		}

		if(player.pressingDown){
			player.y += 10;
		}

		if(player.pressingUp){
			player.y -= 10;
		}


		// is the new position valid
		// prevent out of bounds at all 4 ends by manipulating mouse position
		if(player.x < player.width/2){
			player.x = player.width/2;
		}
		if(player.x > WIDTH - player.width/2){
			player.x = WIDTH - player.width/2;
		}

		if(player.y < player.height/2){
			player.y = player.height/2;
		}
		if(player.y > HEIGHT - player.height/2){
			player.y = HEIGHT - player.height/2;
		}

	}

	*/

	// called every 40 ms
	update = function (){
		
		// clear the rect to ensure only one thing is drawn per entity
		ctx.clearRect(0,0,WIDTH,HEIGHT);

		// draw map
		currentMap.draw();
		
		frameCount++;

		score++;

		// there are 25 frames per second as per the updates every 40ms
		// add a new enemy every 4 secs.


		// here the enemy is genereated in multiples of 100s.... every 4 secs
		if( frameCount % 100 === 0){			// 4 secs later
			randomlyGenerateEnemy();
		}

		// generates the upgrades
		if( frameCount % 75 === 0){			// 3 secs later generate upgrade
			randomlyGenerateUpgrade();
		}





		// IN ACTOR constructor 

		// ADD TO ATTACK COUNTER. So if the attack speed is higher by collecting upgrades, then the attack counter increases
		// for the player. If the attack counter increases faster, it goes above 25 a lot faster. So a player can shoot
		// when the attack counter is above 25. So with more attack speed, the player can shoot faster.
		//player.attackCounter += player.attackSpeed;



		// draw the bullet 
		for(var key in bulletList){

			var b = bulletList[key];

			b.update();

			// increase the timer for the bullet by 1
			b.timer++;

			var toRemove = false;

			// marks the bullet to be removed if not hitting anything for 4 secs
			if(b.timer  > 75){

				toRemove = true;
			}


			if(b.combatType === "player"){ // bullet was shot by player

				// check for each bullet if it hits any of the enemies
				for(var i in enemyList){

					// checking if collision happends
					if(b.testCollision(enemyList[i])){
						toRemove = true;
						// delete the enemy hit
						delete enemyList[i];
					}
				}
			}else if (b.combatType === "enemy"){

				// checking if collision happends
					if(b.testCollision(player)){
						toRemove = true;
						player.hp -= 1;
					}
			}

			// removes key if has expired or hit an enemy
			if(toRemove){
				delete bulletList[key];
			}

		}


		// draws all the upgrades
		for(var key in upgradeList){
			upgradeList[key].update();

			// checking if collision happends
			var isColliding = player.testCollision(upgradeList[key]);

			// if the player collides, it takes away 1 point from the health
			if(isColliding){

				if(upgradeList[key].category === "score"){
					score += 1000;
				}

				if(upgradeList[key].category === "attackSpeed"){
					player.attackSpeed += 3;
				}

				// delete the upgrade that the player went over
				delete upgradeList[key];
			}

		}


			
		// iterate object that has enemies
		for(var key in enemyList){ // keys are E1, E2
			enemyList[key].update();
			enemyList[key].performAttack();
		}

		// WHEN YOU DIE
		if(player.hp <= 0){

			var timeSurvived = Date.now() - timeWhenGameStarted;

			console.log("You Lost! You survived for " + timeSurvived + " milliseconds");

			startNewGame();

		}

		// update the position of the player
		player.update();

		// gets new position and draws it....but now we want to move it with mouse....so .....
		//drawEntity(player);

		// THERE ARE 25 frames per second
		// draw the hp of the player
		ctx.fillText(player.hp + " HP", 0, 30);

		// draw the score of the player
		ctx.fillText("Score: " + score, 200, 30);
	}

	startNewGame = function(){

		// start the players life again
		player.hp = 10;

		// reset the time the game started
		timeWhenGameStarted = Date.now();

		//reset frame count
		frameCount = 0;

		// reset the enemies
		enemyList = {}

		//reset score
		score = 0;

		// reset all the upgrades
		upgradeList = {};

		// clear bullets
		bulletList = {};

		// create 3 enemies for start of new game
		randomlyGenerateEnemy();
		randomlyGenerateEnemy();
		randomlyGenerateEnemy();

	}


	// we will use multiple maps and make its draw function
	Maps = function(id,imgSrc,width,height){
		
		var self = {
			id:id,
			image:new Image(),
			width: width,
			height: height,
		}
		self.image.src = imgSrc;

		self.draw = function(){

			// the map x decreases as the player x increases. so as the player moves right....the map moves left to show movement

			var x = WIDTH/2 - player.x;
			var y = HEIGHT/2 - player.y;

			ctx.drawImage(self.image,0,0,self.image.width,self.image.height,x,y,self.image.width*2,self.image.height*2);
		}

		return self;

	}

	// creating maps
	currentMap = Maps("field","img/map.png",1280,960);

	player = Player();
	// start the game
	startNewGame();

	// draw on canvas continously
	setInterval(update,40);







	