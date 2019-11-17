export class _DEBUG extends Phaser.Scene {

	constructor() {
		super({ key: '_DEBUG', active: false });
	}

	create() {
		this.fps = this.add.text(0, 0, '', { font: '12px Arial', fill: '#000000' });
		this.debugTextLeft = this.add.text(0, 50, '', { font: '12px Arial', fill: '#000000' });
		this.debugTextCenter = this.add.text(700, 0, '', { font: '12px Arial', fill: '#000000' });
		this.debugTextRight = this.add.text(1300, 0, '', { font: '12px Arial', fill: '#000000' });
		let sceneBeingDebugged = this.scene.get('sandbox');

		sceneBeingDebugged.events.on('update', function () {
			this.fps.setText(`FPS: ${sceneBeingDebugged.sys.game.loop.actualFps}`);
			this.debugTextLeft.setText(JSON.stringify(sceneBeingDebugged.player.sprite.body, null, 4));
			this.debugTextRight.setText(JSON.stringify(sceneBeingDebugged.player.sprite, null, 4));

		}, this);

		sceneBeingDebugged.events.on('debug', function (dataObject) {
			this.debugTextCenter.setText(JSON.stringify(dataObject, null, 4));
		}, this)
	}
}