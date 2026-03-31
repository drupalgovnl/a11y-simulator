import {MessageAction} from "./types";
import {orangeColour, toggleOverlay} from "./functions/overlay";
import {
    mirrorFunctionality,
    spacesFunctionality,
    switchFunctionality,
    wordOrderFunctionality
} from "./functions/dyslexia";

chrome.runtime.onMessage.addListener((message: MessageAction) => {
    switch(message) {
        case "blackOverlay":
            toggleOverlay();
            break;
        case "orangeColour":
            orangeColour();
            break;
        case "mirrorFunctionality":
            mirrorFunctionality();
            break;
        case "spaces":
            spacesFunctionality();
            break;
        case "switching":
            switchFunctionality();
            break;
        case "orderFunctionality":
            wordOrderFunctionality();
            break;
    }
})

