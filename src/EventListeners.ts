import {CreateEventListenerProps, Message} from "./models/types";
import { ExtensionMenuController } from "./controllers/ExtensionMenuController";
import { MessagingService } from "./services/MessagingService";

const messagingService: MessagingService = new MessagingService()
const extensionMenuController: ExtensionMenuController = new ExtensionMenuController(messagingService);

function createEventListener(props: CreateEventListenerProps) {
    // deconstruct the properties to use.
    console.log('eventlistener test 123 321');
    const { elementId, eventName, disability } = props;
    const htmlElement: HTMLElement | null = document.getElementById(elementId);

    if(!htmlElement) {
        console.warn("could not find correct element")
        return;
    }

    htmlElement.addEventListener(eventName, function(event: Event ) {
        const target = event.target as HTMLInputElement;
        console.log('inside addeventListener the target is: ', target);
        const message: Message = {disability, value: target.value};
       
        switch (disability) {
            case "glaucoma":
                extensionMenuController.activateGlaucoma(message);
                break;
            case "cataract":
                extensionMenuController.activateCataract(message);
                break;
            case "visual-impaired":
                extensionMenuController.activateVisualImpaired(message);
                break;
            default:
                return;
        }
    });
}

createEventListener({elementId: "black-overlay", eventName: "click", disability: "blackOverlay"});
createEventListener({elementId: "orange-colour", eventName: "click", disability: "orangeColour"});
createEventListener({elementId: "button-glaucoma", eventName: "click", disability: "glaucoma"});
createEventListener({elementId: "button-visually-impaired", eventName: "click", disability: "visual-impaired"});
// createEventListener({elementId: "intensity-range", eventName: "input", disability: "toggle-intensity-range"}); @TODO work make sure to add the slider for all disabilities.
