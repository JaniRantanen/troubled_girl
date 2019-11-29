import { Player } from "../characters/Player";
import { setupLevel } from "../utils/utils";

export class Graveyard extends Phaser.Scene {
	constructor() {
		super({ key: "graveyard" });
		this.player = null;
		this.ui = null;
	}
	preload() {
		this.ui = this.scene.get("dialog");
	}

	async create() {
		this.cameras.main.setBackgroundColor(0xb9b9b9);
		//alussa gameplaytä, pelaajalta otetaan kontrolli -> Cutscene

		let level = setupLevel(this, "graveyard");

		for (let i = 0; i < level.widthInPixels; i = i + 1600) {
			this.add.image(i, -100, "tausta_hautausmaa").setOrigin(0, 0).setDepth(-10);
		}
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
