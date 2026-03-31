import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";
import { SimulationFactory } from "../models/SimulationFactory";
import { Disability } from "../models/types";

export class SimulationController {
    private SimulationFactory: SimulationFactory;
    private ActiveSimulations: Record<Disability, IDisabilitySimulation | null> = {
        "toggle-intensity-range": null,
        "mirrorFunctionality": null,
        "orderFunctionality": null,
        "spaces": null,
        "switching": null,
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

    public check(disability: Disability) {
        if(!this.ActiveSimulations[disability]) {
            this.activate(disability);
        } else {
            this.deactivate(disability);
        }
    }

    //  first deactivates the current activation if active. then activates the new one.
    public activate(disability: Disability): void {
        const activeDisability: IDisabilitySimulation = this.SimulationFactory.create(disability);
        this.ActiveSimulations[disability] = activeDisability;
        activeDisability.onActivate();
    }

    //  resets current simulation
    public deactivate(disability: Disability): void {
        const activeDisability: IDisabilitySimulation | null = this.ActiveSimulations[disability];

        if(activeDisability) {
            activeDisability.onDeactivate();
            this.ActiveSimulations[disability] = null;
        }
    }

    public change(value: string) {

    }

}