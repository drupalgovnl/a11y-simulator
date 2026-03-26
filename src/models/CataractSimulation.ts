import { BaseSimulation } from "./BaseSimulation";
import { OverlayManager } from "../DOM-Logic/OverlayManager";

export class CataractSimulation extends BaseSimulation {
    private OverlayManager: OverlayManager;
    private OverlayName: string = "cataract-overlay" 

    constructor(overlayManager: OverlayManager) {
        super();
        this.OverlayManager = overlayManager;
    }

    protected onActivate(): void {
        this.OverlayManager.createOverlay(this.OverlayName);
    }

    protected onDeactivate(): void {
        this.OverlayManager.removeOverlay(this.OverlayName);
    }
}