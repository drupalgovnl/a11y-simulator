//  this class is used to create the overlay classes, to sepperate logic.
import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";
import { CataractSimulation } from "./CataractSimulation";
import { OverlayManager } from "../DOM-Logic/OverlayManager";
import { GlaucomaSimulation } from "./GlaucomaSimulation";
import { Disability } from "./types";
import { VisualImpairedSimulation } from "./VisualImpairedSimulation";
import { ParkinsonsSimulation } from "./ParkinsonsSimulation";

export class SimulationFactory {
    private overlayManager: OverlayManager;

    constructor(overlayManager: OverlayManager) {
        this.overlayManager = overlayManager;
    }

    public create(type:Disability): IDisabilitySimulation {
        switch (type) {
            case "glaucoma":
                console.log('creating glaucoma simulation object.');
                return new GlaucomaSimulation(this.overlayManager);
            case "cataract":
                return new CataractSimulation(this.overlayManager);
            case "visual-impaired":
                return new VisualImpairedSimulation(this.overlayManager);
            case "parkinsons":
                return new ParkinsonsSimulation(this.overlayManager);
        
            default:
            throw new Error(`There is no simulation of this type ${type}`);
            
        }
    }


}