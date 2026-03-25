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

