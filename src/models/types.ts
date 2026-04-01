 /**
   * Creates an event listener for a specific HTML element.
   *
   * @param {string} elementId - The ID of the HTML element to listen to.
   * @param {string} eventName - The name of the event to listen for.
   * @param {MessageAction} messageAction - The action to send to the content script, there are predefined options, so it can never be something random.
   */
export type CreateEventListenerProps = {
    elementId: string;
    eventName: string;
    disability: Disability | Reset;
}

export type Message = {
    disability: Disability | Reset;
    value: string | null;
}
// export type MessageAction = "blackOverlay" | "redOverlay" | "orangeColour" | "toggle-button-visually-impaired" | "toggle-button-glaucoma" | "toggle-intensity-range";
export type Disability =
    | DyslexiaTypes
    | "glaucoma"
    | "cataract"
    | "visual-impaired"
    | "blackOverlay"
    | "orangeColour"
    | "parkinsons"
    | "toggle-intensity-range"
    | "intensity_range";

export type DyslexiaTypes =
    | "dyslexiaMirrorFunctionality"
    | "dyslexiaSpaces"
    | "dyslexiaSwitching"
    | "dyslexiaOrderFunctionality";

export type Reset = "resetSim";

