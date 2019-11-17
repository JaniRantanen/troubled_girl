export class Player {
	constructor(scene, x, y) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, "player");

		this.health = 3;
		this.hurt = false;
		this.isDragging = false;

		this.controls = scene.input.keyboard.addKeys({
			up: "w",
			down: "s",
			left: "a",
			right: "d",
			interact: "e",
		});

		this.sprite.body.accelGround = 1200;
		this.sprite.body.accelAir = 600;
		this.sprite.body.jumpSpeed = 700;
		this.sprite.body.name = "player";

		this.sprite.setLiteCollision();
		this.sprite.setTypeA();
		this.sprite.setCheckAgainstB();
		this.sprite.setMaxVelocity(500);
		this.sprite.setFriction(1000, 100);
		this.sprite.setGravity(10);
		this.sprite.setCollideCallback(this.collide, this);

		this.scene.events.on("preupdate", this.update, this);

		this.controls.interact.on("down", this.startDrag, this);
		this.controls.interact.on("up", this.stopDrag, this);
		this.sprite.body.handleMovementTrace = this.handleMovementTrace.bind(this);

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
			return isWithinHideable && this.isCrouchingOrCrawling;
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
			repeat: -1
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
			repeat: 1
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

	update(time, delta) {
		let acceleration = this.sprite.standing ? this.sprite.body.accelGround : this.sprite.body.accelAir;

		//Slow down player when dragging items or crawling
		if (this.isDragging || this.isCrouchingOrCrawling) {
			acceleration = acceleration / 8;
		}

		//Handle gravity on slopes
		if (this.sprite.body.slope) {
			this.sprite.setGravity(0);
		} else {
			this.sprite.setGravity(10);
		}


		// Left, right, stop
		if (this.controls.left.isDown) {
			this.sprite.setAccelerationX(-acceleration);

			if (this.isDragging) {
				this.sprite.flipX ? this.sprite.anims.play("TG_girl_push", true) : this.sprite.anims.play("TG_girl_pull", true);
			} else {
				this.sprite.flipX = true;
				if (this.isCrouchingOrCrawling) {
					this.sprite.anims.play("TG_girl_crawlmove", true);
				} else {
					this.sprite.anims.play("TG_girl_run", true);
				}
			}

		}
		else if (this.controls.right.isDown) {
			this.sprite.setAccelerationX(acceleration);

			if (this.isDragging) {
				this.sprite.flipX ? this.sprite.anims.play("TG_girl_pull", true) : this.sprite.anims.play("TG_girl_push", true);
			} else {
				this.sprite.flipX = false;
				if (this.isCrouchingOrCrawling) {
					this.sprite.anims.play("TG_girl_crawlmove", true);
				} else {
					this.sprite.anims.play("TG_girl_run", true);
				}
			}
		}
		else {
			this.sprite.setAccelerationX(0);
		}

		// Jumping up
		if (this.controls.up.isDown && this.sprite.body.standing && !this.isDragging) {
			this.sprite.setVelocityY(-this.sprite.body.jumpSpeed);
			this.sprite.anims.play("TG_girl_jumpup");
		}

		// Falling
		if (this.sprite.vel.y > 0 && !this.sprite.body.standing) {
			this.sprite.anims.play("TG_girl_jumpdrop");
		}

		// Crouching
		if (this.controls.down.isDown && this.sprite.body.standing && !this.isDragging && this.sprite.vel.x === 0) {
			this.sprite.anims.play("TG_girl_crawlidle", true);
			if (!this.isCrouchingOrCrawling) {
				this.sprite.setBodySize(150, 100);
				this.sprite.setOffset(25, 100);
				this.sprite.body.pos = { x: this.sprite.body.pos.x, y: this.sprite.body.pos.y + 100 };
			}
			this.isCrouchingOrCrawling = true;
		}

		// Idle
		if (this.sprite.vel.x === 0 && this.sprite.vel.y === 0 && this.sprite.body.standing && this.controls.down.isUp) {
			this.sprite.anims.play("TG_girl_idle", true);
			this.sprite.setBodySize(50, 200);
			this.sprite.setOffset(75, 0);

			if (this.isCrouchingOrCrawling) {
				this.sprite.body.pos = { x: this.sprite.body.pos.x, y: this.sprite.body.pos.y - 100 };
				this.isCrouchingOrCrawling = false;
			}

		}
	}

	handleMovementTrace(res) {
		this.scene.events.emit('debug', res);

		if (res.collision.slope && res.collision.slope.nx != 0) {
			this.sprite.body.slope = true;
		} else {
			this.sprite.body.slope = false;
		}

		return true; //Due to some other code, this needs to be true. TODO: Investigate further
	}

	startDrag() {
		if (this.closestInteraction && this.closestInteraction.getData("draggable")) {
			this.closestInteraction.drag();
			this.isDragging = true;
		}
	}

	stopDrag() {
		this.isDragging = false;
		if (this.closestInteraction && this.closestInteraction.getData("draggable")) {
			this.closestInteraction.drop();
		}
	}

	collide(bodyA, bodyB, axis) {
		if (!this.hurt) {
			if (bodyB.type === 2) {
				this.hurt = true;
				let shake = this.scene.cameras.main.shake(125);
				shake.on("camerashakecomplete", () => this.scene.restart());
			}
		}
	}

	takeDamage() {
		if (!this.hurt) {
			this.hurt = true;
			this.health--;
			let bounceBackVelocity = this.sprite.vel.x > 0 ? -1000 : 1000;

			this.sprite.setVelocityX(bounceBackVelocity);

			if (this.health <= 0) {
				this.respawn();
			}

			this.scene.cameras.main.flash(750).on("cameraflashcomplete", function () {
				this.hurt = false;
			}, this);
		}
	}

	respawn() {
		this.scene.events.off("update");
		this.scene.scene.restart();
	}
}