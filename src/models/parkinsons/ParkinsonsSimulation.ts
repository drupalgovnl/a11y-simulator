import { OverlayManager } from "../../DOM-Logic/OverlayManager";
import { IDisabilitySimulation } from "../../interfaces/IDisabilitySimulation";

export class ParkinsonsSimulation implements IDisabilitySimulation  {
    private OverlayManager: OverlayManager;
    private OverlayName: string = "parkinsons-overlay";

    constructor(overlayManager: OverlayManager) {
        this.OverlayManager = overlayManager;
    }
    
    public onActivate(): void {
        this.OverlayManager.createOverlay(this.OverlayName);
        this.OverlayManager.applyTremorEffect(this.OverlayName);
    }

    public onDeactivate(): void {
        this.OverlayManager.removeOverlay(this.OverlayName);
    }

    public onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }
}