export class Music extends Phaser.Scene {

	constructor() {
		super({ key: 'music', active: true });
		this.backgroundMusic = null;
		this.chaseMusic = null;
	}

	handleMusicUpdate(scene) {
		if (this.chaseMusic === null) {
			this.chaseMusic = this.sound.add("jahtausmusiikki", { loop: true });
		}

		let enemies = scene.children.getChildren().filter((gameobject) => gameobject.getData("enemy"));

		if (enemies.length > 0) {
			let anyoneIsAggressive = enemies.some((val) => val.getData("isAgressive"));
			if (anyoneIsAggressive) {
				this.backgroundMusic.stop();
				if (!this.chaseMusic.isPlaying) {
					this.chaseMusic.play();
				}
			} else {
				if (!this.backgroundMusic.isPlaying) {
					this.backgroundMusic.play();
				}
				this.chaseMusic.stop();
			}
		}
	}
}