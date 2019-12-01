import { Pause, disableControls, enableControls, enableCameraFollow, disableCameraFollow } from "../utils/utils";

function createAbilityUnlockTimeline(scene, colorlessSpriteKey, colorSpriteKey) {
	let timeline = scene.tweens.createTimeline();
	let { width, height, centerX, centerY } = scene.cameras.main.worldView;
	let backgroundImage = scene.add.image(centerX, centerY, "spotlight").setAlpha(0).setDepth(3).setDisplaySize(width, height);
	let memoryItem_black = scene.add.image(centerX, centerY, colorlessSpriteKey).setAlpha(0).setDepth(4).setDisplaySize(width / 2, height / 2);
	let memoryItem_color = scene.add.image(centerX, centerY, colorSpriteKey).setAlpha(0).setDepth(4).setDisplaySize(width / 2, height / 2);

	memoryItem_black.flipX = !scene.player.sprite.flipX;
	memoryItem_color.flipX = !scene.player.sprite.flipX;

	let fadeInMemory_bg = timeline.add({
		targets: backgroundImage,
		alpha: { from: 0, to: 1 },
		ease: 'Linear',
		duration: 1000,
	});

	let fadeInMemory_black = timeline.add({
		targets: memoryItem_black,
		alpha: { from: 0, to: 1 },
		ease: 'Linear',
		duration: 3000,
	});

	let fadeInMemory_color = timeline.add({
		targets: memoryItem_color,
		alpha: { from: 0, to: 1 },
		ease: 'Linear',
		duration: 1500,
		completeDelay: 3000,
	});

	let fadeOutMemory_color = timeline.add({
		targets: memoryItem_color,
		alpha: { from: 1, to: 0 },
		ease: 'Linear',
		duration: 1500,
	});

	let fadeOutMemory_black = timeline.add({
		targets: memoryItem_black,
		alpha: { from: 1, to: 0 },
		ease: 'Linear',
		duration: 1500,
	});

	let fadeoutMemory_bg = timeline.add({
		targets: backgroundImage,
		alpha: { from: 1, to: 0 },
		ease: 'Linear',
		duration: 1500,
	});

	return timeline;
}


export async function dragUnlock(scene) {
	scene.registry.set("dragUnlocked", true);
	disableCameraFollow(scene);
	disableControls(scene);

	let cutscene = createAbilityUnlockTimeline(scene, "leikki_nalle_musta", "leikki_nalle_vari");
	cutscene.play();
	cutscene.on("complete", async () => {
		await scene.dialogScene.updateDialog("Mr. Cuddles has given you the strength to push and pull things!", 3000);
		await scene.dialogScene.updateDialog("You can now push and pull items by pressing (E).", 3000);
		scene.cameras.main.startFollow(scene.player.sprite, true, 0.1, 0.1);
		enableCameraFollow(scene);
		enableControls(scene);
	});
}

export async function dashSlideUnlock(scene) {
	scene.registry.set("dashUnlocked", true);
	scene.registry.set("slideUnlocked", true);
	disableCameraFollow(scene);
	disableControls(scene);

	let cutscene = createAbilityUnlockTimeline(scene, "leikki_tytto_pallo_musta", "leikki_tytto_pallo_vari");
	cutscene.play();
	cutscene.on("complete", async () => {
		await scene.dialogScene.updateDialog("You have unlocked the joy of leaping and sliding!", 3000);
		await scene.dialogScene.updateDialog("Press twice to wanted direction (A or D) to slide.", 3000);
		await scene.dialogScene.updateDialog("While jumping press twice to wanted direction (A or D) to dash.", 3000);
		enableCameraFollow(scene);
		enableControls(scene);
	});
}

export async function doublejumpUnlock(scene) {
	this.registry.set("doublejumpUnlocked", true);
	disableControls(scene);
	disableCameraFollow(scene);

	let cutscene = createAbilityUnlockTimeline(scene, "leikki_ilmapallo_musta", "leikki_ilmapallo_vari");
	cutscene.play();
	cutscene.on("complete", async () => {
		await scene.dialogScene.updateDialog("You have remembered the magic of walking in the air!", 3000);
		await scene.dialogScene.updateDialog("Press jump (W) in air to double jump.", 3000);
		scene.cameras.main.startFollow(scene.player.sprite, true, 0.1, 0.1);
		enableCameraFollow(scene);
		enableControls(scene);
	});
}

