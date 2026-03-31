import {Message} from "./models/Types";
import {orangeColour, toggleOverlay, editIntensity} from "./functions/overlay";
import { OverlayManager } from "./DOM-Logic/OverlayManager";
import { SimulationController } from "./controllers/SimulationController";
import { SimulationFactory } from "./models/SimulationFactory";

//  create all needed factories/ dependencies
const overlayManager: OverlayManager  = new OverlayManager();
const simulationFactory: SimulationFactory = new SimulationFactory(overlayManager);
const simulationController: SimulationController = new SimulationController(simulationFactory);
let isActive = false;
chrome.runtime.onMessage.addListener((object, sender, response) => {
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
            if(isActive) {
                simulationController.deactivate();
                isActive = false;
                console.log('glaucoma isactive: ', isActive);
            } else {
                simulationController.activate("glaucoma");
                isActive = true;
                console.log('glaucoma inactive: ', isActive);
            }

            
            // simulationController.deactivate();
            break;
        case "visual-impaired":
            //  add slider info...-> 
            if(isActive)  {
                simulationController.deactivate();
                isActive = false;
            } else {
                simulationController.activate("visual-impaired");
                isActive = true;
            }
            break;
        case "cataract": 
            console.log("de nieuwe value is: " , value);
            if(!value) return;
            editIntensity(value);
            break;
        case "parkinsons": 
            simulationController.activate("parkinsons");
            break;
        case "intensity_range":
            simulationController.update(disability);
            break;
    // if value() then update
    //     simulationController.activate(disability);
    //     simulationController.deactivate();
    //     simulationController.update(disability, value);
    }
})

