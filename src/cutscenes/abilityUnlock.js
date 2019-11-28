import { Pause, disableControls, enableControls } from "../utils/utils";

async function abilityUnlock(scene, dialogText) {
	disableControls(scene);
	scene.cameras.main.fadeOut(500);
	await Pause(1000);
	await scene.dialogScene.updateDialog(dialogText, 2000);
	await Pause(1000);
	scene.cameras.main.fadeIn(500);
	enableControls(scene);
}


export var dashSlideUnlock = function (scene) {
	scene.registry.set("dashUnlocked", true);
	scene.registry.set("slideUnlocked", true);
	return abilityUnlock(scene, "You have unlocked the joy of leaping and sliding");
}

export var dragUnlock = function (scene) {
	scene.registry.set("dragUnlocked", true);
	return abilityUnlock(scene, "Mr. Cuddles has given you the strength to push and pull things.");
}
export var doublejumpUnlock = function (scene) {
	this.registry.set("doublejumpUnlocked", true);
	return abilityUnlock(scene, "You have remembered the magic of walking in the air");
}