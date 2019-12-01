
import { setupLevel, setupScene, disableControls, enableControls, Pause } from "../utils/utils";
import { Trigger } from "../items/Trigger";
export class Graveyard extends Phaser.Scene {
	constructor() {
		super({ key: "graveyard" });
	}
	async create() {
		this.level = setupLevel(this, "graveyard");
		setupScene(this, this.level, "tausta_hautausmaa", { x: 4000, y: 1600 });
		this.musicScene.backgroundMusic = this.sound.add("hautausmaamusiikki_tausta", { loop: true, volume: 1, });
		this.musicScene.backgroundMusic.play();
		this.animate();

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

	animate() {
		let { anims } = this.scene;

		//Mom
		this.anims.create({
			key: "aiti_idle5fps",
			frames: this.anims.generateFrameNames("aiti_idle5fps"),
			frameRate: 5,
			repeat: -1
		});

		this.anims.create({
			key: "aiti_muutos7fps",
			frames: this.anims.generateFrameNames("aiti_muutos7fps"),
			frameRate: 7,
			repeat: 0
		});

		this.anims.create({
			key: "aiti_enkeli_idle5fps",
			frames: this.anims.generateFrameNames("aiti_enkeli_idle5fps"),
			frameRate: 5,
			repeat: -1
		});

		//Dad
		this.anims.create({
			key: "varjoisa_walk",
			frames: this.anims.generateFrameNames("varjoisa_walk"),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
			key: "varjoisa_idle",
			frames: this.anims.generateFrameNames("varjoisa_idle"),
			frameRate: 10,
			repeat: -1
		});


		// Monsters
		this.anims.create({
			key: 'varjo_spawn',
			frames: this.anims.generateFrameNames('varjo_spawn'),
			frameRate: 7,
			repeat: 0,
		});
	};

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
				console.log("STARTED MOVE");
				this.player.sprite.anims.play("TG_girl_run", true)
			},
			onComplete: () => {
				console.log("ENDED MOVE");
				this.player.sprite.anims.play("TG_girl_idle");
			}
		});

		// Mom turns to face girl
		timeline.add({
			targets: this.mom,
			alpha: { from: 1, to: 1 }, // "empty param"
			duration: 500,
			onStart: () => {
				console.log("MOM TURN START")
			},
			onComplete: () => {
				console.log("MOM TURN END");
				this.mom.flipX = true;
			}
		});

		// Mom change animations
		timeline.add({
			targets: this.mom,
			alpha: { from: 1, to: 1 }, // "empty param"
			duration: 2000,
			onStart: () => {
				console.log("CHANGE START")
			},
			onComplete: () => {
				console.log("CHANGE END");
				this.mom.anims.play("aiti_muutos7fps", true)
					.on("animationcomplete", () => this.mom.anims.play("aiti_enkeli_idle5fps", true))
					.on("animationcomplete", () => this.player.sprite.anims.play("TG_girl_lookup_cry5fps", true));
			},

		})

		// Mom floats upwards
		timeline.add({
			targets: this.mom,
			y: this.mom.y - 200,
			duration: 3000,
			ease: 'linear',
			onStart: () => {
				console.log("FLOAT START")
			},
			onComplete: () => {
				console.log("FLOAT END");
			},
		})

		// GIRL COMMENT
		timeline.add({
			targets: this.player.sprite,
			alpha: { from: 1, to: 1 }, // "empty param"
			duration: 3000,
			onStart: async () => {
				console.log("WATCH START")
				await this.dialogScene.updateDialog("Mommy, you’re so pretty!", 3000);
			},
			onComplete: async () => {
				console.log("WATCH END");

			},
		});

		// MOM DISAPPEARS
		timeline.add({
			targets: this.mom,
			alpha: { from: 1, to: 0 },
			duration: 1000,
			ease: 'linear',
			onStart: async () => {
				console.log("DISAPPEAR START");
				await this.dialogScene.updateDialog("Mommy, you’re…", 1000);
			},
			onComplete: async () => {
				console.log("DISAPPEAR END");
				this.player.sprite.anims.play("TG_girl_lookdown_cry5fps", true);
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
				console.log("DAD APPEAR START");
				this.dad.anims.play("varjoisa_walk", true);
			},
			onComplete: () => {
				console.log("DAD APPEAR END");
				this.dad.anims.play("varjoisa_idle", true);
			},
		});

		timeline.add({
			targets: [this.firstMonster, this.secondMonster],
			alpha: { from: 0, to: 1 },
			duration: 500,
			onStart: () => {
				console.log("MONSTERS START");
				this.firstMonster.anims.play("varjo_spawn", true);
			},
			onComplete: () => {
				console.log("MONSTERS END");
				this.secondMonster.anims.play("varjo_spawn", true);
			},
		});

		timeline.add({
			targets: this.player.sprite,
			x: this.level.widthInPixels,
			duration: 2000,
			delay: 2000,
			ease: 'linear',
			onStart: () => {
				console.log("GIRL RUN START");
				this.player.sprite.anims.play("TG_girl_run", true);
			},
			onComplete: () => {
				console.log("GIRL RUN END");
			},
		});

		timeline.play();
		timeline.on("complete", () => {
			console.log("COMPLETE");
			console.log(this);
			console.log(this.player.sprite);
			console.log(this.player.sprite.body);
			this.player.sprite.body.pos.x = this.level.widthInPixels - this.player.sprite.width;
			this.player.sprite.body.enabled = true;
			enableControls(this);
		})
	}
}
