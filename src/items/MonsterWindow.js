import { rejects } from "assert";

export class MonsterWindow {
	constructor(scene, x, y, spriteKey) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, spriteKey, 0);
		this.sprite.setCollidesNever();
		this.sprite.setDepth(-1);
		this.sprite.setGravity(0);
		this.create();
	}
	create() {
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
			repeat: 1
		});
	}

	enter() {
		return new Promise((resolve, reject) => {
			this.sprite.anims.play("koti_ikkuna_reveal", true)
				.on('animationcomplete', () => this.sprite.anims.play("koti_ikkuna_looking", true)
					.on('animationcomplete', () => {
						resolve();
					}));
		})
	};


	exit() {
		this.sprite.anims.playReverse("koti_ikkuna_reveal", true);
	}
}