export class _DEBUG extends Phaser.Scene {

	constructor() {
		super({ key: '_DEBUG', active: true });
	}

	create() {
		this.fps = this.add.text(0, 0, '', { font: '12px Arial', fill: '#fff' });
		this.debugTextLeft = this.add.text(0, 50, '', { font: '12px Arial', fill: '#fff' });
		this.debugTextCenter = this.add.text(700, 0, '', { font: '12px Arial', fill: '#fff' });
		this.debugTextBottomCenter = this.add.text(700, 650, '', { font: '12px Arial', fill: '#fff' });
		this.debugTextRight = this.add.text(1300, 0, '', { font: '12px Arial', fill: '#fff' });

		let sceneBeingDebugged = this.scene.get('playground');

		sceneBeingDebugged.events.on('update', function () {
			this.fps.setText(`FPS: ${sceneBeingDebugged.sys.game.loop.actualFps}`);
			this.debugTextLeft.setText(JSON.stringify(sceneBeingDebugged.player.sprite.body, null, 4));
			this.debugTextRight.setText(JSON.stringify(sceneBeingDebugged.player.sprite, null, 4));
			this.debugTextCenter.setText(JSON.stringify(sceneBeingDebugged.player.state, null, 4));
		}, this);

		sceneBeingDebugged.events.on('debug', function (dataObject) {
			this.debugTextBottomCenter.setText(JSON.stringify(dataObject, null, 4));
		}, this);

		let skillUnlock = this.input.keyboard.createCombo("GIRL", { resetOnMatch: true, maxKeyDelay: 1000 });
		this.input.keyboard.on('keycombomatch', function (keyCombo, keyboardEvent) {
			this.scene.get("dialog").updateDialog("CHEAT MODE ACTIVATED - ALL ABILITIES UNLOCKED", 2000);
			this.registry.set("dragUnlocked", true);
			this.registry.set("dashUnlocked", true);
			this.registry.set("slideUnlocked", true);
			this.registry.set("doublejumpUnlocked", true);
		}, this);
	}
}