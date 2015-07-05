//player
var player;

// object with list of enemies
var enemyList = {};

// bonus points list
var upgradeList = {};

// list of bullets
var bulletList = {};



// this entity function creates a object called self for each entity and then gives it methods. Hence avoidinging calling
	// the same function for different entities.
	Entity = function(type,id,x,y,width,height,img){

		var self = {
			type: type,
			x: x,
			y: y,
			width: width,
			height: height,
			img: img
		};

		// gets new position and draws it
		self.update = function (){
			self.updatePosition();
			self.draw();	
		}

		self.draw = function(){

			// save settings
			ctx.save();

			var x  = self.x - player.x; 
			var y  = self.y - player.y; 

			x += WIDTH/2;
			y += HEIGHT/2;

			x -= self.width/2;
			y -= self.height/2;

			ctx.drawImage(self.img,
			0,0,self.img.width,self.img.height,
			x,y,self.width,self.height);
			
			// restore settings so that no problems occur and colour does not stay green.
			ctx.restore();
		}

		self.updatePosition = function(){};

		self.getDistance = function (entity2){
			var vx = self.x - entity2.x;
			var vy = self.y - entity2.y;
			return Math.sqrt(vx*vx + vy*vy);
		}

		self.testCollision = function (entity2){ //  return true or false on collision
			var rect1 = {
				x:self.x - self.width/2,
				y: self.y - self.height/2,
				width: self.width,
				height: self.height,
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

		return self;
	}

	Player = function(){
			
			var self =  Actor('player','myId',50,40,50,70,Img.player,10,1);

			self.updatePosition = function(){

				if(self.pressingRight){
				self.x += 10;
				}

				if(self.pressingLeft){
					self.x -= 10;
				}

				if(self.pressingDown){
					self.y += 10;
				}

				if(self.pressingUp){
					self.y -= 10;
				}


				// is the new position valid?
				// prevent out of bounds at all 4 ends by manipulating mouse position
				if(self.x < self.width/2){
					self.x = self.width/2;
				}
				if(self.x > currentMap.width - self.width/2){
					self.x = currentMap.width - self.width/2;
				}

				if(self.y < self.height/2){
					self.y = self.height/2;
				}
				if(self.y > currentMap.height - self.height/2){
					self.y = currentMap.height - self.height/2;
				}
			}

			self.pressingDown  = false;
			self.pressingUp  = false;
			self.pressingLeft  = false;
			self.pressingRight  =false; 
			

			return self;
	}

	

	// combines enemy and player
	Actor = function(type,id,x,y,width,height,img,hp,attackSpeed){

			var self =  Entity(type,id,x,y,width,height,img);

			self.hp = hp;
			self.attackSpeed  = attackSpeed;
			self.attackCounter  = 0;
			self.aimAngle  = 0;

			self.performAttack = function(){

				if( self.attackCounter > 25){	// every 1 sec
						
					// so a bullet is fired after another 1 frame.
					self.attackCounter = 0;	
					generateBullet(self);
				}
			}


			// when right clicked
			self.performSpecialAttack = function(){
				if( self.attackCounter > 50){	

					// so a bullet is fired after another 1 frame.
					self.attackCounter = 0;

					for(var angle = 0; angle <360; angle ++){
						generateBullet(self,angle);
					}

					// generateBullet(self,self.aimAngle -5);
					// generateBullet(self,self.aimAngle);
					// generateBullet(self,self.aimAngle +5);

					
				}
			}

			var super_update = self.update;
			self.update = function(){
				super_update();
				self.attackCounter += self.attackSpeed;
			}

			return self;
	}




	// creates enemies
	Enemy = function (id,x,y,width,height){
		
		var self = Actor('enemy',id,x,y,width,height,Img.enemy,10,1);
	
		enemyList[id]  = self;

		var super_update = self.update;
		self.update = function(){
			super_update();
			self.updateAim();
		}

		self.updateAim = function(){
			var diffX = player.x - self.x;
			var diffY = player.y - self.y;

			self.aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180;
		}

		self.updatePosition = function(){

			var diffX = player.x - self.x;
			var diffY = player.y - self.y;

			if(diffX > 0){
				self.x += 3;
			}else{
				self.x -= 3;
			}

			if(diffY > 0){
				self.y += 3;
			}else{
				self.y -= 3;
			}

		}

	}

	randomlyGenerateEnemy = function(){
		var x = Math.random() * currentMap.width;
		var y = Math.random() * currentMap.height;
		var width = 64; // between 10 and 40
		var height =  64; 
		var id = Math.random();

		Enemy(id,x,y,width,height);
	}


	// creates upgrades
	Upgrade = function (id,x,y,width,height,category,img){

		var self = Entity('upgrade',id,x,y,width,height,img);

		self.category = category;

		upgradeList[id]  = self;
	}

	randomlyGenerateUpgrade = function(){
		var x = Math.random() * currentMap.width;
		var y = Math.random() * currentMap.height;
		var width = 32;
		var height =  32;
		var id = Math.random();

		if(Math.random() < 0.5){
			var category = "score";
			var img = Img.upgrade1;
		}else{
			var category = "attackSpeed";
			var img = Img.upgrade2;
		}

		Upgrade(id,x,y,width,height,category,img);
	}



	// bullets
	Bullet = function (id,x,spdx,y,spdy,width,height,combatType){

		var self = Entity('bullet',id,x,y,width,height,Img.bullet);

		self.timer = 0;

		self.combatType = combatType;

		// only because bullets travel in a line
		self.spdx = spdx;
		self.spdy = spdy;

		self.updatePosition = function(){

			// do the code below if it not a player. If it is a player then the code is in the player constructor
			//enemy
			self.x += self.spdx;
			self.y += self.spdy;
				

			if(self.x < 0 || self.x >currentMap.width){
				//console.log(message);
				self.spdx = -self.spdx;
			}

			if( self.y < 0 || self.y >currentMap.height){
				//console.log(message);
				self.spdy = -self.spdy;
			}
				
		}

		bulletList[id]  = self;
	}

	generateBullet = function(actor, overwriteAngle){
		var x = actor.x;
		var y = actor.y;
		var width = 24;
		var height =  24;
		var id = Math.random();

		var angle;

		if(overwriteAngle !==  undefined){
			angle = overwriteAngle;
		}else{
			angle = actor.aimAngle;
		}

		// divide by 180 and times by pi to convert from degress to radians as computer expects angles in radians
		// hypotenuse is taken as 5....i.e...hypotenuse speed is taken as 5 pixels.
		var spdx = Math.cos(angle/180 * Math.PI) *5;
		var spdy = Math.sin(angle/180 * Math.PI) *5;

		Bullet(id,x,spdx,y,spdy,width,height,actor.type);
	}





