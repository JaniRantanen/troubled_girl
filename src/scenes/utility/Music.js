export class Music extends Phaser.Scene {

	constructor() {
		super({ key: 'music' });
		this.backgroundMusic = null;
		this.chaseMusic = null;

	}

	preload() {
		this.chaseMusic = this.sound.add("jahtausmusiikki_tausta", { loop: true });
		this.backgroundMusic = this.sound.add("metsamusiikki_tausta", { loop: true });
	}

	update() {
		let activeScenes = this.game.scene.getScenes();
		activeScenes.forEach((activeScene) => {
			let enemiesInScene = this.getEnemiesInScene(activeScene)
			if (enemiesInScene.length > 0) {
				this.handleMusicState(enemiesInScene);
			}
		});
	}

	getEnemiesInScene(scene) {
		return scene.children.getChildren().filter((gameobject) => gameobject.getData("enemy"));
	}

	handleMusicState(enemyList) {
		if (enemyList.some((val) => val.getData("isAgressive"))) {
			this.backgroundMusic.stop();
			this.playIfNotAlreadyPlaying(this.chaseMusic)

		} else {
			this.chaseMusic.stop();
			this.playIfNotAlreadyPlaying(this.backgroundMusic)
		}

	}

	playIfNotAlreadyPlaying(track) {
		if (track) {
			if (!track.isPlaying) {
				track.play();
			}
		}
	}

	changeTrack(trackKey) {
		this.backgroundMusic = this.sound.add(trackKey, { loop: true });
		this.backgroundMusic.play();
	}

	stopAll(scene) {
		this.sound.stopAll();
		scene.sound.stopAll();
	}
}