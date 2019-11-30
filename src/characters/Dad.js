export class Dad {
	constructor(scene, x, y) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, "isa_idle", 0);

		this.state = {
			isIdle: false,
			isJumping: false,
		}

		this.latestCheckpointPosition = new Phaser.Math.Vector2(x, y);

		this.sprite.body.accelGround = 1200;
		this.sprite.body.accelAir = 600;
		this.sprite.body.jumpSpeed = 700;
		this.sprite.setOffset(150, -25, 100, 400);

		this.sprite.setLiteCollision();
		this.sprite.setMaxVelocity(500);
		this.sprite.setFriction(1000, 100);
		this.sprite.setGravity(10);

		this.controls = scene.input.keyboard.addKeys({
			up: "w",
			down: "s",
			left: "a",
			right: "d",
		});

		this.controls.up.on("down", this.jump, this);

		this.sprite.on('animationstart', function (anim, frame) {
			if (anim.key === "isa_jumptry") {
				this.state.isJumping = true;
			}
		}, this);

		this.sprite.on('animationcomplete', function (anim, frame) {
			if (anim.key === "isa_jumptry") {
				this.state.isJumping = false;
			}
		}, this);

		this.scene.events.on("preupdate", this.update, this);
		this.sprite.setCollideCallback(this.collide, this);

		this.animate();
	}

	animate() {
		let { anims } = this.scene;

		anims.create({
			key: "isa_idle",
			frames: anims.generateFrameNames("isa_idle"),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "isa_walk",
			frames: anims.generateFrameNames("isa_walk"),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: "isa_jumptry",
			frames: anims.generateFrameNames("isa_jumptry"),
			frameRate: 10,
			repeat: 0
		});

		anims.create({
			key: "isa_jumpsuccess",
			frames: anims.generateFrameNames("isa_jumpsuccess"),
			frameRate: 10,
			repeat: 0
		});

		anims.create({
			key: "isa_jumpsuccess_onair",
			frames: anims.generateFrameNames("isa_jumpsuccess_onair"),
			frameRate: 10,
			repeat: -1
		});
	}

	update(time, delta) {
		this.state.isIdle = this.sprite.vel.x === 0 && this.sprite.vel.y === 0 && this.sprite.body.standing && !this.state.isJumping;
		let acceleration = this.sprite.standing ? this.sprite.body.accelGround : this.sprite.body.accelAir;

		// Handle moving left, right and stopping
		if (this.controls.left.isDown) {
			this.sprite.setAccelerationX(-acceleration);
			this.sprite.flipX = true;
			this.sprite.anims.play("isa_walk", true);
		}
		else if (this.controls.right.isDown) {
			this.sprite.setAccelerationX(acceleration);
			this.sprite.flipX = false;
			this.sprite.anims.play("isa_walk", true);
		}
		else {
			this.sprite.setAccelerationX(0);
		}

		if (this.state.isIdle) {
			this.sprite.anims.play("isa_idle", true);
		}
	}

	jump() {
		this.sprite.anims.play("isa_jumptry", true);
	}

	collide(bodyA, bodyB, axis) {
		if (bodyB.name === "bottom") {
			this.respawn();
		}
	}

	respawn() {
		let flash = this.scene.cameras.main.flash(750);
		this.sprite.body.pos.x = this.latestCheckpointPosition.x;
		this.sprite.body.pos.y = this.latestCheckpointPosition.y - (this.sprite.body.size.y / 2);
		this.sprite.setVelocity(0, 0);
	}
}
