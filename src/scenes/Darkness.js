import { Player } from "../characters/Player";
import { setupLevel, setupScene, disableControls } from "../utils/utils";
import { Trigger } from "../items/Trigger";
import { ShadowEnemy } from "../characters/ShadowEnemy";
import { Checkpoint } from "../items/Checkpoint";

export class Darkness extends Phaser.Scene {
	constructor() {
		super({ key: "darkness" });
	}
	async create() {
		this.level = setupLevel(this, "pimeys");
		setupScene(this, this.level, "pimeystausta", { x: 180, y: 3200 });
		this.cameras.main.setZoom(0.7);

		
		new Checkpoint(this, 3700, 400);
		new ShadowEnemy(this, 750, 3200);
		new ShadowEnemy(this, 1000, 3200);
		new ShadowEnemy(this, 1900, 2900);
		new ShadowEnemy(this, 2300, 2900);
		new Checkpoint(this, 3000, 2400);
		new ShadowEnemy(this, 2750, 1900);
		new ShadowEnemy(this, 3225, 1900);
		new ShadowEnemy(this, 3900, 1800);
		new ShadowEnemy(this, 4300, 1800);
		new Checkpoint(this, 5100, 1600);
		new Checkpoint(this, 3700, 400);
		new ShadowEnemy(this, 4800, 600);
		new ShadowEnemy(this, 5200, 600);
		new ShadowEnemy(this, 5500, 600);


		let cutsceneTrigger = new Trigger(this, 6800, 0, 1000, 900, () => this.events.once("touchedGround", this.cutscene.bind(this)));
	}

	cutscene() {
		disableControls(this);
		this.player.sprite.body.enabled = false;

		this.player.sprite.anims.play("TG_girl_twistangle8fps", true)
			.on("animationcomplete", () => {
				this.player.sprite.anims.play("TG_girl_cryonground2fps", true)
			})
			.on("animationcomplete", () => {
				setTimeout(() => {
					let fade = this.cameras.main.fadeOut(500)
						.once("camerafadeoutcomplete", () => {
							// this.scene.transition({
							// 	target: "isaskenennimi",
							// 	remove: true,
							// });
						})
				}, 3000);
			});
	}
}
