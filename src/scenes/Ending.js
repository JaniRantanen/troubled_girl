export class Ending extends Phaser.Scene {
	constructor() {
		super({ key: "ending" });
	}

	create() {
		this.musicScene = this.scene.get("music");
		this.musicScene.changeTrack("loppumusiikki_tausta");

		let timeline = this.tweens.createTimeline();

		timeline.add({
			targets: this.add.image(0, 0, "loppu00").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		timeline.add({
			targets: this.add.image(0, 0, "loppu01").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		timeline.add({
			targets: this.add.image(0, 0, "loppu02").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		timeline.add({
			targets: this.add.image(0, 0, "loppu03a").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		timeline.add({
			targets: this.add.image(0, 0, "loppu03b").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		timeline.add({
			targets: this.add.image(0, 0, "loppu04").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		timeline.add({
			targets: this.add.image(0, 0, "loppu05").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		timeline.add({
			targets: this.add.image(0, 0, "loppu06").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000,
		});

		let angelFlash = this.add.image(0, 0, "loppu06valahdys").setOrigin(0, 0).setAlpha(0);
		timeline.add({
			targets: angelFlash,
			alpha: { from: 0, to: 1 },
			duration: 50,
			onStart: () => this.cameras.main.flash(100),
		});
		timeline.add({
			targets: angelFlash,
			alpha: { from: 1, to: 0 },
			duration: 50,
			completeDelay: 2000,
		});

		timeline.play()

		timeline.on("complete", () => {
			this.cameras.main.fadeOut(2000).on("camerafadeoutcomplete", () => {
				this.musicScene.backgroundMusic.stop();
				this.scene.transition({
					target: "mainmenu",
					remove: true
				});
			});
		})
	}
}
