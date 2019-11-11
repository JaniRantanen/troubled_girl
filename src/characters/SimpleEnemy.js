export class SimpleEnemy {
	constructor(scene, x, y) {
		this.body = scene.impact.add.sprite(x, y, "enemy_hum_idle");

		this.patrolArea = {
			"start": new Phaser.Math.Vector2(x, 0),
			"end": new Phaser.Math.Vector2(x + 300, 0)
		}

		this.senseDistance = 600;
		this.searchTimeLeft = 0;
		this.speed = 200;

		this.initialize();

	}

	initialize() {
		this.body.setActiveCollision();
		this.body.setTypeB();
		this.body.setGravity(10);
		this.body.setMaxVelocity(500)
		this.body.setFriction(500, 100)
		this.body.setBodySize(300, 350);
		this.body.setOffset(50, 50);

		this.body.scene.anims.create({
			key: 'enemy_hum_idle',
			frames: this.body.scene.anims.generateFrameNumbers('enemy_hum_idle', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1,
		})

		this.body.anims.play('enemy_hum_idle');

		this.body.scene.events.on("update", this.update, this);
	}

	update(time, delta) {

		if (this.body.scene) {

			this.body.flipX = this.body.vel.x >= 0;

			if (this.canSeePlayer) {
				this.searchTimeLeft = 3000;
			} else {
				let newValue = this.searchTimeLeft - delta;
				this.searchTimeLeft = newValue > 0 ? newValue : 0;
			}

			this.isAlert ? this.attack() : this.patrol();
		}

	}

	get isAlert() {
		return this.canSeePlayer || this.searchTimeLeft > 0;
	}

	get canSeePlayer() {
		return Phaser.Math.Distance.Between(this.body.x, this.body.y, this.body.scene.player.x, this.body.scene.player.y) < this.senseDistance;
	}

	attack() {
		this.body.setTint("0xFF0000")
		let acceleration = this.body.scene.player.x - this.body.x > 0 ? this.speed : -this.speed;
		this.body.setAccelerationX(acceleration * 2);
	}

	patrol() {
		this.body.clearTint();
		if (this.body.x < this.patrolArea.start.x) {
			this.body.setAccelerationX(this.speed);
		}

		if (this.body.x > this.patrolArea.end.x) {
			this.body.setAccelerationX(-this.speed);
		}

	}

}