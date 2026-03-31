export class OverlayManager {
    public createOverlay(id: string):void { 
        let overlay = document.getElementById(id);

        console.log('creating', id);

        if (!overlay) {
            console.log('creating div', id);
            overlay = document.createElement('div');
            overlay.id = id;
            overlay.className = id;
            document.body.appendChild(overlay);
        }
    }

    public removeOverlay(id:string):void {
        let overlay = document.getElementById(id);
        if(!overlay) return;
        console.log('removeOverlay', overlay, id)
        overlay.parentNode?.removeChild(overlay);
    }

    public applyGlaucomaEffect(id:string): void {
        let overlay = document.getElementById(id);

        if(!overlay) return;

        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            pointerEvents: "none",
            zIndex: "99",
            background:
                "radial-gradient(circle, rgba(0,0,0,0) 20%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.85) 100%)"
        });

        document.body.appendChild(overlay);
    }

    updateGlaucomaEffect(id: string, value: string) {
        let overlay = document.getElementById(id); 
        if(!overlay) return;
        // "1 -> 100"
        let firstPercentage: number = 20 + parseInt(value);
        let secondPercentage: number = 45 + parseInt(value);
        let thirdPercentage: number = 100 + parseInt(value);
        // how do i update the circle gradient with the %... with slider.->
        Object.assign(overlay.style, {
             background:
                `radial-gradient(circle, rgba(0,0,0,0) ${firstPercentage}%, rgba(0,0,0,0.4) ${secondPercentage}%, rgba(0,0,0,0.85) ${thirdPercentage}%)`
        });

        document.appendChild(overlay);
    }

    public applyVisualImpairmentEffect(id: string): void {
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

    public updateVisualImparedEffect(id: string, value: string) {
        let overlay = document.getElementById(id); 
        if(!overlay) return;
        Object.assign(overlay.style, {
            backdropFilter: `blur(${value}px)`
        });

        document.body.appendChild(overlay);
    }

    public applyCataractEffect(id: string) {
        // TODO make function for the overlay check + append tochild of body. used everywhere.
        let overlay = document.getElementById(id);

        if(!overlay) return;

        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',        // Page keeps working, otherwise overlay prefents this.
            background: 'rgba(255,255,255,0.2)', 
            backdropFilter: 'blur(2px)',
            zIndex: '100',
            display: 'block'
        });
    }

    public applyTremorEffect(id: string) {
        console.log("tremor");
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', function(e) {
            // console.log(`mousemove ${e.clientX} Y: ${e.clientY}`);
        mouseX = e.clientX;
        mouseY = e.clientY;
        });

        // document.body.style.cursor = "none !important";

        const style = document.createElement("style");
        style.innerHTML = `
        .no-cursor {
        cursor: none !important;
            }
            `;

        document.head.appendChild(style);

        document.body.classList.add("no-cursor");
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" viewBox="0 0 16 16"><polygon points="0,0 0,12 3,9 6,15 8,14 5,8 9,8" 
            fill="black" stroke="white" stroke-width="1"/></svg>`;
        const encSvg = encodeURIComponent(svg);

        const fakeCursor = document.createElement('div');
        Object.assign(fakeCursor.style,{
            width:"16px",
            height: "16px",
            backgroundImage: `url('data:image/svg+xml,${encSvg}')`,
            backgroundRepeat: "no-repeat",
            position: "fixed",
            pointerEvents: "none",
            zIndex: "999999",
            left: "0",
            top: "0"
        });

        document.body.appendChild(fakeCursor);

        const Hz = 4;
        const amplitudeX = 30;
        const amplitudeY = 4;

        function animate(timestamp: any) {
            const t = timestamp / 1000;
            const trillX = Math.sin(2 * Math.PI * Hz * t) * amplitudeX;
            const trillY = Math.sin(2 * Math.PI * Hz * t + 1) *amplitudeY;

            fakeCursor.style.transform = `translate(${mouseX + trillX}px, ${mouseY + trillY}px)`;

            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }   
}