
import { setupLevel, setupScene, disableControls, enableControls, Pause } from "../utils/utils";
import { Trigger } from "../items/Trigger";
export class Graveyard extends Phaser.Scene {
	constructor() {
		super({ key: "graveyard" });
	}
	async create() {
		this.level = setupLevel(this, "graveyard");
		setupScene(this, this.level, "tausta_hautausmaa", { x: 4000, y: 1600 });
		let backgroundMusic = this.sound.add("hautausmaamusiikki_tausta", { loop: true, volume: 1, });
		this.musicScene.changeBackroundTrack(backgroundMusic);

		this.mom = this.add.sprite(6250, 1500, "aiti_idle5fps", 0);
		this.dad = this.add.sprite(5200, 1500, "varjoisa_walk", 0).setAlpha(0);
		this.firstMonster = this.add.sprite(5550, 1500, "varjo_spawn", 0).setFlipX(true).setAlpha(0);
		this.secondMonster = this.add.sprite(5850, 1500, "varjo_spawn", 0).setFlipX(true).setAlpha(0);
		let grave = this.add.sprite(6500, 1550, "item_hauta").setDepth(-1);
		let cutsceneTrigger = new Trigger(this, 5700, 0, 150, 1700, this.graveyardCutscene.bind(this));


		let exitTrigger = new Trigger(this, this.level.widthInPixels - 300, 0, 300, this.level.heightInPixels, () => {
			this.scene.transition({
				target: "darkness",
				remove: true
			});
		});
	}

	async graveyardCutscene() {
		disableControls(this);
		this.player.sprite.body.enabled = false;

		this.player.sprite.anims.play("TG_girl_idle", true);
		this.mom.anims.play("aiti_idle5fps", true);

		await this.dialogScene.updateDialog("Mommy?", 2000);

		var timeline = this.tweens.createTimeline();

		// Moving to mom and stopping
		timeline.add({
			targets: this.player.sprite,
			x: this.mom.x - 200,
			delay: 2000,
			duration: 2000,
			onStart: () => {
				this.player.sprite.anims.play("TG_girl_run", true)
			},
			onComplete: () => {
				this.player.sprite.anims.play("TG_girl_idle");
			}
		});

		// Mom turns to face girl
		timeline.add({
			targets: this.mom,
			alpha: { from: 1, to: 1 }, // "empty param"
			duration: 500,
			onStart: () => {
			},
			onComplete: () => {
				this.mom.flipX = true;
			}
		});

		// Mom change animations
		timeline.add({
			targets: this.mom,
			alpha: { from: 1, to: 1 }, // "empty param"
			duration: 2000,
			onComplete: () => {
				this.mom.anims.play("aiti_muutos7fps", true)
					.on("animationcomplete", () => this.mom.anims.play("aiti_enkeli_idle5fps", true))
					.on("animationcomplete", () => this.player.sprite.anims.play("TG_girl_lookup_cry5fps", true));
			},

		})

		// Mom floats upwards
		timeline.add({
			targets: this.mom,
			y: this.mom.y - 70,
			duration: 3000,
			ease: 'linear',
		})

		// GIRL COMMENT
		timeline.add({
			targets: this.player.sprite,
			alpha: { from: 1, to: 1 }, // "empty param"
			duration: 3000,
			onStart: async () => {
				await this.dialogScene.updateDialog("Mommy, you're so pretty!", 3000);
			}
		});

		// MOM DISAPPEARS
		timeline.add({
			targets: this.mom,
			alpha: { from: 1, to: 0 },
			duration: 6000,
			ease: 'linear',
			onStart: async () => {
				await Pause(1000)
				await this.dialogScene.updateDialog("Mommy, you're…", 2000);
			},
			onComplete: async () => {
				this.player.sprite.anims.play("TG_girl_lookdown_cry5fps", true);
				await Pause(1000)
				await this.dialogScene.updateDialog("…gone.", 2000)
				this.player.sprite.anims.play("TG_girl_lookdown_cry_idle5fps", true);
			},
		});



		timeline.add({
			targets: this.dad,
			alpha: { from: 0, to: 1 },
			x: this.player.sprite.x - 350,
			duration: 2000,
			delay: 4000, //The pause
			onStart: () => {
				this.dad.anims.play("varjoisa_walk", true);
			},
			onComplete: () => {
				this.dad.anims.play("varjoisa_idle", true);
			},
		});

		timeline.add({
			targets: [this.firstMonster, this.secondMonster],
			alpha: { from: 0, to: 1 },
			duration: 500,
			onStart: () => {
				this.firstMonster.anims.play("varjo_spawn", true);
			},
			onComplete: () => {
				this.secondMonster.anims.play("varjo_spawn", true);
			},
		});

		timeline.add({
			targets: this.player.sprite,
			x: this.level.widthInPixels,
			duration: 2000,
			delay: 2000,
			ease: 'Power2',
			onStart: () => {
				this.player.sprite.anims.play("TG_girl_run", true);
			},
			onComplete: () => {
			},
		});

		timeline.add({
			targets: [this.firstMonster, this.secondMonster],
			x: this.level.widthInPixels,
			duration: 1000,
			offset: "-=1000",
			ease: 'Power2',
			onStart: () => {
				this.cameras.main.fadeOut(1000);
				this.firstMonster.setTint("0xFF0000");
				this.secondMonster.setTint("0xFF0000");
			},
		});

		timeline.play();
		timeline.on("complete", () => {
			this.player.sprite.body.pos.x = this.level.widthInPixels - this.player.sprite.width;
			this.player.sprite.body.enabled = true;
			enableControls(this);
		})
	}
}
