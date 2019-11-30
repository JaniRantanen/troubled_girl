import { Player } from "../characters/Player";
import { setupLevel, setupScene, disableControls } from "../utils/utils";
import { Trigger } from "../items/Trigger";

export class Darkness extends Phaser.Scene {
	constructor() {
		super({ key: "darkness" });
	}
	async create() {
		this.level = setupLevel(this, "pimeys");
		setupScene(this, this.level, "pimeystausta", { x: 300, y: 3400 });

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
