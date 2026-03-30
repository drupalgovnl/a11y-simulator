import { OverlayManager } from "../DOM-Logic/OverlayManager";
import { BaseSimulation } from "./BaseSimulation";

export class VisualImpairedSimulation extends BaseSimulation {
    private OverlayManager: OverlayManager;
    private OverlayName: string = "cataract-overlay" 

    constructor(overlayManager: OverlayManager) 
    {
        super();
        this.OverlayManager = overlayManager;
    }

    protected onActivate(): void {
        console.log('does this activate on the same click');    
        this.OverlayManager.createOverlay(this.OverlayName);
        this.OverlayManager.applyVisualImpairmentEffect(this.OverlayName);
    }
    protected onDeactivate(): void {
        console.log('does this activate on the same click');
        this.OverlayManager.removeOverlay(this.OverlayName);
    }

}