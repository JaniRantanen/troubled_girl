import { Player } from "../characters/Player";

export const Pause = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export function setupLevel(scene, levelKey) {
	var levelMap = scene.make.tilemap({ key: levelKey });

	levelMap.tilesets.forEach((tileset) => {
		let tilesetkey = tileset.name.split("/").pop().split(".").shift(); // Grabs the filename without the extension
		let tilesetImage = levelMap.addTilesetImage(tileset.name, tilesetkey, 100, 100, 1, 2);
		if (tilesetkey.search("foreground") !== -1) {
			levelMap.createStaticLayer("foreground", tilesetImage, 0, 0).setDepth(2);
		}
		if (tilesetkey.search("background") !== -1) {
			levelMap.createStaticLayer("background", tilesetImage, 0, 0).setDepth(-2);
		}
	});

	scene.impact.world.setCollisionMap(levelKey);
	scene.impact.world.setBounds(0, 0, levelMap.widthInPixels, levelMap.heightInPixels);
	scene.cameras.main.setBounds(0, 0, levelMap.widthInPixels, levelMap.heightInPixels);

	return levelMap;
}

export function setupScene(scene, level, backgroundKey, startPosition) {
	scene.dialogScene = scene.scene.get("dialog");
	scene.musicScene = scene.scene.get("music");

	for (let i = 0; i < level.widthInPixels; i = i + 1600) {
		scene.add.image(i, -100, backgroundKey).setOrigin(0, 0).setDepth(-10);
	}

	scene.player = new Player(scene, startPosition.x, startPosition.y);
	scene.cameras.main.startFollow(scene.player.sprite, true, 0.1, 0.1);
}

export function disableControls(scene) {
	scene.input.keyboard.enabled = false;
	scene.input.keyboard.resetKeys();
}

export function enableControls(scene) {
	scene.input.keyboard.enabled = true;
}


export function nothingIsPressed(controlsObject) {
	for (let [key, value] of Object.entries(controlsObject)) {
		if (value.isDown) {
			return false;
		}
	}
	return true;
}

