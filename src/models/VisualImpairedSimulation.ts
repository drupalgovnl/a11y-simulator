import { OverlayManager } from "../DOM-Logic/OverlayManager";
import {IDisabilitySimulation} from "../interfaces/IDisabilitySimulation";

export class VisualImpairedSimulation implements IDisabilitySimulation {
    private OverlayManager: OverlayManager;
    private OverlayName: string = "cataract-overlay" 

    constructor(overlayManager: OverlayManager) 
    {
        this.OverlayManager = overlayManager;
    }

    public onActivate(): void {
        console.log('does this activate on the same click');    
        this.OverlayManager.createOverlay(this.OverlayName);
        this.OverlayManager.applyVisualImpairmentEffect(this.OverlayName);
    }

    public onDeactivate(): void {
        console.log('does this activate on the same click');
        this.OverlayManager.removeOverlay(this.OverlayName);
    }

    public onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }

}


