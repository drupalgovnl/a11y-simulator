import {MessageAction} from "./types";
import {orangeColour, toggleOverlay, createMacularDegenerationEffect, createVisualImpairmentEffect, editIntensity} from "./functions/overlay";

chrome.runtime.onMessage.addListener((object, sender, response) => {
    const { action, value } = object as { action: MessageAction; value: string };
    console.log('listening, to ', action, value);

    switch(action) {
        case "blackOverlay":
            toggleOverlay();
            break;
        case "orangeColour":
            orangeColour();
            break;
        case "toggle-button-maculadeformation":
            createMacularDegenerationEffect();
        break;
        case "toggle-button-visually-impaired":
            //  add slider info...-> 
            createVisualImpairmentEffect();
        break;
        case "toggle-intensity-range": 
            console.log("de nieuwe value is: " , value)
            editIntensity(value);
        break;
    }
})

