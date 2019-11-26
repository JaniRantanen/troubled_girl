
import { scenes } from "./scenes";

var game = new Phaser.Game({
    width: 1600,
    height: 900,
    type: Phaser.AUTO,
    scene: scenes,
    physics: {
        default: "impact",
        impact: {
            gravity: 100,
            debug: process.env.NODE_ENV === "development"
        }
    },

    backgroundColor: "#000000",
});