import { OverlayManager } from "../DOM-Logic/OverlayManager";
import {IDisabilitySimulation} from "../interfaces/IDisabilitySimulation";

export class VisualImpairedSimulation implements IDisabilitySimulation {
    private OverlayManager: OverlayManager;
    private OverlayName: string = "visual-impaired" 

    constructor(overlayManager: OverlayManager) 
    {
        this.OverlayManager = overlayManager;
    }

    protected onActivate(): void {
        this.OverlayManager.createOverlay(this.OverlayName);
        this.OverlayManager.applyVisualImpairmentEffect(this.OverlayName);
    }

    protected onDeactivate(): void {
        this.OverlayManager.removeOverlay(this.OverlayName);
    }

    protected onUpdate(value: string): void {
       this.OverlayManager.updateVisualImparedEffect(this.OverlayName, value);
    }

}


