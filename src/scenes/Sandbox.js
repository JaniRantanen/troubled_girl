

import { Player } from "../characters/Player";
import { setupLevel } from "../utils/utils";
import { SimpleEnemy } from "../characters/SimpleEnemy";
import { DraggableItem } from "../items/DraggableItem";

export class Sandbox extends Phaser.Scene {
    constructor() {
        super({ key: "sandbox" });
        this.player = null;
        this.sounds = null;
    }
    create() {
        this.cameras.main.setBackgroundColor(0xb9b9b9);
        this.player = new Player(this, 200, 1600);
        this.registry.set("dragUnlocked", true);
        let level = setupLevel(this, "sandbox");
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
        this.cameras.main.setZoom(0.5);

        let enemy_1 = new SimpleEnemy(this, 1400, 1600);
        let box = new DraggableItem(this, 1200, 500);


    }

    update() {

    }


}