import { Player } from "../characters/Player";
import { setupLevel, setupScene } from "../utils/utils";
import { Trigger } from "../items/Trigger";
export class Graveyard extends Phaser.Scene {
	constructor() {
		super({ key: "graveyard" });
	}
	async create() {
		this.level = setupLevel(this, "graveyard");
		setupScene(this, this.level, "tausta_hautausmaa", { x: 300, y: 1600 });

		this.mom = this.impact.add.sprite(6250, 1500, "aiti_enkeli_idle5fps", 0);
		let grave = this.impact.add.sprite(6500, 1500, "item_hauta")
		// tyttö pysähtyy 5900
		this.player = new Player(this, 5900, 1600);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
		//await this.graveyardCutscene();

		this.dad = this.impact.add.sprite(5200, 1500, "varjoisa_walk", 0);
		//walk, sitten idle pyörii

		this.impact.add.sprite(5400, 1500, "varjo_chase", 0);
		this.impact.add.sprite(5700, 1500, "varjo_chase", 0);
		//spawn animaatioon pieni offset, että ei ole identtinen



		let exitTrigger = new Trigger(this, this.level.widthInPixels - 300, 0, 300, this.level.heightInPixels, () => {
			this.scene.transition({
				target: "darkness",
				remove: true,
				duration: 1000
			});
		});

	}
	graveyardCutscene() {
		return new Promise((resolve, reject) => {
			let timeline = this.tweens.createTimeline();

			let moveToMom = timeline.add({
				targets: this.player.sprite,
				x: this.mom.x - 200,
				duration: 5000,
				ease: 'Power2',
				completeDelay: 500,
				onComplete: async () => { }
			});


			timeline.play();
			timeline.onComplete = () => resolve(), this;
		});

	}
}
