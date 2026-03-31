import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";
import { SimulationFactory } from "../models/SimulationFactory";
import { Disability } from "../models/types";

export class SimulationController {
    private SimulationFactory: SimulationFactory;
    private activeSimulations: Record<Disability, IDisabilitySimulation | null> = {
        "toggle-intensity-range": null,
        mirrorFunctionality: null,
        orderFunctionality: null,
        spaces: null,
        switching: null,
        "glaucoma": null,
        "cataract": null,
        "visual-impaired": null,
        "blackOverlay": null,
        "orangeColour": null,
        "parkinsons": null
    }

    constructor(simulationFactory: SimulationFactory){
        this.SimulationFactory = simulationFactory;
    }

    public check(disability: Disability) {
        if(!this.activeSimulations[disability]) {
            this.activate(disability);
        } else {
            this.deactivate(disability);
        }
    }

    //  first deactivates the current activation if active. then activates the new one.
    public activate(disability: Disability): void {
        const activeDisability: IDisabilitySimulation = this.SimulationFactory.create(disability);
        this.activeSimulations[disability] = activeDisability;
        activeDisability.onActivate();
    }

    //  resets current simulation
    public deactivate(disability: Disability): void {
        const activeDisability: IDisabilitySimulation | null = this.activeSimulations[disability];

        if(activeDisability) {
            activeDisability.onDeactivate();
            this.activeSimulations[disability] = null;
        }
    }

    public change(value: string) {

    }

}