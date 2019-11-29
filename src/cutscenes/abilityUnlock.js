import { Pause, disableControls, enableControls } from "../utils/utils";

function createAbilityUnlockTimeline(scene, colorlessSpriteKey, colorSpriteKey) {
	let timeline = scene.tweens.createTimeline();
	let { width, height } = scene.sys.canvas;
	let screenCenter = scene.cameras.main.getWorldPoint(width / 2, height / 2);

	let backgroundImage = scene.add.image(screenCenter.x, screenCenter.y, "spotlight").setDepth(3).setAlpha(0);
	let memoryItem_black = scene.impact.add.sprite(screenCenter.x, screenCenter.y, colorlessSpriteKey).setGravity(0).setAlpha(0).setDepth(4);
	let memoryItem_color = scene.impact.add.sprite(screenCenter.x, screenCenter.y, colorSpriteKey).setGravity(0).setAlpha(0).setDepth(4);

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
	let cutscene = createAbilityUnlockTimeline(scene, "leikki_nalle_musta", "leikki_nalle_vari");
	disableControls(scene);
	cutscene.play();
	cutscene.on("complete", async () => {
		await scene.dialogScene.updateDialog("Mr. Cuddles has given you the strength to push and pull things.", 3000);
		await scene.dialogScene.updateDialog(`You can now push and pull items by pressing (E)`, 3000);
		enableControls(scene);
	});
}

export async function dashSlideUnlock(scene) {
	scene.registry.set("dashUnlocked", true);
	scene.registry.set("slideUnlocked", true);

	let cutscene = createAbilityUnlockTimeline(scene, "leikki_tytto_pallo_musta", "leikki_tytto_pallo_vari");
	disableControls(scene);
	cutscene.play();
	cutscene.on("complete", async () => {
		await scene.dialogScene.updateDialog("You have unlocked the joy of leaping and sliding", 3000);
		await scene.dialogScene.updateDialog("Push twice to wanted direction (A or D) to slide", 3000);
		await scene.dialogScene.updateDialog("While jumping push twice to wanted direction (A or D)  to dash", 3000);
		enableControls(scene);
	});
}

export async function doublejumpUnlock(scene) {
	this.registry.set("doublejumpUnlocked", true);
	let cutscene = createAbilityUnlockTimeline(scene, "leikki_ilmapallo_musta", "leikki_ilmapallo_vari");
	disableControls(scene);
	cutscene.play();
	cutscene.on("complete", async () => {
		await scene.dialogScene.updateDialog("You have remembered the magic of walking in the air", 3000);
		await scene.dialogScene.updateDialog("Push jump (W) in air to double jump", 3000);
		enableControls(scene);
	});
}

