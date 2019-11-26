export class DraggableItem {
	constructor(scene, x, y, spriteKey = "box") {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, spriteKey);

		this.sprite.setData("interactable", true);
		this.sprite.setData("draggable", true);
		this.sprite.setData("isBeingMoved", false);
		this.sounds = {
			drag: this.scene.sound.add("raahausaani"),
		}

		this.sprite.setActiveCollision();
		this.sprite.setGravity(10);
		this.sprite.setMaxVelocity(500);
		this.sprite.setFriction(2000);
		this.sprite.setBounce(0, 0);

		this.sprite.drag = this.drag.bind(this);
		this.sprite.drop = this.drop.bind(this);
		this.sprite.setCollideCallback(this.collide, this);

		this.scene.events.on("update", this.update, this);
		this.sprite.body.handleMovementTrace = this.handleMovementTrace.bind(this);
	}

	update(time, delta) {
		if (this.sprite.body.slope) {
			this.drop();
		}

		if (this.sprite.getData("isBeingMoved")) {
			this.sprite.setVelocityX(this.scene.player.sprite.vel.x);
			this.sprite.setAccelerationX(this.scene.player.sprite.accel.x);
		}

		if (!this.sounds.drag.isPlaying && this.sprite.vel.x !== 0) {
			this.sounds.drag.play();
		} else if (this.sprite.vel.x === 0) {
			this.sounds.drag.stop();
		}
	}
	handleMovementTrace(res) {
		if (res.collision.slope && res.collision.slope.nx != 0) {
			this.sprite.body.slope = true;
		} else {
			this.sprite.body.slope = false;
		}
		return true;
	}

	drag() {
		this.sprite.setData("isBeingMoved", true);
		this.sprite.setTint(0x525252)
	}

	drop() {
		this.sprite.setData("isBeingMoved", false);
		this.sprite.clearTint();
		this.sprite.setVelocity(0, 0);
		this.sprite.setAcceleration(0, 0);
	}

	collide(bodyA, bodyB, axis) {
		//What happens when this is being moved and it collides with the same type on the X axis?
		if (this.sprite.getData("isBeingMoved") && bodyB.type === 0 && axis === "x") {
			this.sprite.setVelocity(0, 0);
			this.sprite.setAcceleration(0, 0);
			this.scene.player.sprite.setVelocity(0, 0);
		}

		//What happens when this is being moved and it collides with an enemy?
		if (this.sprite.getData("isBeingMoved") && bodyB.type === 2) {
			this.scene.player.sprite.setVelocity(0, 0);
		}
	}
}