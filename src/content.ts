import {MessageAction} from "./types";
import {orangeColour, toggleOverlay} from "./functions/overlay";
import {mirrorChars, mirrorFunctionality} from "./functions/dyslexia";

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
    }
})

