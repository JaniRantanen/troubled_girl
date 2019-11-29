import { Toy } from "../items/Toy";
import { DraggableItem } from "../items/DraggableItem";
import { Crawlspace } from "../items/Crawlspace";
import { Hideout } from "../items/Hideout";
import { Pause, setupLevel, disableControls, enableControls, setupScene } from "../utils/utils";
import { MonsterWindow } from "../items/MonsterWindow";
import { ShadowEnemy } from "../characters/ShadowEnemy";
import { SimpleEnemy } from "../characters/SimpleEnemy";
import { dragUnlock } from "../cutscenes/abilityUnlock";
import { Trigger } from "../items/Trigger";
import { Checkpoint } from "../items/Checkpoint";
export class Home extends Phaser.Scene {
	constructor() {
		super({ key: "home" });
	}
	async create() {

		let floor_1_Y = 1600;
		let floor_2_Y = 1000;
		let floor_3_Y = 500;

		this.level = setupLevel(this, "home");
		setupScene(this, this.level, "tausta_koti", { x: 1400, y: floor_1_Y });

		// Girls room
		let bear = new Toy(this, 150, floor_1_Y, "item_nalle", dragUnlock.bind(this, this));
		//let bed = new Crawlspace(this, 500, floor_1_Y, "koti_sanky");
		let box = new DraggableItem(this, 800, floor_1_Y, "koti_laatikko");
		let chair = new DraggableItem(this, 1300, floor_1_Y, "koti_tuoli_sivu");

		// Living room
		this.livingroomWindow = new MonsterWindow(this, 1700, floor_1_Y - 150, "koti_ikkuna_reveal");
		let windowBounds = this.livingroomWindow.sprite.getBounds();
		this.windowTrigger = new Trigger(this, windowBounds.x, windowBounds.y, windowBounds.width, windowBounds.height, this.cutscene_monster.bind(this));
		this.dadsRecliner = this.add.image(3300, floor_1_Y, "koti_nojatuoli_isalla");
		this.dadsTv = this.add.sprite(3600, floor_1_Y, "koti_tv_uusi", 0);

		//Second floor
		let myFirstCheckpoint = new Checkpoint(this, 1800, floor_2_Y - 250, 100, 450);
		let kitchenTable = this.add.image(800, floor_2_Y, "koti_poytaliinalla").setDepth(-1);
		let stool = new DraggableItem(this, 500, floor_2_Y, "koti_jakkara");
		let window = this.add.image(3000, floor_2_Y - 100, "koti_ikkuna_reveal").setDepth(-1);
		let clock = this.add.image(3400, floor_2_Y - 200, "koti_kello").setDisplaySize(100, 100);
		let lamp = new DraggableItem(this, 3600, floor_2_Y, "koti_lamppu");

		//Third floor
		let stackedBoxes = [
			new DraggableItem(this, 2500, floor_3_Y, "koti_laatikko"),
			new DraggableItem(this, 2500, floor_3_Y - 100, "koti_laatikko"),
			new DraggableItem(this, 2500, floor_3_Y - 200, "koti_laatikko"),
		]

		//Outside
		let dialogTrigger = new Trigger(this, 3900, 800, 1200, 300, async () => {
			await this.dialogScene.updateDialog("Mr. Cuddles, we need to find Mommy.", 2000);
			await this.dialogScene.updateDialog("Mommy will know how to help Daddy!", 2000);
		});
		let secondCheckpoint = new Checkpoint(this, 3900, 800, 1200, 300);
		let garageEnemy = new SimpleEnemy(this, 5000, floor_1_Y);
		let draggableNearFence = new DraggableItem(this, 7050, floor_1_Y, "leikkikentta_roskis");

		//Between fences
		let bushes = [
			new Hideout(this, 7400, floor_1_Y, "metsa_pensas"),
			new Hideout(this, 8000, floor_1_Y, "metsa_pensas"),
			new Hideout(this, 8600, floor_1_Y, "metsa_pensas")
		];

		let hideMechanicEnemy = new SimpleEnemy(this, 8000, floor_1_Y);

		let exitTrigger = new Trigger(this, 9825, 1000, 150, 1000, () => {
			this.scene.transition({
				target: "playground",
				remove: true,
				duration: 1000
			});
		});


		this.cutscene_intro();
	}


	async cutscene_intro() {
		disableControls(this);
		this.cameras.main.setAlpha(0);
		await this.dialogScene.updateDialog("Daddy’s sad…", 2000);
		await this.dialogScene.updateDialog("He’s been sad for a while now…", 2000);
		await this.dialogScene.updateDialog("Maybe Mr. Cuddles could help?", 2000);
		this.cameras.main.setAlpha(1);
		this.cameras.main.fadeIn(4000);
		enableControls(this);
	}
	async cutscene_monster() {
		disableControls(this);

		await this.livingroomWindow.enter();

		this.player.sprite.anims.play("TG_girl_idle");
		this.player.sprite.body.enabled = false;

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

				this.dadsTv.anims.play("koti_tv_uusi")
					.on("animationcomplete", () => {
						let enemy = new ShadowEnemy(this, this.dadsTv.x, this.dadsTv.y - 100);
						this.player.sprite.body.pos.x = stopPositionX - (this.player.sprite.width / 2);
						this.player.sprite.body.enabled = true;
						enemy.spawn();
						enableControls(this);
					});
			}
		});

	}
}