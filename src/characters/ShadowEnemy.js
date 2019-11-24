export class ShadowEnemy {
	constructor(scene, x, y) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, "varjo_spawn", 0);

		this.senseDistance = 600;
		this.chaseTimeLeft = 0;
		this.speed = scene.player.sprite.body.accelGround * 0.85;
		this.hasSpawned = false;

		this.sprite.setCollidesNever();
		this.sprite.setTypeB();
		this.sprite.setGravity(10);
		this.sprite.setMaxVelocity(scene.player.sprite.body.maxVel.x * 0.85);

		this.sprite.body.handleMovementTrace = this.handleMovementTrace.bind(this);
		this.scene.events.on("preupdate", this.update, this);

		this.animate();

	}

	animate() {
		this.scene.anims.create({
			key: 'varjo_spawn',
			frames: this.scene.anims.generateFrameNames('varjo_spawn'),
			frameRate: 7,
			repeat: 0,
		});

		this.scene.anims.create({
			key: 'varjo_chase',
			frames: this.scene.anims.generateFrameNames('varjo_chase'),
			frameRate: 10,
			repeat: -1,
		});
	}

	spawn() {
		console.log("spawning");
		this.sprite.anims.play("varjo_spawn", true).on("animationcomplete", () => {
			this.hasSpawned = true;
		}, this);

	}

	despawn() {
		console.log("despawning");
		this.scene.events.off("preupdate", this.update, this);
		this.sprite.anims.playReverse("varjo_spawn", true).on("animationcomplete", () => {
			this.sprite.destroy();
		}, this);
	}

	update(time, delta) {


		if (this.hasSpawned) {
			this.sprite.anims.play("varjo_chase", true);

			//Handle gravity on slopes
			if (this.sprite.body.slope) {
				this.sprite.setGravity(0);
			} else {
				this.sprite.setGravity(10);
			}

			this.sprite.flipX = this.sprite.vel.x >= 0;

			if (this.canSeePlayer) {
				this.chaseTimeLeft = 8000;
			} else {
				let newValue = this.chaseTimeLeft - delta;
				this.chaseTimeLeft = newValue > 0 ? newValue : 0;
			}

			(this.canSeePlayer || this.chaseTimeLeft) > 0 ? this.chase() : this.despawn();
		}

		let playerIsNear = Phaser.Geom.Rectangle.Overlaps(this.scene.player.sprite.getBounds(), this.sprite.getBounds());
		if (playerIsNear && !this.hasSpawned) {
			this.spawn();
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

	get canSeePlayer() {
		let { x, y } = this.scene.player.sprite;

		return Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, x, y) < this.senseDistance && !this.scene.player.isHiding;
	}

	chase() {
		this.sprite.setTint("0xFF0000")
		let acceleration = this.scene.player.sprite.x - this.sprite.x > 0 ? this.speed : -this.speed;
		this.sprite.setAccelerationX(acceleration);

		let playerWithinReach = this.sprite.getBounds().contains(this.scene.player.sprite.x, this.scene.player.sprite.y);
		if (playerWithinReach && !this.scene.player.isHiding) {
			this.scene.player.takeDamage(this.scene.player.health);
		}
	}
}