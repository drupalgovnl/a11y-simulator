const originalBackgroundColor = document.body.style.backgroundColor;
const overlayName = "a11y-overlay";
let createdDivs = [];

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

export function createMacularDegenerationEffect() {
    // create multiple divs, 
    // create overlay
    if(createOverlay()) {
        // create more divs in the center
        let maculaDiv = document.getElementById("macula-div");
        
        if(!maculaDiv) {
            maculaDiv = document.createElement('div');
            maculaDiv.id = "macula-div";

            Object.assign(maculaDiv.style, {
                position: "fixed",
                width: "220px",
                height: "100px",
                margin: "10px 0 0 -10px",  
                background: 'rgba(255,255,255,0.2)',
                borderRadius:"70% 50% 70% 50%",
                color: "red",
                zIndex: "999",
                left: "50%",
                top: "50%"
            });

            document.body.appendChild(maculaDiv);
        }

        // toggle potentie om dit in een functie te stoppen aangezien hier meerdere elementen van gebruik moeten maken.
        if (maculaDiv.getAttribute('data-active') === 'true') {
            maculaDiv.style.display = 'none';
            maculaDiv.setAttribute('data-active', 'false');
        } else {
            maculaDiv.style.display = 'block';
            maculaDiv.setAttribute('data-active', 'true');
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


