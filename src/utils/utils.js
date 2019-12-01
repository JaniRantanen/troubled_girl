import { Player } from "../characters/Player";

export const Pause = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export function setupLevel(scene, levelKey) {
	var levelMap = scene.make.tilemap({ key: levelKey });

	levelMap.tilesets.forEach((tileset) => {
		let tilesetkey = tileset.name.split("/").pop().split(".").shift(); // Grabs the filename without the extension
		let tilesetImage = levelMap.addTilesetImage(tileset.name, tilesetkey, 100, 100, 1, 2);
		if (tilesetkey.search("foreground") !== -1 || tilesetkey.search("tumma") !== -1) {
			levelMap.createDynamicLayer("foreground", tilesetImage, 0, 0).setDepth(2);
		}
		if (tilesetkey.search("background") !== -1) {
			levelMap.createDynamicLayer("background", tilesetImage, 0, 0).setDepth(-2);
		}
	});

	scene.impact.world.setCollisionMap(levelKey);
	scene.impact.world.setBounds(0, 0, levelMap.widthInPixels, levelMap.heightInPixels);
	scene.cameras.main.setBounds(0, 0, levelMap.widthInPixels, levelMap.heightInPixels);

	return levelMap;
}

export function createBackground(scene, level, backgroundKey) {
	for (let i = 0; i < level.widthInPixels; i = i + 1600) {
		scene.add.image(i, -100, backgroundKey).setOrigin(0, 0).setDepth(-10);
	}
}

export function disableControls(scene) {
	scene.input.keyboard.enabled = false;
	scene.input.keyboard.resetKeys();
}

export function enableControls(scene) {
	scene.input.keyboard.enabled = true;
}

export function enableCameraFollow(scene, targetSprite = null) {
	if (targetSprite === null) {
		targetSprite = scene.player.sprite;
	}
	scene.cameras.main.startFollow(targetSprite, true, 0.1, 0.1);
}
export function disableCameraFollow(scene) {
	scene.cameras.main.stopFollow();
}




export function nothingIsPressed(controlsObject) {
	for (let [key, value] of Object.entries(controlsObject)) {
		if (value.isDown) {
			return false;
		}
	}
	return true;
}

export function getImpactBodyBounds(impactBody) {
	return new Phaser.Geom.Rectangle(impactBody.pos.x, impactBody.pos.y, impactBody.size.x, impactBody.size.y);
}
