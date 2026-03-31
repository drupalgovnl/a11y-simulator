import { BaseSimulation } from "./BaseSimulation";
import { OverlayManager } from "../DOM-Logic/OverlayManager";

export class GlaucomaSimulation extends BaseSimulation  {
    private OverlayManager: OverlayManager;
    private OverlayName: string = "glaucoma-overlay";

    constructor(overlayManager: OverlayManager) {
        super();
        this.OverlayManager = overlayManager;
    }
    
    protected onActivate(): void {
        this.OverlayManager.createOverlay(this.OverlayName);
        this.OverlayManager.applyGlaucomaEffect(this.OverlayName);
    }

    protected onDeactivate(): void {
        this.OverlayManager.removeOverlay(this.OverlayName);
    }

    protected onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }
}