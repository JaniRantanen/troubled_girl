import { TextElement } from "../UI";

export class Ending extends Phaser.Scene {
	constructor() {
		super({ key: "ending" });
	}

	create() {
		this.musicScene = this.scene.get("music");
		this.musicScene.changeTrack("loppumusiikki_tausta");

		let endingTimeline = this.tweens.createTimeline();

		endingTimeline.add({
			targets: this.add.image(0, 0, "loppu00").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		endingTimeline.add({
			targets: this.add.image(0, 0, "loppu01").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		endingTimeline.add({
			targets: this.add.image(0, 0, "loppu02").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		endingTimeline.add({
			targets: this.add.image(0, 0, "loppu03a").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		endingTimeline.add({
			targets: this.add.image(0, 0, "loppu03b").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		endingTimeline.add({
			targets: this.add.image(0, 0, "loppu04").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		endingTimeline.add({
			targets: this.add.image(0, 0, "loppu05").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000
		});

		endingTimeline.add({
			targets: this.add.image(0, 0, "loppu06").setOrigin(0, 0).setAlpha(0),
			alpha: { from: 0, to: 1 },
			duration: 3000,
		});

		let angelFlash = this.add.image(0, 0, "loppu06valahdys").setOrigin(0, 0).setAlpha(0);
		endingTimeline.add({
			targets: angelFlash,
			alpha: { from: 0, to: 1 },
			duration: 50,
			onStart: () => this.cameras.main.flash(100),
		});
		endingTimeline.add({
			targets: angelFlash,
			alpha: { from: 1, to: 0 },
			duration: 50,
			completeDelay: 2000,
		});

		endingTimeline.play()

		endingTimeline.on("complete", () => {
			this.cameras.main.fadeOut(2000).on("camerafadeoutcomplete", () => {

				let endingImages = endingTimeline.data.reduce((acc, cur) => acc.concat(cur.targets), []);
				endingImages.forEach((image) => image.destroy());

				this.cameras.main.fadeIn(2000).on("camerafadeincomplete", () => {

					let creditsTimeline = this.createCreditsTimeline();
					creditsTimeline.play();

					creditsTimeline.on("complete", () => {
						this.musicScene.backgroundMusic.stop();
						this.scene.transition({
							target: "mainmenu",
							remove: true
						});
					});
				})
			})
		});
	};

	createCreditsTimeline() {
		let creditsTimeline = this.tweens.createTimeline();
		let credits_1 = this.add.existing(this.creditContainer("Jani Rantanen", "Programming")).setAlpha(0);
		let credits_2 = this.add.existing(this.creditContainer("Tiia Vuojolainen", "Artwork\nCharacter design")).setAlpha(0);
		let credits_3 = this.add.existing(this.creditContainer("Harri Honkonen", "Animation\nLevel Design")).setAlpha(0);
		let credits_4 = this.add.existing(this.creditContainer("Jere Salenius", "Music\nSound effects")).setAlpha(0);

		creditsTimeline.add({
			targets: [credits_1, credits_2, credits_3, credits_4],
			alpha: { from: 0, to: 1 },
			duration: 2000,
			yoyo: true,
			hold: 2000,
			delay: this.tweens.stagger(6000),
			completeDelay: 2000,
		});

		return creditsTimeline;
	};

	creditContainer(name, title) {
		let container = new Phaser.GameObjects.Container(this, this.cameras.main.centerX, this.cameras.main.centerY);
		let nameText = new TextElement(this, 0, -50, name, { fontSize: 100, fontFamily: "Bookman", align: "center", fill: "#fff" });
		let titleText = new TextElement(this, 0, 100, title, { fontSize: 55, fontFamily: "Bookman", align: "center", fill: "#fff" });

		container.add([nameText, titleText]);
		return container;
	};
}
