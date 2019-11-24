export class TriggerObject {
	constructor(scene, x, y, spriteKey, triggerFunction, singleFire = true) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, spriteKey, 0);
		this.sprite.setCollidesNever();
		this.sprite.setDepth(-1);
		this.sprite.setGravity(0);
		this.triggerFunction = triggerFunction;
		this.singleFire = singleFire;
		this._hasFired = false;

		this.scene.events.on("preupdate", this.update, this);
		this.animate();
	}

	update() {
		let playerOverlapsTrigger = Phaser.Geom.Rectangle.Overlaps(this.scene.player.sprite.getBounds(), this.sprite.getBounds());
		if (playerOverlapsTrigger && (!this._hasFired && this.singleFire)) {
			this.triggerFunction();
			this._hasFired = true;
		}
	}

	animate() {
		let { anims } = this.scene;

		anims.create({
			key: "koti_ikkuna_reveal",
			frames: anims.generateFrameNames("koti_ikkuna_reveal"),
			frameRate: 10,
			repeat: 1
		});

		anims.create({
			key: "koti_ikkuna_looking",
			frames: anims.generateFrameNames("koti_ikkuna_looking"),
			frameRate: 10,
			repeat: -1
		});
	}

	enter() {
		this.sprite.anims.play("koti_ikkuna_reveal", true).on('animationcomplete', () => this.sprite.anims.play("koti_ikkuna_looking", true));
	}

	exit() {
		this.sprite.anims.playReverse("koti_ikkuna_reveal", true);
	}
}