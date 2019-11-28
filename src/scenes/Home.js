import { Player } from "../characters/Player";
import { Toy } from "../items/Toy";
import { DraggableItem } from "../items/DraggableItem";
import { Crawlspace } from "../items/Crawlspace";
import { Pause, setupLevel, disableControls, enableControls } from "../utils/utils";
import { TriggerObject } from "../items/TriggerObject";
import { ShadowEnemy } from "../characters/ShadowEnemy";
import { SimpleEnemy } from "../characters/SimpleEnemy";
export class Home extends Phaser.Scene {
	constructor() {
		super({ key: "home" });
		this.player = null;
		this.dialogScene = null;
	}
	preload() {
		this.dialogScene = this.scene.get("dialog");
	}

	async create() {

		let floor_1_Y = 1600;
		let floor_2_Y = 1000;
		let floor_3_Y = 500;
		this.player = new Player(this, 900, floor_1_Y);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

		setupLevel(this, "home");

		// let bear = new Toy(this, 150, floor_1_Y, "item_nalle", this.cutscene_bearPickup.bind(this));
		// //let bed = new Crawlspace(this, 500, floor_1_Y, "koti_sanky");
		// let box = new DraggableItem(this, 1100, floor_1_Y, "koti_laatikko");

		// let chair = new DraggableItem(this, 1300, floor_1_Y, "koti_tuoli_sivu");
		// chair.sprite.flipX = true;

		this.firstFloorWindow = new TriggerObject(this, 1700, floor_1_Y - 150, "koti_ikkuna_reveal", this.cutscene_monster.bind(this));
		this.dadsRecliner = this.add.image(3300, floor_1_Y, "koti_nojatuoli");
		this.dadsTv = this.add.sprite(3600, floor_1_Y, "koti_tv_uusi", 0);

		//second floor
		let kitchenTable = this.add.image(800, floor_2_Y, "koti_poytaliinalla").setDepth(-1);
		let stool = new DraggableItem(this, 500, floor_2_Y, "koti_jakkara");
		let lamp = new DraggableItem(this, 3600, floor_2_Y - 50, "koti_lamppu");

		//third floor
		let stackedBoxes = [
			new DraggableItem(this, 2500, floor_3_Y, "koti_laatikko"),
			new DraggableItem(this, 2500, floor_3_Y - 100, "koti_laatikko"),
			new DraggableItem(this, 2500, floor_3_Y - 200, "koti_laatikko"),
		]

		//Outside
		let dialogTrigger = new TriggerObject(this, 4500, floor_1_Y - 1000, "widebox", this.cutscene_outside.bind(this));

		let garageEnemy = new SimpleEnemy(this, 5000, floor_1_Y);


		//this.cutscene_intro();
	}

	async cutscene_intro() {
		this.cameras.main.setAlpha(0);
		await this.dialogScene.updateDialog("Daddy’s sad…", 2000);
		await this.dialogScene.updateDialog("He’s been sad for a while now…", 2000);
		await this.dialogScene.updateDialog("Maybe Mr. Cuddles could help?", 2000);
		this.cameras.main.setAlpha(1);
		this.cameras.main.fadeIn(4000);
	}

	async cutscene_bearPickup() {
		this.registry.set("dragUnlocked", true);
		disableControls(this);
		//await this.cutscene_memoryItem();
		this.cameras.main.fadeOut(500);
		await Pause(1000);
		await this.dialogScene.updateDialog("Mr. Cuddles has given you the strength to push and pull things.", 2000);
		await Pause(1000);
		this.cameras.main.fadeIn(500);
		enableControls(this);

	}

	async cutscene_monster() {
		disableControls(this);
		this.player.sprite.anims.play("TG_girl_idle");
		this.player.sprite.body.enabled = false;

		this.firstFloorWindow.enter();

		await Pause(1000);

		await this.dialogScene.updateDialog("I’m scared. I need to find Daddy!", 2000);

		this.player.sprite.anims.play("TG_girl_run", true);

		let stopPositionX = this.dadsRecliner.x - 200;
		this.tweens.add({
			targets: this.player.sprite,
			x: stopPositionX,
			duration: 5000,
			ease: 'Power2',
			completeDelay: 500,
			onComplete: async () => {
				this.player.sprite.anims.play("TG_girl_idle");
				await this.dialogScene.updateDialog("Daddy, there’s something outside", 2000);
				await this.dialogScene.updateDialog("Daddy...?", 2000);
				await this.dialogScene.updateDialog("Are you okay…?", 2000);
				await Pause(2000);

				this.anims.create({
					key: "koti_tv_uusi",
					frames: this.anims.generateFrameNames("koti_tv_uusi"),
					frameRate: 10,
					repeat: 0
				});

				this.dadsTv.anims.play("koti_tv_uusi").on("animationcomplete", () => {
					let enemy = new ShadowEnemy(this, this.dadsTv.x, this.dadsTv.y - 100);
					this.player.sprite.body.pos.x = stopPositionX - this.player.sprite.width;
					this.player.sprite.body.enabled = true;
					enemy.spawn();
				});
			}
		});
		enableControls(this);
	}

	async cutscene_outside() {
		await this.dialogScene.updateDialog("Mr. Cuddles, we need to find Mommy.", 2000);
		await this.dialogScene.updateDialog("Mommy will know how to help Daddy!", 2000);
	}

	cutscene_memoryItem() {
		return new Promise((resolve, reject) => {
			let { x, y, flipX } = this.player.sprite;

			let timeline = this.tweens.createTimeline();
			let memoryItem_black = this.impact.add.sprite(x, y - 100, "leikki_nalle_musta").setGravity(0).setAlpha(0).setDepth(2);
			let memoryItem_color = this.impact.add.sprite(x, y - 100, "leikki_nalle_vari").setGravity(0).setAlpha(0).setDepth(2);
			memoryItem_black.flipX = !flipX;
			memoryItem_color.flipX = !flipX;


			let fadeOutPlayer = timeline.add({
				targets: this.player.sprite,
				alpha: { from: 1, to: 0 },
				ease: 'Linear',
				duration: 500,
			});

			let fadeInMemory_black = timeline.add({
				targets: memoryItem_black,
				alpha: { from: 0, to: 1 },
				ease: 'Linear',
				duration: 3000,
			});

			let fadeInMemory_color = timeline.add({
				targets: memoryItem_color,
				alpha: { from: 0, to: 1 },
				ease: 'Linear',
				duration: 1500,
				completeDelay: 3000,
			});

			let fadeOutMemory_color = timeline.add({
				targets: memoryItem_color,
				alpha: { from: 1, to: 0 },
				ease: 'Linear',
				duration: 1500,
			});

			let fadeOutMemory_black = timeline.add({
				targets: memoryItem_black,
				alpha: { from: 1, to: 0 },
				ease: 'Linear',
				duration: 1500,
			});

			let fadeInPlayer = timeline.add({
				targets: this.player.sprite,
				alpha: { from: 0, to: 1 },
				ease: 'Linear',
				duration: 1500,
			});

			timeline.play();
			timeline.onComplete = () => resolve(), this;
		})
	}
}