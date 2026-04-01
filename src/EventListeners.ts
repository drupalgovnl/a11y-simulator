import {CreateEventListenerProps, Message} from "./models/Types";
import { ExtensionMenuController } from "./controllers/ExtensionMenuController";
import { MessagingService } from "./services/MessagingService";

const messagingService: MessagingService = new MessagingService()
const extensionMenuController: ExtensionMenuController = new ExtensionMenuController(messagingService);
// state bijhouden van active of niet__ >
function createEventListener(props: CreateEventListenerProps) {
    // deconstruct the properties to use.
    const { elementId, eventName, disability } = props;
    const htmlElement: HTMLElement | null = document.getElementById(elementId);

    if(!htmlElement) {
        console.warn("could not find correct element")
        return;
    }

    htmlElement.addEventListener(eventName, function(event: Event) {
        const target = event.target as HTMLInputElement;
        const message: Message = {disability, value: target.value};
        switch (disability) {
            case "resetSim":
                document.querySelectorAll("input[type='checkbox']").forEach(cb => {
                    const checkbox: HTMLInputElement = cb as HTMLInputElement;
                    checkbox.checked = false;
                });
                const slider: HTMLInputElement | null = document.getElementById("intensity-range") as HTMLInputElement;
                slider.value = "0";
                extensionMenuController.activate(message);
           
                break;
            default:
                extensionMenuController.activate(message);
                return;
        }
    });
}


createEventListener({elementId: "button-glaucoma", eventName: "click", disability: "glaucoma"});
createEventListener({elementId: "button-visually-impaired", eventName: "click", disability: "visual-impaired"});
createEventListener({elementId: "button-tremor", eventName: "click", disability: "parkinsons"});
createEventListener({elementId: "mirroring", eventName: "change", disability: "dyslexiaMirrorFunctionality"});
createEventListener({elementId: "spaces", eventName: "change", disability: "dyslexiaSpaces"});
createEventListener({elementId: "switching", eventName: "change", disability: "dyslexiaSwitching"});
createEventListener({elementId: "word-order", eventName: "change", disability: "dyslexiaOrderFunctionality"});
createEventListener({elementId: "resetSim", eventName: "click", disability: "resetSim"});
createEventListener({elementId: "button-cataract", eventName: "click", disability: "cataract"});
createEventListener({elementId: "button-tremor", eventName: "click", disability: "parkinsons"})
createEventListener({elementId: "intensity-range", eventName: "input", disability: "intensity_range"});
