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
        console.log("creating overlay GlaucomaSimulation");
        this.OverlayManager.createOverlay(this.OverlayName);
        console.log("applying GlaucomaSimulation effect");
        this.OverlayManager.applyGlaucomaEffect(this.OverlayName);
    }

    protected onDeactivate(): void {
        this.OverlayManager.removeOverlay(this.OverlayName);
    }

    protected onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }
}