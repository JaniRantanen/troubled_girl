import { Player } from "../characters/Player";
import { setupLevel, setupScene } from "../utils/utils";
import { Trigger } from "../items/Trigger";

export class Darkness extends Phaser.Scene {
	constructor() {
		super({ key: "darkness" });
	}
	async create() {
		this.level = setupLevel(this, "pimeys");
		setupScene(this, this.level, "pimeystausta", { x: 200, y: 1600 });
		this.cameras.main.setBackgroundColor(0x000);

		this.cameras.main.setZoom(0.2);


		let exitTrigger = new Trigger(this, this.level.widthInPixels - 300, 0, 300, this.level.heightInPixels, () => {

			//Tähän animaatioita, tweenauksia yms. (kts käsis)

			this.scene.transition({
				target: "isaskenennimi",
				remove: true,
				duration: 1000
			});
		});
	}
}
