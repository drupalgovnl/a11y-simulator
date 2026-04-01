import { Message } from "./models/Types";
import { OverlayManager } from "./DOM-Logic/OverlayManager";
import { SimulationController } from "./controllers/SimulationController";
import { SimulationFactory } from "./models/SimulationFactory";

//  create all needed factories/ dependencies
const overlayManager: OverlayManager  = new OverlayManager();
const simulationFactory: SimulationFactory = new SimulationFactory(overlayManager);
const simulationController: SimulationController = new SimulationController(simulationFactory);

chrome.runtime.onMessage.addListener((object, sender, response) => {
    const { disability, value } = object as Message;
    simulationController.check(object)
});

