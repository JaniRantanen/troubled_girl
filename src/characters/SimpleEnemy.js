export class SimpleEnemy {
	constructor(scene, x, y) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, "enemy_hum_idle");
		this.sprite.setData("enemy", true);

		this.state = {
			isAggressive: false,
		}

		this.patrolArea = {
			"start": new Phaser.Math.Vector2(x, 0),
			"end": new Phaser.Math.Vector2(x + 300, 0)
		}

		this.senseDistance = 600;
		this.searchTimeLeft = 0;
		this.speed = 200;

		this.sounds = {
			idle: [
				this.scene.sound.add("vihollisaanet_1"),
				this.scene.sound.add("vihollisaanet_2"),
				this.scene.sound.add("vihollisaanet_3")
			],
		};

		this.sprite.setLiteCollision();
		this.sprite.setTypeB();
		this.sprite.setGravity(10);
		this.sprite.setMaxVelocity(400)
		this.sprite.setFriction(500, 50)
		this.sprite.setBodySize(200, 300);
		this.sprite.setOffset(100, 100);

		this.sprite.body.handleMovementTrace = this.handleMovementTrace.bind(this);
		this.scene.events.on("preupdate", this.update, this);

		this.animate();

	}

	animate() {
		this.scene.anims.create({
			key: 'enemy_hum_idle',
			frames: this.scene.anims.generateFrameNumbers('enemy_hum_idle', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1,
		});

		this.scene.anims.create({
			key: "enemy_hum_walk",
			frames: this.scene.anims.generateFrameNames("enemy_hum_walk"),
			frameRate: 10,
			repeat: -1
		});

		this.scene.anims.create({
			key: "enemy_hum_attackALTERNATIVE",
			frames: this.scene.anims.generateFrameNames("enemy_hum_attackALTERNATIVE"),
			frameRate: 10,
			repeat: -1
		});

		this.sprite.anims.play('enemy_hum_idle');
	}

	update(time, delta) {
		//Handle gravity on slopes
		if (this.sprite.body.slope) {
			this.sprite.setGravity(0);
		} else {
			this.sprite.setGravity(10);
		}

		this.sprite.setData("isAgressive", this.state.isAggressive);
		this.sprite.flipX = this.sprite.vel.x >= 0;

		if (!this.sounds.idle.some((sound) => sound.isPlaying)) {
			let nextSound = this.sounds.idle.shift();
			nextSound.play();
			this.sounds.idle.push(nextSound);
		}


		if (this.canSeePlayer) {
			this.searchTimeLeft = 3000;
		} else {
			let newValue = this.searchTimeLeft - delta;
			this.searchTimeLeft = newValue > 0 ? newValue : 0;
		}

		(this.canSeePlayer || this.searchTimeLeft > 0) ? this.attack() : this.patrol();
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

	attack() {
		let acceleration = this.scene.player.sprite.x - this.sprite.x > 0 ? this.speed : -this.speed;
		this.sprite.setAccelerationX(acceleration * 2);

		this.state.isAggressive = true;
		this.sprite.setTint("0xFF0000");

		let enemyBody = this.sprite.body;
		let playerBody = this.scene.player.sprite.body;

		let playerWithinReach = Phaser.Geom.Rectangle.Overlaps(
			new Phaser.Geom.Rectangle(
				enemyBody.pos.x,
				enemyBody.pos.y,
				enemyBody.size.x,
				enemyBody.size.y
			),
			new Phaser.Geom.Rectangle(
				playerBody.pos.x,
				playerBody.pos.y,
				playerBody.size.x,
				playerBody.size.y
			)
		);

		if (playerWithinReach && !this.scene.player.isHiding) {
			this.sprite.anims.play('enemy_hum_attackALTERNATIVE', true);
			this.scene.player.takeDamage();
		} else {
			this.sprite.anims.play('enemy_hum_walk', true);
		}
	}

	patrol() {
		this.state.isAggressive = false;
		this.sprite.clearTint();
		this.sprite.anims.play('enemy_hum_walk', true);

		if (this.sprite.x < this.patrolArea.start.x) {
			this.sprite.setAccelerationX(this.speed);
		}

		if (this.sprite.x > this.patrolArea.end.x) {
			this.sprite.setAccelerationX(-this.speed);
		}
	}
}