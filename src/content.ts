import {Message} from "./models/types";
import {orangeColour, toggleOverlay, editIntensity} from "./functions/overlay";
import { OverlayManager } from "./DOM-Logic/OverlayManager";
import { SimulationController } from "./controllers/SimulationController";
import { SimulationFactory } from "./models/SimulationFactory";

//  create all needed factories/ dependencies
const overlayManager: OverlayManager  = new OverlayManager();
const simulationFactory: SimulationFactory = new SimulationFactory(overlayManager);
const simulationController: SimulationController = new SimulationController(simulationFactory);

chrome.runtime.onMessage.addListener((object, sender, response) => {
    console.log('object', object);
    const { disability, value } = object as Message;
    console.log('listening, to ', disability, value);

    switch(disability) {
        case "blackOverlay":
            toggleOverlay();
            break;
        case "orangeColour":
            orangeColour();
            break;
        case "glaucoma":
            simulationController.activate("glaucoma");
        break;
        case "visual-impaired":
            //  add slider info...-> 
            simulationController.activate("visual-impaired");
        break;
        case "cataract": 
            console.log("de nieuwe value is: " , value)
            if(!value) return;
            editIntensity(value);
        break;
        case "parkinsons": 
            simulationController.activate("orangeColour")
        break;
    }
})

