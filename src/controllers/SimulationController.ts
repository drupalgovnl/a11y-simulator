import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";
import { SimulationFactory } from "../models/SimulationFactory";
import { Disability } from "../models/Types";

export class SimulationController {
    private SimulationFactory: SimulationFactory;
    private ActivateSimulation: IDisabilitySimulation | null = null;
    private test: Record<Disability, SimulationFactory | null> = {
        "glaucoma": null,
        "cataract": null,
        "visual-impaired": null,
        "blackOverlay": null,
        "orangeColour": null,
        "parkinsons": null,
        "intensity_range": null
    }

    constructor(simulationFactory: SimulationFactory){
        this.SimulationFactory = simulationFactory;
    }

    public activate(type:Disability): void {
        this.ActivateSimulation = this.SimulationFactory.create(type)
        if(!this.test.parkinsons) {
            
        }
        this.ActivateSimulation.activate();
    }

    public deactivate(): void {
        if(!this.ActivateSimulation) {
            console.log("inactive test123");
        } else {
            console.log("active test123");
            this.ActivateSimulation.deactivate();
            this.ActivateSimulation = null;    
        }
    }

    public update(value:string): void {
        // moet een for loop worden voor elke actieve simulatie.
        if(!this.ActivateSimulation) {
            console.log("inactive test123");
        } else {
            console.log("active test123");
            this.ActivateSimulation.update(value);
        }
    }
}