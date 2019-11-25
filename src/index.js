
import { Boot, MainMenu, Win, Home } from "./scenes";
import { Sandbox } from "./scenes";
import { Dialog } from "./scenes/utility/Dialog";
import { _DEBUG } from "./scenes/utility/_DEBUG";

var game = new Phaser.Game({
    width: 1600,
    height: 900,
    type: Phaser.AUTO,
    scene: [Boot, MainMenu, Home, Win, Sandbox, _DEBUG, Dialog],
    physics: {
        default: "impact",
        impact: {
            gravity: 100,
            debug: process.env.NODE_ENV === "development"
        }
    },

    backgroundColor: "#b9b9b9",
});