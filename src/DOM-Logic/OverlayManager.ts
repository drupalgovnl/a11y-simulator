export class OverlayManager {
    public createOverlay(id: string):void { 
        let overlay = document.getElementById(id);

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = id;
            document.body.appendChild(overlay);
        }
    }

    public removeOverlay(id:string):void {
        const overlay = document.getElementById(id);
        if(!overlay) return;

        document.removeChild(overlay);
    }

    public applyGlaucomaEffect(id:string): void {
        const overlay = document.getElementById(id);

        if(!overlay) return;

        Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        pointerEvents: "none",
        zIndex: "999999",
        background:
            "radial-gradient(circle, rgba(0,0,0,0) 20%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.85) 100%)"
        });
    }

    public applyVisualImpairmentEffect(id: string):void {
        console.log('lets add some style to....' +  id);
        let overlay = document.getElementById(id);

        if(!overlay) return;

        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',        // Page keeps working, otherwise overlay prefents this.
            // background: 'rgba(255,255,255,0.2)', -> staar!
            backdropFilter: 'blur(2px)',
            zIndex: '100',
            display: 'block'
        });
        document.body.appendChild(overlay);
    }

    // add the other effects that changes the overlay.
}