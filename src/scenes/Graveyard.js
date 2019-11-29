import { Player } from "../characters/Player";
import { setupLevel, setupScene, disableControls, enableControls, Pause } from "../utils/utils";
import { Trigger } from "../items/Trigger";
import { ShadowEnemy } from "../characters/ShadowEnemy";
export class Graveyard extends Phaser.Scene {
	constructor() {
		super({ key: "graveyard" });
	}
	async create() {
		this.level = setupLevel(this, "graveyard");
		setupScene(this, this.level, "tausta_hautausmaa", { x: 5700, y: 1600 });
		this.musicScene.backgroundMusic = this.sound.add("hautausmaamusiikki_tausta", { loop: true, volume: 1, });
		this.musicScene.backgroundMusic.play();
		this.animate();

		this.mom = this.add.sprite(6250, 1500, "aiti_idle5fps", 0);
		this.dad = this.add.sprite(5200, 1500, "varjoisa_walk", 0).setAlpha(0);
		let grave = this.add.sprite(6500, 1550, "item_hauta");
		let cutsceneTrigger = new Trigger(this, 5700, 0, 150, 1700, this.graveyardCutscene.bind(this));

		let exitTrigger = new Trigger(this, this.level.widthInPixels - 300, 0, 300, this.level.heightInPixels, () => {
			this.scene.transition({
				target: "darkness",
				remove: true,
				duration: 1000
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
		console.log("graveyardCutscene");
		disableControls(this);
		this.player.sprite.body.enabled = false;

		this.player.sprite.anims.play("TG_girl_idle", true);
		this.mom.anims.play("aiti_idle5fps", true);

		await this.dialogScene.updateDialog("Mommy?", 2000);



		var timeline = this.tweens.createTimeline();

		timeline.add({
			targets: this.player.sprite,
			x: this.mom.x - 200,
			duration: 2000,
			ease: 'linear',
			onStart: () => this.player.sprite.anims.play("TG_girl_run", true),
			onComplete: () => {
				console.log("MOVE & TURN");
				this.player.sprite.anims.play("TG_girl_idle");
				this.mom.flipX = true;
			}
		});

		timeline.add({
			targets: this.mom,
			y: this.mom.y - 200,
			duration: 4000,
			ease: 'linear',
			delay: 2000,
			onStart: async () => {
				console.log("CHANGE");
				this.mom.anims.play("aiti_muutos7fps", true);
				this.player.sprite.anims.play("TG_girl_lookup_cry5fps", true);
				await this.dialogScene.updateDialog("Mommy, you’re so pretty!", 3000);
				await this.dialogScene.updateDialog("You’re…", 3000);
			},
			onComplete: () => this.mom.anims.play("aiti_enkeli_idle5fps", true),
		})

		timeline.add({
			targets: this.mom,
			alpha: { from: 1, to: 0 },
			duration: 2000,
			ease: 'linear',
			onStart: async () => {
				console.log("DISAPPEAR");
			},
			onComplete: async () => {
				console.log("LOOKDOWN");
				this.player.sprite.anims.play("TG_girl_lookdown_cry5fps", true);
				await this.dialogScene.updateDialog("…gone", 2000)
				this.player.sprite.anims.play("TG_girl_lookdown_cry_idle5fps", true);
			},
		});

		timeline.add({
			targets: this.dad,
			alpha: { from: 0, to: 1 },
			x: this.player.sprite.x - 300,
			duration: 2000,
			ease: 'linear',
			delay: 4000, //The pause
			onStart: () => {
				console.log("DAD APPEARS");
				this.dad.anims.play("varjoisa_walk", true);
			},
			onComplete: () => {
				this.dad.anims.play("varjoisa_idle", true);
			},
		});


		timeline.add({
			targets: this.player.sprite,
			alpha: { from: 1, to: 1 },
			flipX: true,
			duration: 2000,
			ease: 'linear',
			onStart: () => {
				console.log("MONSTERS APPEAR");
				this.firstMonster = this.add.sprite(this.player.sprite.x - 200, this.player.sprite.y, "varjo_spawn", 0);
				this.secondMonster = this.add.sprite(this.player.sprite.x - 400, this.player.sprite.y, "varjo_spawn", 0);
			},
			onComplete: () => {
				console.log("SPAWNING")
				this.firstMonster.anims.play("varjo_spawn", true)
				this.secondMonster.anims.play("varjo_spawn", true)
			},
		});

		timeline.add({
			targets: this.player.sprite,
			x: this.player.sprite.x + 1000,
			duration: 2000,
			ease: 'linear',
			onComplete: async () => {
				console.log("GIRL RUNS");
				this.player.sprite.anims.play("TG_girl_run", true);
			},
		});


		// this.tweens.add({
		// 	targets: this.player.sprite,
		// 	x: this.player.sprite.x + 1000,
		// 	duration: 1500,
		// 	ease: 'linear',
		// 	completeDelay: 500,
		// });

		timeline.play();
	}
}
