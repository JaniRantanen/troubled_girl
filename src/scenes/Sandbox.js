

import { Player } from "../characters/Player";
import { setupLevel, Pause } from "../utils/utils";
import { SimpleEnemy } from "../characters/SimpleEnemy";
import { ShadowEnemy } from "../characters/ShadowEnemy";
import { DraggableItem } from "../items/DraggableItem";
import { Toy } from "../items/Toy";
import { Checkpoint } from "../items/Checkpoint";

export class Sandbox extends Phaser.Scene {
    constructor() {
        super({ key: "sandbox" });
        this.player = null;
        this.dialogScene = null;
        this.musicScene = null;
    }

    preload() {
        this.dialogScene = this.scene.get("dialog");
        this.musicScene = this.scene.get("music");
        this.musicScene.backgroundMusic = this.sound.add("metsamusiikki", { loop: true, volume: 0.2 });
    }

    async create() {
        this.cameras.main.setBackgroundColor(0xb9b9b9);
        let floor_1_y = 1300;
        this.player = new Player(this, 6500, floor_1_y);
        let level = setupLevel(this, "sandbox");
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

        let bear = new Toy(this, 350, floor_1_y, "item_nalle", this.bearPickup.bind(this));
        let box = new DraggableItem(this, 600, floor_1_y, "koti_laatikko");
        let box2 = new DraggableItem(this, 1000, floor_1_y, "koti_laatikko");

        let balloon = new Toy(this, 3000, floor_1_y, "item_ilmapallo", this.balloonPickup.bind(this));

        let ball = new Toy(this, 5000, floor_1_y, "item_pallo", this.ballPickup.bind(this));

        let checkpoint = new Checkpoint(this, 6500, floor_1_y)
        let basicEnemy = new SimpleEnemy(this, 7400, floor_1_y);
        let basicEnemy_2 = new SimpleEnemy(this, 7700, floor_1_y);

        let chaser = new ShadowEnemy(this, 9000, floor_1_y);
    }

    update() {
        this.musicScene.handleMusicUpdate(this);
    }

    async bearPickup() {
        this.registry.set("dragUnlocked", true);

        this.startCutscene();
        await Pause(1000);
        await this.dialogScene.updateDialog("Mr. Cuddles has given you the strength to push and pull things.", 2000);
        await Pause(1000);
        this.endCutscene();
    }

    async ballPickup() {
        this.registry.set("dashUnlocked", true);
        this.registry.set("slideUnlocked", true);

        this.startCutscene();
        await Pause(1000);
        await this.dialogScene.updateDialog("You have unlocked the joy of leaping and sliding", 2000);
        await Pause(1000);
        this.endCutscene();
    }

    async balloonPickup() {
        this.registry.set("doublejumpUnlocked", true);

        this.startCutscene()
        await Pause(1000);
        await this.dialogScene.updateDialog("You have remembered the magic of walking in the air", 2000);
        await Pause(1000);
        this.endCutscene();
    }

    startCutscene() {
        this.input.keyboard.enabled = false;
        this.input.keyboard.resetKeys();
        this.cameras.main.fadeOut(500);
    }

    endCutscene() {
        this.input.keyboard.enabled = true;
        this.cameras.main.fadeIn(500);
    }

}