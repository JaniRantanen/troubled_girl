
import { Boot, MainMenu, Sandbox, Win } from "./scenes";

var game = new Phaser.Game({
    width: 1600,
    height: 900,
    type: Phaser.AUTO,
    scene: [Boot, MainMenu, Sandbox, Win],
    physics: {
        default: 'impact',
        impact: {
            gravity: 100,
            debug: process.env.NODE_ENV === "development"
        }
    },

    backgroundColor: "#b9b9b9",
});