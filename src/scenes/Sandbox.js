

import { Player } from "../characters/Player";
import { setupLevel, Pause, createBackground } from "../utils/utils";
import { SimpleEnemy } from "../characters/SimpleEnemy";
import { ShadowEnemy } from "../characters/ShadowEnemy";
import { DraggableItem } from "../items/DraggableItem";
import { Toy } from "../items/Toy";
import { Checkpoint } from "../items/Checkpoint";
import { dragUnlock, dashSlideUnlock, doublejumpUnlock } from "../cutscenes/abilityUnlock";
import { Trigger } from "../items/Trigger";

export class Sandbox extends Phaser.Scene {
    constructor() {
        super({ key: "sandbox" });
    }
    preload() {
        this.dialogScene = this.scene.get("dialog");
        this.musicScene = this.scene.get("music");
        this.musicScene.changeTrack("hautausmaamusiikki_tausta");
    }
    create() {
        this.level = setupLevel(this, "sandbox");
        this.player = new Player(this, 500, 100)
        createBackground(this.level, "tausta_metsa")
        this.cameras.main.setZoom(0.5);

    }

    update() {


    }
}