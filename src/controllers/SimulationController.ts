import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";
import { SimulationFactory } from "../models/SimulationFactory";
import { Disability, Message } from "../models/Types";

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

    // TODO refactor.
    public check(message: Message) {
        console.log("check message", message);
        if(message.disability === "intensity_range") { 
            if(!message.value) return;
            console.log('update the message');
            this.update(message.value);
        } else {
            if(!this.ActiveSimulations[message.disability]) {
                this.activate(message.disability);
            } else {
                this.deactivate(message.disability);
            }
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

    // refactor
    public async update(value: string) {
        for (const [disability, simulation] of Object.entries(this.ActiveSimulations)) {
            // if(!simulation) continue;
            if(simulation) {
                console.log('disability that is going to be updated', disability, simulation);
                await simulation.onUpdate(value);    
            }
            
        }
    }

}