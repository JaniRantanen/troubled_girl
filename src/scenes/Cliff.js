import { Trigger } from "../items/Trigger";
import { setupLevel } from "../utils/utils";
import { Dad } from "../characters/Dad";
export class Cliff extends Phaser.Scene {
	constructor() {
		super({ key: "cliff" });

		this.backgroundChatter = [
			"Mommy... Why did you leave me?",
			"I'm scared...",
			"I don't want to be alone..."
		];
	}

	preload() {
		this.dialogScene = this.scene.get("dialog");

		this.anims.create({
			key: "TG_girl_cryonground2fps",
			frames: this.anims.generateFrameNames("TG_girl_cryonground2fps"),
			frameRate: 2,
			repeat: -1
		});
	}

	async create() {
		setupLevel(this, "cliff");
		this.add.image(0, 0, "tausta_kallio1").setOrigin(0, 0).setDepth(-2);

		this.player = new Dad(this, 300, 500);
		this.player.sprite.setScale(0.5);
		this.player.sprite.setOffset(150 / 2, -25 / 2, 100 / 2, 400 / 2);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

		this.girl = this.add.sprite(1200, 650, "TG_girl_cryonground2fps", 0).setScale(0.5);
		this.girl.anims.play("TG_girl_cryonground2fps", true);

		this.dialogLoop = setInterval(async () => {
			let next = this.backgroundChatter.shift();
			await this.dialogScene.updateDialog(next, 2500);
			this.backgroundChatter.push(next);
		}, 5000);

		this.customTrigger = new Trigger(this, 400, 400, 300, 300, this.triggerLogic.bind(this), false);
		this.cutSceneHasFired = false;
	}

	async triggerLogic() {
		if (this.player.controls.up.isDown && !this.cutSceneHasFired) {
			this.cutSceneHasFired = true;
			clearInterval(this.dialogLoop);
			await this.cutscene();
		}
	}

	async cutscene() {
		this.player.sprite.setAlpha(0);
		this.player.sprite.body.enabled = false;
		let cutsceneDad = this.add.sprite(this.player.sprite.x, this.player.sprite.y, "isa_idle", 0);
		cutsceneDad.setScale(0.5);

		let { width, height } = this.sys.canvas;
		let screenCenter = this.cameras.main.getWorldPoint(width / 2, height / 2);

		cutsceneDad.anims.play("isa_jumptry", true)
		cutsceneDad.anims.chain("isa_jumpsuccess");
		cutsceneDad.anims.chain("isa_jumpsuccess_onair")
			.on("animationstart", () => {
				this.tweens.add({
					targets: cutsceneDad,
					x: screenCenter.x - (cutsceneDad.width / 3),
					y: screenCenter.y,
					duration: 500,
					ease: "linear",
					onStart: () => {
						this.cameras.main.fadeOut(500);
						this.scene.transition({
							target: "ending",
							remove: true
						});
					},
				});
			});
	}
}
