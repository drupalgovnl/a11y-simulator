export class OverlayManager {
    public createOverlay(id: string):void { 
        let overlay = document.getElementById(id);

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = id;
            overlay.className = id;
            document.body.appendChild(overlay);
        }
    }

    public removeOverlay(id:string):void {
        let overlay = document.getElementById(id);
        if(!overlay) return;
        overlay.parentNode?.removeChild(overlay);
    }

    public applyGlaucomaEffect(id:string): void {
        let overlay = document.getElementById(id);
        const base = this.createRandomRadialGradient();
        const noise1 = this.generateNoiseLayer();
        const noise2 = this.generateNoiseLayer();

        if(!overlay) return;

        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            pointerEvents: "none",
            zIndex: "99",
            background: `${base}, ${noise1}, ${noise2}`
        });

        document.body.appendChild(overlay);
    }
    
    private generateNoiseLayer(): string {
        const x = this.random(0, 100);
        const y = this.random(0, 100);
        const size = this.random(10, 30);
        const opacity = this.random(0.1, 0.3);

        return `
            radial-gradient(
                circle at ${x}% ${y}%,
                rgba(0,0,0,${opacity}) 0%,
                rgba(0,0,0,0) ${size}%
            )
        `;
    }

    private random(min: number, max: number):number {
        return Math.random() *  ( max - min ) + min;
    }

    private createRandomRadialGradient(): string {
        const centerX = this.random(30, 70); // %
        const centerY = this.random(30, 70); // %

        const inner = this.random(10, 25);
        const mid = inner + this.random(10, 25);
        const outer = mid + this.random(20, 40);

        const opacityMid = this.random(0.3, 0.6);
        const opacityOuter = this.random(0.7, 0.95);

        return `
            radial-gradient(
                ellipse at ${centerX}% ${centerY}%,
                rgba(0,0,0,0) ${inner}%,
                rgba(0,0,0,${opacityMid}) ${mid}%,
                rgba(0,0,0,${opacityOuter}) ${outer}%
            )
        `;
    }

    public async updateGlaucomaEffect(id: string, value: string):Promise<void> {
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
            pointerEvents: 'none',       
            backdropFilter: 'blur(2px)',
            zIndex: '100',
            display: 'block'
        });
        document.body.appendChild(overlay);
    }

    public async updateVisualImparedEffect(id: string, value: string): Promise<void> {
        let overlay = document.getElementById(id); 
        if(!overlay) return;
        Object.assign(overlay.style, {
            backdropFilter: `blur(${value}px)`
        });

        document.body.appendChild(overlay);
    }

    public applyCataractEffect(id: string) {
        let overlay = document.getElementById(id);

        if(!overlay) return;

        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',        
            background: 'rgba(255,255,255,0.2)', 
            backdropFilter: 'blur(2px)',
            zIndex: '100',
            display: 'block'
        });
    }

    public async updateCataractEffect(id: string, value: string):Promise<void> {
        let overlay = document.getElementById(id); 
        const sliderValue = parseInt(value); // 0 - 50

        const opacity = 0.2 + (sliderValue / 50) * (0.6 - 0.2);
        if(!overlay) return;

        Object.assign(overlay.style, {
            background: `rgba(255,255,255,${opacity})`, 
        });

        document.body.appendChild(overlay);
    }

    public async applyTremorEffect(id: string) : Promise<void> {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        });


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

        const inputs = document.querySelectorAll('input');
        inputs.forEach((input) => {
            console.log('inputs', input);
            input.style.setProperty('cursor', 'none');
        });

        await this.curserToNone("a")
        await this.curserToNone("button")
        await this.curserToNone("span")
        await this.curserToNone("input")
           
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

    private async curserToNone(elementName:string) {
        const elements = document.querySelectorAll(elementName);

        elements.forEach((element) => {
            (element as HTMLElement).style.setProperty('cursor', 'none');
        });
    }
}