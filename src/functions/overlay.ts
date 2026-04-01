const originalBackgroundColor = document.body.style.backgroundColor;
const overlayName = "a11y-overlay";
let createdDivs = [];

/**
 * Creates an overlay with a blur effect on the entire page.
 */
export function createOverlay() {
    let overlay = document.getElementById(overlayName);

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = overlayName;
        document.body.appendChild(overlay);
        return true; 
    }

    // 1. cleare style so it removes everything previously set via Object.assign
    overlay.removeAttribute("style");

    // clear inner content Removes extra divs (like 'macula-div') from previous effects
    overlay.innerHTML = "";

    // toggle
    if (overlay.getAttribute('data-active') === 'true') {
        overlay.style.display = 'none';
        overlay.setAttribute('data-active', 'false');
        return false;
    } else {
        overlay.style.display = 'block';
        overlay.setAttribute('data-active', 'true');
        return true; 
    }
}

export function createGlaucoomEffect() {
    // create multiple divs, 
    // create overlay
    if(createOverlay()) {
        // create more divs in the center
        const glaucomaOverlay = document.createElement("div");
        // default settings for glaucoma.
        glaucomaOverlay.id = "glaucoma-overlay";
        glaucomaOverlay.style.position = "fixed";
        glaucomaOverlay.style.inset = "0";
        glaucomaOverlay.style.pointerEvents = "none";
        glaucomaOverlay.style.zIndex = "999999";

        for (let i = 0; i < 8; i++) {
            const spot = document.createElement("div");

            const size = 100 + Math.random() * 250;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            Object.assign(spot.style, {
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}px`,
                top: `${y}px`,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.95)",
                filter: "blur(30px)",
                transform: "translate(-50%, -50%)"
            });

            glaucomaOverlay.appendChild(spot);
        }

        document.body.appendChild(glaucomaOverlay);

        // toggle potentie om dit in een functie te stoppen aangezien hier meerdere elementen van gebruik moeten maken.
        if (glaucomaOverlay.getAttribute('data-active') === 'true') {
            glaucomaOverlay.style.display = 'none';
            glaucomaOverlay.setAttribute('data-active', 'false');
        } else {
            glaucomaOverlay.style.display = 'block';
            glaucomaOverlay.setAttribute('data-active', 'true');
        }
    }
}

export function createVisualImpairmentEffect() {
    console.log('hello creating visual impairment');
    if(createOverlay()) {
        console.log('lets add some style to....' +  overlayName);
        let overlay = document.getElementById(overlayName);

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

    console.log('createVisualImpairmentEffect, false')
}

/**
 * intensity of the effect can be edited by the user, this function will get the value of the range input and apply it to the blur effect.
 */
export function editIntensity(intensityInPx: string) {
    // get current active element,
    let overlay = document.getElementById(overlayName);
    if(!overlay) return; 

    Object.assign(overlay.style, {
        backdropFilter: `blur(${intensityInPx}px)`,
    });
}


