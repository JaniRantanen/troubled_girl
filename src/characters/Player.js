export class Player {
	constructor(scene, x, y) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, "player");

		this.state = {
			health: 3,
			isHurt: false,
			isCrouchingOrCrawling: false,
			isDragging: false,
			isDashing: false,
			isSliding: false,
			isIdle: false,
			isFalling: false,
			isRunning: false,
			isJumping: false,
			isDoubleJumping: false,
			isTouchingGround: false,
		};
		this.sounds = {
			hit: this.scene.sound.add("osuma"),
			jump: this.scene.sound.add("jump"),
		};

		this.default = {
			gravity: new Phaser.Math.Vector2(10, 10),
			maxVelocity: new Phaser.Math.Vector2(500, 500),
			friction: new Phaser.Math.Vector2(1000, 100),
			dashVelocity: new Phaser.Math.Vector2(700, 0),
			slideVelocity: new Phaser.Math.Vector2(1000, 0),
			bouncebackVelocity: new Phaser.Math.Vector2(1000, 0),
			dragAndCrouchVelocity: new Phaser.Math.Vector2(125, 125),
		};

		this.latestCheckpointPosition = new Phaser.Math.Vector2(x, y);

		this.sprite.body.accelGround = 1200;
		this.sprite.body.accelAir = 600;
		this.sprite.body.jumpSpeed = 700;
		this.sprite.body.name = "player";
		this.sprite.body.slopeStanding = { min: Phaser.Math.DegToRad(0), max: Phaser.Math.DegToRad(180) }

		this.sprite.setLiteCollision();
		this.sprite.setTypeA();
		this.sprite.setCheckAgainstB();
		this.sprite.setMaxVelocity(this.default.maxVelocity.x, this.default.maxVelocity.y);
		this.sprite.setFriction(this.default.friction.x, this.default.friction.y);
		this.sprite.setGravity(this.default.gravity.x, this.default.gravity.y);

		// CONTROLS
		this.controls = scene.input.keyboard.addKeys({
			up: "w",
			down: "s",
			left: "a",
			right: "d",
			interact: "e",
		});
		this.controls.up.on("down", () => !this.state.isJumping ? this.jump() : this.doublejump(), this);
		this.controls.down.on("down", () => this.state.isCrouchingOrCrawling = true, this);
		this.controls.down.on("up", () => this.state.isCrouchingOrCrawling = false, this);
		this.controls.interact.on("down", this.startDrag, this);
		this.controls.interact.on("up", this.stopDrag, this);

		// Keycombos
		let dashLeftCombo = this.scene.input.keyboard.createCombo([this.controls.left.keyCode, this.controls.left.keyCode], { resetOnMatch: true, maxKeyDelay: 500 });
		let dashRightCombo = this.scene.input.keyboard.createCombo([this.controls.right.keyCode, this.controls.right.keyCode], { resetOnMatch: true, maxKeyDelay: 500 });
		this.scene.input.keyboard.on('keycombomatch', () => this.sprite.body.standing ? this.slide() : this.dash(), this)

		// MISC EVENTS AND OVERLOADS
		this.scene.events.on("preupdate", this.update, this);
		this.scene.events.on("touchedGround", this.groundCollision, this);
		this.sprite.body.handleMovementTrace = this.handleMovementTrace.bind(this);
		this.sprite.setCollideCallback(this.collide, this);
		this.animate();
	}

	//TODO: Rethink this horrible hack
	get closestInteraction() {
		let interactDistance = 150;
		let { x, y } = this.sprite;

		//What interactable objects there are?
		let interactableObjects = this.scene.children.getChildren().filter((gameobject) => gameobject.getData("interactable"));

		// How many of them are within interaction distance on the correct side (left or right)?
		let objectsThatAreCloseEnough = interactableObjects
			.filter((val) => Phaser.Math.Distance.Between(x, y, val.x, val.y) <= interactDistance)
			.filter((value) => {
				if (!this.sprite.flipX) {
					return value.x > x;
				} else {
					return value.x < x;
				}
			})

		// Sort them by proximity to player coordinates (closest first, farthest last)
		let sortedByDistance = objectsThatAreCloseEnough.sort(function (a, b) {
			let aDistance = Phaser.Math.Distance.Between(x, y, a.x, a.y);
			let bDistance = Phaser.Math.Distance.Between(x, y, b.x, b.y);
			return aDistance < bDistance ? a : b;
		});

		if (sortedByDistance.length > 0) {
			let closestInteraction = sortedByDistance[0];
			return closestInteraction;
		} else {
			return null;
		}
	}

	//TODO: Rethink this horrible hack
	get isHiding() {
		let hideableObjects = this.scene.children.getChildren().filter((gameobject) => gameobject.getData("hideable"));
		if (hideableObjects.length > 0) {
			let isWithinHideable = hideableObjects.some((val) => val.getBounds().contains(this.scene.player.sprite.x, this.scene.player.sprite.y), this);
			return isWithinHideable && this.state.isCrouchingOrCrawling;
		} else {
			return false;
		}
	}

	animate() {
		let { anims } = this.scene;

		anims.create({
			key: "TG_girl_idle",
			frames: anims.generateFrameNames("TG_girl_idle"),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "TG_girl_eyes_stare",
			frames: anims.generateFrameNames("TG_girl_eyes_stare"),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "TG_girl_eyes_turn",
			frames: anims.generateFrameNames("TG_girl_eyes_turn"),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "TG_girl_slide",
			frames: anims.generateFrameNames("TG_girl_slide"),
			frameRate: 10,
			repeat: 1
		});

		anims.create({
			key: "TG_girl_run",
			frames: anims.generateFrameNames("TG_girl_run"),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "TG_girl_jumpup",
			frames: anims.generateFrameNames("TG_girl_jumpup"),
			frameRate: 10,
			repeat: 1
		});

		anims.create({
			key: "TG_girl_jumpdrop",
			frames: anims.generateFrameNames("TG_girl_jumpdrop"),
			frameRate: 10,
			repeat: 1
		});

		anims.create({
			key: "TG_girl_jumpdrop_end",
			frames: anims.generateFrameNames("TG_girl_jumpdrop_end"),
			frameRate: 10,
			repeat: 1
		});

		anims.create({
			key: "TG_girl_doublejump",
			frames: anims.generateFrameNames("TG_girl_doublejump"),
			frameRate: 10,
			repeat: 1
		});

		anims.create({
			key: "TG_girl_hit",
			frames: anims.generateFrameNames("TG_girl_hit"),
			frameRate: 10,
			repeat: 0
		});

		anims.create({
			key: "TG_girl_pull",
			frames: anims.generateFrameNames("TG_girl_pull"),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "TG_girl_push",
			frames: anims.generateFrameNames("TG_girl_push"),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "TG_girl_dash",
			frames: anims.generateFrameNames("TG_girl_dash"),
			frameRate: 10,
			repeat: 1
		});

		anims.create({
			key: "TG_girl_crawlmove",
			frames: anims.generateFrameNames("TG_girl_crawlmove"),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "TG_girl_crawlidle",
			frames: anims.generateFrameNames("TG_girl_crawlidle"),
			frameRate: 10,
			repeat: -1
		});
	}

	/* LIFECYCLE METHODS */
	update(time, delta) {
		this.state.isFalling = this.sprite.vel.y > 0 && !this.sprite.body.standing && !this.state.isDashing;
		this.state.isCrouchingOrCrawling = this.controls.down.isDown || (!this.canStandUp() && this.sprite.vel.y === 0);
		this.state.isIdle = this.sprite.vel.x === 0 && this.sprite.vel.y === 0 && this.sprite.body.standing && this.controls.down.isUp;
		this.state.isRunning = this.sprite.vel.x !== 0 && this.sprite.body.standing && (!this.state.isSliding && !this.state.isCrouchingOrCrawling);
		this.state.isStanding = this.sprite.body.standing;

		let acceleration = this.sprite.standing ? this.sprite.body.accelGround : this.sprite.body.accelAir;

		// Slow down player when dragging items or crawling
		if (this.state.isDragging || this.state.isCrouchingOrCrawling) {
			acceleration = acceleration / 8;
			this.sprite.setMaxVelocity(this.default.dragAndCrouchVelocity.x, this.default.dragAndCrouchVelocity.y);
		} else {
			if (!this.state.isDashing && !this.state.isSliding) {
				this.sprite.setMaxVelocity(this.default.maxVelocity.x, this.default.maxVelocity.y);
			}
		}

		// Handle gravity on slopes
		if (this.sprite.body.slope) {
			this.sprite.setGravity(0);
		} else {
			this.sprite.setGravity(this.default.gravity.x, this.default.gravity.y);
		}

		// Handle moving left, right and stopping
		if (this.controls.left.isDown) {

			this.sprite.setAccelerationX(-acceleration);

			if (this.state.isDragging) {
				this.sprite.flipX ? this.sprite.anims.play("TG_girl_push", true) : this.sprite.anims.play("TG_girl_pull", true);
			} else {
				this.sprite.flipX = true;
				if (this.state.isCrouchingOrCrawling) {
					this.sprite.anims.play("TG_girl_crawlmove", true);
				} else {
					this.sprite.anims.play("TG_girl_run", true);
				}
			}
		}
		else if (this.controls.right.isDown) {

			this.sprite.setAccelerationX(acceleration);

			if (this.state.isDragging) {
				this.sprite.flipX ? this.sprite.anims.play("TG_girl_pull", true) : this.sprite.anims.play("TG_girl_push", true);
			} else {
				this.sprite.flipX = false;
				if (this.state.isCrouchingOrCrawling) {
					this.sprite.anims.play("TG_girl_crawlmove", true);
				} else {
					this.sprite.anims.play("TG_girl_run", true);
				}
			}
		}
		else {
			this.sprite.setAccelerationX(0);
		}

		// Falling
		if (this.state.isFalling) {
			this.sprite.anims.play("TG_girl_jumpdrop", true);
		}

		// Crouching
		if (this.state.isCrouchingOrCrawling && this.sprite.vel.x === 0) {
			this.sprite.anims.play("TG_girl_crawlidle", true);
		}

		//Dashing
		if (this.state.isDashing) {
			this.sprite.anims.play("TG_girl_dash", true);
		}

		//Sliding
		if (this.state.isSliding) {
			this.sprite.anims.play("TG_girl_slide", true);
		}

		// Idle
		if (this.state.isIdle && !this.state.isCrouchingOrCrawling) {
			this.sprite.anims.play("TG_girl_idle", true);
		}

		// Being hurt
		if (this.state.isHurt) {
			this.sprite.anims.play("TG_girl_hit", true);
		}

		this.handleCollisionBoxState();
	}


	/* COLLISION HANDLING */

	handleCollisionBoxState() {
		/*
			Note: Some of the values in this function have been 'jerryrigged' to work for now.
			Changing the widths/heights might make the sprite seem 'off-place',
			due to how they have been placed in the animation sheet.
			TODO: Improve this
		*/

		if (this.state.isCrouchingOrCrawling) {
			let crouchWidth = 150;
			let crouchHeight = 100;
			this.changeCollisionBox({ x: (200 - crouchWidth) / 2, y: 100 }, crouchWidth, crouchHeight);
		}

		if (this.state.isSliding && this.sprite.body.standing) {
			let slideWidth = 150;
			let slideHeight = 100;
			this.changeCollisionBox({ x: (200 - slideWidth) / 2, y: (200 - slideHeight) }, slideWidth, slideHeight);
		}

		if (this.state.isDashing && !this.sprite.body.standing) {
			let dashWidth = 100;
			let dashHeight = 50;
			this.changeCollisionBox({ x: (200 - dashWidth) / 2, y: ((200 - dashHeight) / 2) }, dashWidth, dashHeight);

		}
		if ((this.state.isIdle || this.state.isFalling || this.state.isRunning) && !this.state.isCrouchingOrCrawling) {
			let idleWidth = 50;
			let idleHeight = 160;
			this.changeCollisionBox({ x: (200 - idleWidth) / 2, y: (200 - idleHeight) }, idleWidth, idleHeight);
		}
	}

	canStandUp() {
		let { body } = this.sprite;
		let { collisionMap } = this.scene.impact.world;
		let requiredHeadRoom = 25;
		let theoreticalCollision = collisionMap.trace(body.pos.x, body.pos.y, 0, -requiredHeadRoom, body.size.x, body.size.y);
		return theoreticalCollision.tile.y !== 1;
	}

	changeCollisionBox(nextOffset, width, height) {
		let differenceX = this.sprite.offset.x - nextOffset.x;
		let differenceY = this.sprite.offset.y - nextOffset.y;
		this.sprite.body.pos.x = this.sprite.body.pos.x - differenceX;
		this.sprite.body.pos.y = this.sprite.body.pos.y - differenceY;
		this.sprite.setOffset(nextOffset.x, nextOffset.y, width, height);
	}

	handleMovementTrace(res) {
		if (res.collision.slope && res.collision.slope.nx != 0) {
			this.sprite.body.slope = true;
		} else {
			this.sprite.body.slope = false;
		}

		if (res.collision.y || res.tile.y === 1) {
			this.state.isTouchingGround = true;
			this.scene.events.emit("touchedGround");
		} else {
			this.state.isTouchingGround = false;
		}

		return true; // Due to some other framework code, this function needs to return true in order to work correctly.
	}

	collide(bodyA, bodyB, axis) {
		if (bodyB.name === "bottom") {
			this.takeDamage(100);
		}
		if (bodyB.gameObject && bodyB.gameObject.getData("isGroundLike") && axis === "y") {
			this.state.isTouchingGround = true;
			this.scene.events.emit("touchedGround");
		}
	}

	groundCollision() {
		this.state.isJumping = false;
		this.state.isDoubleJumping = false;
	}


	/* SKILLS */

	jump() {
		if (this.state.isTouchingGround && !this.state.isDragging && !this.state.isSliding && !this.state.isCrouchingOrCrawling) {
			this.state.isJumping = true;
			this.sprite.setVelocityY(-this.sprite.body.jumpSpeed);
			this.sounds.jump.play();
			this.sprite.anims.play("TG_girl_jumpup", true);
		}
	}

	doublejump() {
		if (this.scene.registry.get("doublejumpUnlocked")) {
			if (this.state.isJumping && !this.state.isDoubleJumping) {
				this.state.isDoubleJumping = true;
				this.sprite.setVelocityY(-this.sprite.body.jumpSpeed);
				this.sounds.jump.play();
				this.sprite.anims.play("TG_girl_doublejump", true);
			}
		} else {
			console.log("Double jump skill is not unlocked yet!");
		}
	}

	startDrag() {
		if (this.scene.registry.get("dragUnlocked")) {
			if (this.closestInteraction && this.closestInteraction.getData("draggable")) {
				this.closestInteraction.drag();
				this.state.isDragging = true;
			}
		} else {
			console.log("Drag skill is not unlocked yet!");
		}
	}

	stopDrag() {
		this.state.isDragging = false;
		if (this.closestInteraction && this.closestInteraction.getData("draggable")) {
			this.closestInteraction.drop();
		}
	}

	dash() {
		if (this.scene.registry.get("dashUnlocked")) {
			if (!this.state.isDashing) {
				this.state.isDashing = true;

				let { x, y } = this.default.dashVelocity;
				this.sprite.setVelocityY(0);
				this.sprite.setMaxVelocity(x, y);
				this.sprite.setVelocityX(this.sprite.flipX ? -x : x);

				this.scene.events.on("touchedGround", () => {
					this.sprite.setMaxVelocity(this.default.maxVelocity.x, this.default.maxVelocity.y);
					this.state.isDashing = false;
				}, this);
			}
		} else {
			console.log("Dash skill is not unlocked yet!");
		}
	}

	slide() {
		if (this.scene.registry.get("slideUnlocked")) {
			if (!this.state.isSliding) {
				this.state.isSliding = true;

				let { x, y } = this.default.slideVelocity;
				this.sprite.setVelocityY(0);
				this.sprite.setMaxVelocity(x, y);
				this.sprite.setVelocityX(this.sprite.flipX ? -x : x);

				setTimeout(() => {
					this.sprite.setMaxVelocity(this.default.maxVelocity.x, this.default.maxVelocity.y);
					this.state.isSliding = false;
				}, 500, this);
			}
		} else {
			console.log("Slide skill is not unlocked yet!");
		}
	}


	/* DAMAGE HANDLING */

	takeDamage(amount = 1) {
		if (!this.state.isHurt) {
			this.sounds.hit.play();
			this.state.isHurt = true;
			this.state.health -= amount;
			let bounceBackVelocityX = this.sprite.vel.x > 0 ? -this.default.bouncebackVelocity.x : this.default.bouncebackVelocity.x;
			let bounceBackVelocityY = this.sprite.vel.y < 0 ? this.default.bouncebackVelocity.y : -this.default.bouncebackVelocity.y;
			this.sprite.setVelocityX(bounceBackVelocityX);
			this.sprite.setVelocityY(bounceBackVelocityY);

			if (this.state.health <= 0) {
				this.respawn();
			}

			let flash = this.scene.cameras.main.flash(750);

			flash.on("cameraflashcomplete", function () {
				this.state.isHurt = false;
			}, this);
		}
	}

	respawn() {
		this.state.health = 3;
		this.sprite.body.pos.x = this.latestCheckpointPosition.x;
		this.sprite.body.pos.y = this.latestCheckpointPosition.y;
	}
}