import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";
import { SimulationFactory } from "../models/SimulationFactory";
import { Disability, Message } from "../models/types";

export class SimulationController {
    private SimulationFactory: SimulationFactory;
    private activeSimulations: Record<Disability, IDisabilitySimulation | null> = {
        "toggle-intensity-range": null,
        "glaucoma": null,
        "cataract": null,
        "visual-impaired": null,
        "blackOverlay": null,
        "orangeColour": null,
        "parkinsons": null,
        dyslexiaMirrorFunctionality: null,
        dyslexiaOrderFunctionality: null,
        dyslexiaSpaces: null,
        dyslexiaSwitching: null,
        "intensity_range": null
    }

    constructor(simulationFactory: SimulationFactory){
        this.SimulationFactory = simulationFactory;
    }

    public check(message: Message) {
        console.log("check message", message);
        if(message.disability === "intensity_range") {
            if(!message.value) return;
            console.log('update the message');
            this.update(message.value);
        } else {
            if(!this.activeSimulations[message.disability]) {
                this.activate(message.disability);
            } else {
                this.deactivate(message.disability);
            }
        }
    }

    //  first deactivates the current activation if active. then activates the new one.
    public activate(disability: Disability): void {
        const activeDisability: IDisabilitySimulation | undefined = this.SimulationFactory.create(disability);

        if(activeDisability) {
            this.activeSimulations[disability] = activeDisability;
            activeDisability.onActivate();
        }
    }

    //  resets current simulation
    public deactivate(disability: Disability): void {
        const activeDisability: IDisabilitySimulation | null = this.activeSimulations[disability];

        if(activeDisability) {
            activeDisability.onDeactivate();
            this.activeSimulations[disability] = null;
        }
    }

    // refactor
    public async update(value: string) {
        for (const [disability, simulation] of Object.entries(this.activeSimulations)) {
            // if(!simulation) continue;
            if(simulation) {
                console.log('disability that is going to be updated', disability, simulation);
                simulation.onUpdate(value);
            }

        }
    }

}