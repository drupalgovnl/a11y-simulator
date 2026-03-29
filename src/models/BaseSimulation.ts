import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";

export abstract class BaseSimulation implements IDisabilitySimulation {
    protected isActive: boolean = false;

    activate(): void {
        if(this.isActive) return;
        this.isActive = true;
        console.log("BaseSimulation activate", this.isActive);
        this.onActivate();
    }
    deactivate(): void {
        if(!this.isActive) return;
        this.isActive = false;
        console.log("BaseSimulation deactivate", this.isActive);
        this.onDeactivate();
    }


    // these functions are overridable
    protected abstract onActivate():void;
    protected abstract onDeactivate():void;
    // need to create onupdate.
}