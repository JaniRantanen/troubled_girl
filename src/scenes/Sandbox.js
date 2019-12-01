

import { Player } from "../characters/Player";
import { setupLevel, Pause, setupScene } from "../utils/utils";
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

    }

    async create() {
        this.level = setupLevel(this, "sandbox");
        setupScene(this, this.level, "tausta_metsa", { x: 500, y: 1200 });

        this.cameras.main.setZoom(0.5)

        new Toy(this, 1300, 1200, "item_pallo", dashSlideUnlock.bind(this, this));
    }

    update() {

    }
}