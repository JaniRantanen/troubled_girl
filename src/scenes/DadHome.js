import { Pause, setupLevel } from "../utils/utils";
import { DraggableItem } from "../items/DraggableItem";

export class DadHome extends Phaser.Scene {
	constructor() {
		super({ key: "dadhome" });
	}
	async create() {
		this.dialogScene = this.scene.get("dialog");

		let floor_1_Y = 1600;
		this.level = setupLevel(this, "home");
		this.dadsRecliner = this.add.image(3300, floor_1_Y, "koti_nojatuoli_isalla");
		this.dadsTv = this.add.sprite(3600, floor_1_Y, "koti_tv_uusi", 0);
		this.livingroomWindow = this.add.sprite(1700, floor_1_Y - 150, "koti_ikkuna_reveal");

		this.dad = this.add.sprite(3300, floor_1_Y - 100, "isa_idle", 0).setAlpha(0);
		this.cameras.main.startFollow(this.dad, true, 0.1, 0.1);
		this.animate();

		// Girls room
		let box = new DraggableItem(this, 900, floor_1_Y, "koti_laatikko");
		let chair = new DraggableItem(this, 1100, floor_1_Y, "koti_tuoli_sivu");

		await this.cutscene();

	}

	animate() {
		let { anims } = this.scene;

		this.anims.create({
			key: "isa_idle",
			frames: this.anims.generateFrameNames("isa_idle"),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: "isa_walk",
			frames: this.anims.generateFrameNames("isa_walk"),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: "isa_jumptry",
			frames: this.anims.generateFrameNames("isa_jumptry"),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: "isa_jumpsuccess_onair",
			frames: this.anims.generateFrameNames("isa_jumpsuccess_onair"),
			frameRate: 10,
			repeat: 0
		});
	}

	async cutscene() {

		await Pause(500);
		await this.dialogScene.updateDialog("I must have fallen asleep.", 2000);
		await Pause(1000);
		await this.dialogScene.updateDialog("Haven’t slept for weeks now.", 2000);
		await Pause(1000);
		await this.dialogScene.updateDialog("Nothing makes sense.", 2000);
		await Pause(1000);
		await this.dialogScene.updateDialog("...wait where is she?", 2000);

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
		let timespanForMovement = 5000;
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
		await this.dialogScene.updateDialog("Where is my daughter?", 2000);

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