import { OverlayManager } from "../DOM-Logic/OverlayManager";
import {IDisabilitySimulation} from "../interfaces/IDisabilitySimulation";

export class CataractSimulation implements IDisabilitySimulation {
    private OverlayManager: OverlayManager;
    private OverlayName: string = "cataract-overlay" 

    constructor(overlayManager: OverlayManager) {
        this.OverlayManager = overlayManager;
    }

    isActive(): boolean {
        throw new Error("Method not implemented.");
    }

    public onActivate(): void {
        this.OverlayManager.createOverlay(this.OverlayName);
        this.OverlayManager.applyCataractEffect(this.OverlayName);
    }

    public onDeactivate(): void {
        this.OverlayManager.removeOverlay(this.OverlayName);
    }
    
    public onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }
}