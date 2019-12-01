
import { setupLevel, setupScene, disableControls, enableControls, Pause } from "../utils/utils";
import { Trigger } from "../items/Trigger";
import { Dad } from "../characters/Dad";
export class DadGraveyard extends Phaser.Scene {
	constructor() {
		super({ key: "dadgraveyard" });
	}
	preload() {
		this.dialogScene = this.scene.get("dialog");
		this.musicScene = this.scene.get("music");
		this.events.on("preupdate", () => this.musicScene.handleMusicUpdate(this));
		this.musicScene.backgroundMusic = this.sound.add("hautausmaamusiikki_tausta", { loop: true, volume: 1, });
		this.musicScene.backgroundMusic.play();
	}
	async create() {
		this.level = setupLevel(this, "graveyard");
		for (let i = 0; i < this.level.widthInPixels; i = i + 1600) {
			this.add.image(i, -100, "tausta_hautausmaa").setOrigin(0, 0).setDepth(-10);
		}
		this.player = new Dad(this, 4000, 1500);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

		this.girl = this.add.sprite(6300, 1600, "TG_girl_idle", 0);
		this.girl.anims.play("TG_girl_idle", true);

		let cutsceneTrigger = new Trigger(this, 5700, 0, 150, 1700, this.graveyardCutscene.bind(this));

		let grave = this.add.sprite(6500, 1550, "item_hauta").setDepth(-1);

		this.cameras.main.fadeIn(1000);
	}

	async graveyardCutscene() {
		disableControls(this);
		this.player.sprite.body.enabled = false;

		let timeline = this.tweens.createTimeline();

		this.cameras.main.pan(this.girl.x, this.girl.y, 3000, "Linear");

		//Approach girl
		timeline.add({
			targets: this.player.sprite,
			x: this.girl.x - 300,
			duration: 2000,
			onStart: () => {
				this.player.sprite.anims.play("isa_walk", true);
			},
			onComplete: () => {
				this.player.sprite.anims.play("isa_idle", true);
			}
		});

		//Girl runs away
		timeline.add({
			targets: this.girl,
			x: this.level.widthInPixels,
			duration: 2000,
			offset: "-=500",
			onStart: () => {
				this.girl.anims.play("TG_girl_run", true);
			},
		});


		timeline.play();


		timeline.on("complete", async () => {
			await Pause(500);
			await this.dialogScene.updateDialog("She must feel so alone.", 3000);
			await Pause(1000);
			await this.dialogScene.updateDialog("... and scared.", 2000);
			await Pause(1000);
			await this.dialogScene.updateDialog("Of course she would get spooked", 3000);
			await Pause(1000);
			await this.dialogScene.updateDialog("She needs me...", 2500);
			await Pause(1000);
			await this.dialogScene.updateDialog("...needs me to be strong.", 3000);
			await Pause(1000);

			this.cameras.main.fadeOut(1000);

			enableControls(this);

			this.scene.transition({
				target: "dadjourney",
				data: {
					backgrounds: ["tausta_metsa"],
					nextSceneKey: "cliff"
				},
				duration: 1000
			});
		})
	}
}
