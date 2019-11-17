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

		this.sprite.setLiteCollision();
		this.sprite.setTypeB();
		this.sprite.setGravity(10);
		this.sprite.setMaxVelocity(500)
		this.sprite.setFriction(500, 50)
		this.sprite.setBodySize(250, 350);
		this.sprite.setOffset(75, 50);

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

		this.sprite.anims.play('enemy_hum_idle');
	}

	update(time, delta) {
		//Handle gravity on slopes
		if (this.sprite.body.slope) {
			this.sprite.setGravity(0);
		} else {
			this.sprite.setGravity(10);
		}

		this.sprite.flipX = this.sprite.vel.x >= 0;

		if (this.canSeePlayer) {
			this.searchTimeLeft = 3000;
		} else {
			let newValue = this.searchTimeLeft - delta;
			this.searchTimeLeft = newValue > 0 ? newValue : 0;
		}

		(this.canSeePlayer || this.searchTimeLeft) > 0 ? this.attack() : this.patrol();

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
		this.sprite.setTint("0xFF0000")
		let acceleration = this.scene.player.sprite.x - this.sprite.x > 0 ? this.speed : -this.speed;
		this.sprite.setAccelerationX(acceleration * 2);

		/*
		TODO: FIX THIS HACK
			Horrible (temporary..?) hack to make LITE vs LITE collisions happen. 

			Normally LITE entities will not collide with other LITE entities: See https://impactjs.com/documentation/collision.
			The workaround is described here: https://impactjs.com/forums/help/fixed-entities-collision/page/1

			In order to make ends meet on other specs (ie. the pushable/draggable items), all player and enemy entities need to be set to LITE.
			
			This does not change the fact that the enemies must be able to hit  the player and cause damage

			These next lines are the quick hack that should be fixed!
		*/
		let playerWithinReach = this.sprite.getBounds().contains(this.scene.player.sprite.x, this.scene.player.sprite.y);
		if (playerWithinReach && !this.scene.player.isHiding) {
			this.scene.player.takeDamage();
		}
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
}