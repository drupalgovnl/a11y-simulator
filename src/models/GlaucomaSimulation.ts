import { OverlayManager } from "../DOM-Logic/OverlayManager";
import { IDisabilitySimulation } from "../interfaces/IDisabilitySimulation";

export class GlaucomaSimulation implements IDisabilitySimulation  {
    private OverlayManager: OverlayManager;
    private OverlayName: string = "glaucoma-overlay";

    constructor(overlayManager: OverlayManager) {
        this.OverlayManager = overlayManager;
    }

    public onActivate(): void {
        console.log("creating overlay GlaucomaSimulation");
        this.OverlayManager.createOverlay(this.OverlayName);
        this.OverlayManager.applyGlaucomaEffect(this.OverlayName);
    }

    public onDeactivate(): void {
        this.OverlayManager.removeOverlay(this.OverlayName);
    }

    public onUpdate(value: string): void {
        this.OverlayManager.updateGlaucomaEffect(this.OverlayName, value)
    }
}