import { Pause, setupLevel } from "../utils/utils";
import { DraggableItem } from "../items/DraggableItem";

export class DadHome extends Phaser.Scene {
	constructor() {
		super({ key: "dadhome" });
	}
	preload() {
		this.dialogScene = this.scene.get("dialog");
		this.musicScene = this.scene.get("music");
		this.musicScene.changeTrack("metsamusiikki_tausta");
	}
	async create() {
		let floor_1_Y = 1600;
		this.level = setupLevel(this, "home");

		this.dadsRecliner = this.add.image(3300, floor_1_Y, "koti_nojatuoli_isalla");
		this.dadsTv = this.add.sprite(3600, floor_1_Y, "koti_tv_uusi", 0);
		this.livingroomWindow = this.add.sprite(1700, floor_1_Y - 150, "koti_ikkuna_reveal");

		this.dad = this.add.sprite(3300, floor_1_Y - 100, "isa_idle", 0).setAlpha(0);
		this.cameras.main.startFollow(this.dad, true, 0.1, 0.1);

		// Girls room
		let box = new DraggableItem(this, 900, floor_1_Y, "koti_laatikko");
		let chair = new DraggableItem(this, 1100, floor_1_Y, "koti_tuoli_sivu");

		await this.cutscene();

	}
	async cutscene() {
		this.cameras.main.fadeIn(1000);
		await this.dialogScene.updateDialog("I must have fallen asleep.", 3000);
		await Pause(1000);
		await this.dialogScene.updateDialog("Haven't slept for weeks now.", 3000);
		await Pause(2000);
		await this.dialogScene.updateDialog("Nothing makes sense.", 2500);
		await Pause(1000);
		await this.dialogScene.updateDialog("...wait where is she?", 2500);

		// Appear and change chair sprite
		this.tweens.add({
			targets: this.dad,
			alpha: { from: 0, to: 1 },
			duration: 1000,
			onStart: () => {
				this.dadsRecliner.setTexture("koti_nojatuoli");
			}
		});

		await Pause(1000);

		// Move near girls room
		let timespanForMovement = 6200;
		this.tweens.add({
			targets: this.dad,
			x: 1500,
			duration: timespanForMovement,
			ease: "linear",
			onStart: () => {
				this.dad.flipX = true;
				this.dad.anims.play("isa_walk", true);
				this.dad.setDepth(3)
			},
			onComplete: () => {
				this.dad.anims.play("isa_idle", true);

			}
		});

		await Pause(timespanForMovement);

		await this.dialogScene.updateDialog("Where has she gone?", 2000);
		await this.dialogScene.updateDialog("Where is my daughter?", 3000);

		this.cameras.main.fadeOut(1000).on("camerafadeoutcomplete", () => {
			this.scene.transition({
				target: "dadjourney",
				data: {
					backgrounds: ["tausta_leikkikentta", "tausta_metsa"],
					nextSceneKey: "dadgraveyard"
				},
				remove: true
			});
		});
	}
}