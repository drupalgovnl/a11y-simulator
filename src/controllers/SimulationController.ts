import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";
import { SimulationFactory } from "../models/SimulationFactory";
import { Disability } from "../models/types";

export class SimulationController {
    private SimulationFactory: SimulationFactory;
    private ActivateSimulation: IDisabilitySimulation | null = null;

    constructor(simulationFactory: SimulationFactory){
        this.SimulationFactory = simulationFactory;
    }

    //  first deactivates the current activation if active. then activates the new one.
    public activate(type:Disability): void {
        // this.ActivateSimulation?.deactivate();
        this.ActivateSimulation = this.SimulationFactory.create(type)

        this.ActivateSimulation.activate();
        // needs update aswel.
    }

    //  resets current simulation
    public deactivate(): void {
        this.ActivateSimulation?.deactivate();
        this.ActivateSimulation = null;
    }
}