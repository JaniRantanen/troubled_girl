export const Pause = (ms) => new Promise(resolve => setTimeout(resolve, ms))


export function setupLevel(scene, levelKey) {
	var levelMap = scene.make.tilemap({ key: levelKey });

	levelMap.tilesets.forEach((tileset) => {
		let tilesetkey = tileset.name.split("/").pop().split(".").shift(); //Grabs the filename without the extension
		let tilesetImage = levelMap.addTilesetImage(tileset.name, tilesetkey);

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
}