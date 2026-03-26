const originalBackgroundColor = document.body.style.backgroundColor;

export function toggleOverlay() {
    let overlay: HTMLElement | null = document.getElementById("blackOverlay");

    if(overlay) {
        document.body.removeChild(overlay);
    } else {
        overlay = document.createElement("div");
        overlay.className = "blackOverlay";
        overlay.id = "blackOverlay";

        document.body.appendChild(overlay)
    }
}

export function orangeColour() {
    if(originalBackgroundColor === document.body.style.backgroundColor) {
        document.body.style.backgroundColor = "orange"
    } else {
        document.body.style.backgroundColor = originalBackgroundColor;
    }
}

export function tremor() {
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

