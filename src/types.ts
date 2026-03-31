export type CreateEventListenerProps = {
    elementId: string;
    eventName: string;
    messageAction: MessageAction;
}

export type MessageAction =
    | "blackOverlay"
    | "redOverlay"
    | "orangeColour"
    | "mirrorFunctionality"
    | "spaces"
    | "switching"
    | "orderFunctionality";
