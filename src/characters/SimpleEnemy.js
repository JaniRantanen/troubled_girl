export class SimpleEnemy {
	constructor(scene, x, y) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, "enemy_hum_idle");

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
		this.sprite.setActiveCollision();
		this.sprite.setTypeB();
		this.sprite.setGravity(10);
		this.sprite.setMaxVelocity(500)
		this.sprite.setFriction(500, 100)
		this.sprite.setBodySize(300, 350);
		this.sprite.setOffset(50, 50);
		this.sprite.setCollideCallback(this.collide, this);

		this.scene.anims.create({
			key: 'enemy_hum_idle',
			frames: this.scene.anims.generateFrameNumbers('enemy_hum_idle', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1,
		})

		this.sprite.anims.play('enemy_hum_idle');

		this.scene.events.on("update", this.update, this);

	}

	update(time, delta) {

		if (this.sprite.scene) {

			this.sprite.flipX = this.sprite.vel.x >= 0;

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
		return Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.scene.player.sprite.x, this.scene.player.sprite.y) < this.senseDistance;
	}

	attack() {
		this.sprite.setTint("0xFF0000")
		let acceleration = this.scene.player.x - this.sprite.x > 0 ? this.speed : -this.speed;
		this.sprite.setAccelerationX(acceleration * 2);
	}

	patrol() {
		this.sprite.clearTint();
		if (this.sprite.x < this.patrolArea.start.x) {
			this.sprite.setAccelerationX(this.speed);
		}

		if (this.sprite.x > this.patrolArea.end.x) {
			this.sprite.setAccelerationX(-this.speed);
		}

	}

	collide(bodyA, bodyB, axis) {
		//console.log("Enemy collide!");
	}

}