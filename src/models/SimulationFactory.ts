//  this class is used to create the overlay classes, to sepperate logic.
import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";
import { CataractSimulation } from "./CataractSimulation";
import { OverlayManager } from "../DOM-Logic/OverlayManager";
import { GlaucomaSimulation } from "./GlaucomaSimulation";
import {Disability, Reset} from "./Types";
import { VisualImpairedSimulation } from "./VisualImpairedSimulation";
import { ParkinsonsSimulation } from "./ParkinsonsSimulation";
import {DyslexiaMirrorFunctionality} from "./dyslexia/DyslexiaMirrorFunctionality";
import {DyslexiaSpacesFunctionality} from "./dyslexia/DyslexiaSpacesFunctionality";
import {DyslexiaSwitchFunctionality} from "./dyslexia/DyslexiaSwitchFunctionality";
import {DyslexiaWordOrderFunctionality} from "./dyslexia/DyslexiaWordOrderFunctionality";

export class SimulationFactory {
    private overlayManager: OverlayManager;

    constructor(overlayManager: OverlayManager) {
        this.overlayManager = overlayManager;
    }

    public create(type:Disability | Reset): IDisabilitySimulation | undefined {
        switch (type) {
            case "glaucoma":
                return new GlaucomaSimulation(this.overlayManager);
            case "cataract":
                return new CataractSimulation(this.overlayManager);
            case "visual-impaired":
                return new VisualImpairedSimulation(this.overlayManager);
            case "parkinsons":
                return new ParkinsonsSimulation(this.overlayManager);
            case "dyslexiaMirrorFunctionality":
                return new DyslexiaMirrorFunctionality();
            case "dyslexiaSpaces":
                return new DyslexiaSpacesFunctionality();
            case "dyslexiaSwitching":
                return new DyslexiaSwitchFunctionality();
            case "dyslexiaOrderFunctionality":
                return new DyslexiaWordOrderFunctionality();
            case "resetSim":
                window.location.reload();
                break;
            default:
            throw new Error(`There is no simulation of this type ${type}`);
        }
    }


}