import {MessageAction} from "./types";
import {orangeColour, toggleOverlay, tremor} from "./functions/overlay";

chrome.runtime.onMessage.addListener((message: MessageAction) => {
    switch(message) {
        case "blackOverlay":
            toggleOverlay();
            break;
        case "orangeColour":
            orangeColour();
            break;
        case "tremor":
            tremor();
            break;
    }
})

