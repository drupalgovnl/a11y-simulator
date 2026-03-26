import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";

export abstract class BaseSimulation implements IDisabilitySimulation {
    protected isActive: boolean = true;

    activate(): void {
        console.log("BaseSimulation activate", this.isActive);
        this.isActive = true;
        this.onActivate();
    }
    deactivate(): void {
        console.log("BaseSimulation deactivate", this.isActive);
        this.isActive = false;
        this.onDeactivate();
    }


    // these functions are overridable
    protected abstract onActivate():void;
    protected abstract onDeactivate():void;
    // need to create onupdate.
}