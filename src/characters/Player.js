export class Player {
	constructor(scene, x, y) {
		this.scene = scene;
		this.hurt = false;
		this.isDragging = false;

		this.sprite = scene.impact.add.sprite(x, y, "player");
		this.sprite.accelGround = 1200;
		this.sprite.accelAir = 600;
		this.sprite.jumpSpeed = 700;

		this.controls = scene.input.keyboard.addKeys({
			up: "w",
			down: "s",
			left: "a",
			right: "d",
			interact: "e"
		});

		this.initialize();
	}

	get currentFacing() {
		return this.sprite.flipX ? "left" : "right";
	}

	initialize() {
		//Physics
		this.sprite.setActiveCollision();
		this.sprite.setTypeA();
		this.sprite.setMaxVelocity(500);
		this.sprite.setFriction(1000, 100);
		this.sprite.setGravity(10);
		this.sprite.setBodySize(50, 175);
		this.sprite.setOffset(75, 25);
		this.sprite.setCollideCallback(this.collide, this);

		//Animations
		let { anims } = this.scene;

		anims.create({
			key: "idle",
			frames: anims.generateFrameNumbers("idle", { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "idle_stare",
			frames: anims.generateFrameNumbers("idle_stare", { start: 0, end: 4 }),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "slide",
			frames: anims.generateFrameNames("slide", { start: 0, end: 7 }),
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
			repeat: 1
		});

		anims.create({
			key: "TG_girl_crawlidle",
			frames: anims.generateFrameNames("TG_girl_crawlidle"),
			frameRate: 10,
			repeat: 1
		});

		anims.create({
			key: "TG_girl_hit",
			frames: anims.generateFrameNames("TG_girl_hit"),
			frameRate: 10,
			repeat: 1
		});

		this.scene.events.on("update", this.update, this);

	}

	update(time, delta) {
		let acceleration = this.sprite.standing ? this.sprite.accelGround : this.sprite.accelAir;

		// Left, right, stop
		if (this.controls.left.isDown) {
			this.sprite.setAccelerationX(-acceleration);

			if (this.isDragging) {
				this.sprite.flipX ? this.sprite.anims.play("TG_girl_push", true) : this.sprite.anims.play("TG_girl_pull", true);
			} else {
				this.sprite.flipX = true;
				this.sprite.anims.play("TG_girl_run", true);
			}
		}
		else if (this.controls.right.isDown) {
			this.sprite.setAccelerationX(acceleration);

			if (this.isDragging) {
				this.sprite.flipX ? this.sprite.anims.play("TG_girl_pull", true) : this.sprite.anims.play("TG_girl_push", true);
			} else {
				this.sprite.flipX = false;
				this.sprite.anims.play("TG_girl_run", true);
			}
		}
		else {
			this.sprite.setAccelerationX(0);
		}

		// Jumping
		if (this.controls.up.isDown && this.sprite.body.standing && !this.isDragging) {
			this.sprite.setVelocityY(-this.sprite.jumpSpeed);
			this.sprite.anims.play("TG_girl_jumpup");
		}

		if (this.sprite.vel.y > 0) {
			this.sprite.anims.play("TG_girl_jumpdrop");
		}


		// Idle
		if (this.sprite.vel.x === 0 && this.sprite.vel.y === 0) {
			this.sprite.anims.play("idle", true);
		}

		// Item interactions

		if (this.controls.interact.isDown) {
			console.log("interact is pressed!");
			this.drag();
		} else {
			console.log("interact is NOT pressed!");
		}

	}

	drag() {
		let interactDistance = 150;
		let draggableObjects = this.scene.children.getChildren().filter((gameobject) => gameobject.getData("draggable"));
		let objectsThatAreCloseEnough = draggableObjects.filter((val) => Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, val.x, val.y) <= interactDistance);
		let sortedByDistance = objectsThatAreCloseEnough.sort(function (a, b) {
			let aDistance = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, a.x, a.y);
			let bDistance = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, b.x, b.y);
			return aDistance < bDistance ? a : b;
		}, this);

		if (sortedByDistance.length > 0) {
			let closestDraggable = sortedByDistance[0];
			console.log(closestDraggable)
			closestDraggable.drag();
		}
	}

	collide(bodyA, bodyB, axis) {
		console.log(arguments)
		console.log(this.scene);
		if (!this.hurt) {
			if (bodyB.name == "bottom") {
				this.hurt = true;
				this.scene.cameras.main.flash(125);
				setTimeout(() => {
					this.scene.restart();
				}, 125);
			}

			if (bodyB.type === 2) {
				this.hurt = true;
				this.scene.cameras.main.shake(125);
				setTimeout(() => {
					this.scene.restart();
				}, 250, this);
			}

			if (bodyB.name === "boots") {
				this.sprite.jumpSpeed = this.sprite.jumpSpeed * 1.5;
				bodyB.destroy(); //FIX THIS
			}

			if (bodyB.name === "oldman") {
				this.scene.cameras.main.fadeOut();
				this.scene.start("Win");
			}
		}
	}
}