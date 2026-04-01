import {OverlayManager} from "../DOM-Logic/OverlayManager";
import {IDisabilitySimulation} from "../interfaces/IDisabilitySimulation";

export class BlackOverlaySimulation implements IDisabilitySimulation {
    public onActivate(): void {
        this.OverlayManager.createOverlay(this.OverlayName);
        const overlay: HTMLElement | null = document.getElementById("blackOverlay");

        if (overlay) {
            overlay.className = "blackOverlay";
        }

    }
    public onDeactivate(): void {
        this.OverlayManager.removeOverlay(this.OverlayName);
    }

    public onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }

    private OverlayManager: OverlayManager;
    private OverlayName: string = "blackOverlay";

    constructor(overlayManager: OverlayManager) {
        this.OverlayManager = overlayManager;
    }

}