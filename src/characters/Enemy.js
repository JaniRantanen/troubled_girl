export class Enemy extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		console.log(arguments)
		scene.add.existing(this);
		// this.enemy.setTypeB();
		// this.enemy.setGravity(10);
		// this.enemy.setMaxVelocity(500)
		// this.enemy.setFriction(1000, 100)
		// this.enemy.setBodySize(300, 350);
		// this.enemy.setOffset(50, 50);
	}

	create() {
		console.log("CREATE")
	}
}