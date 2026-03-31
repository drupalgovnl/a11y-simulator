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

    htmlElement.addEventListener(eventName, function(event: Event ) {
        const target = event.target as HTMLInputElement;
        console.log('inside addeventListener the target is: ', target);
        const message: Message = {disability, value: target.value};
        // is active or not ? 

        // maybe a aray with disability and active status, => if same disability then active is switched, otherwise its active. -> 
       
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
            case "parkinsons":
                extensionMenuController.activateParkinsons(message);
            default:
                return;
        }
    });
}

createEventListener({elementId: "black-overlay", eventName: "click", disability: "blackOverlay"});
createEventListener({elementId: "orange-colour", eventName: "click", disability: "orangeColour"});
createEventListener({elementId: "button-glaucoma", eventName: "click", disability: "glaucoma"});
createEventListener({elementId: "button-visually-impaired", eventName: "click", disability: "visual-impaired"});
createEventListener({elementId: "button-tremor", eventName: "click", disability: "parkinsons"})
// createEventListener({elementId: "intensity-range", eventName: "input", disability: "toggle-intensity-range"}); @TODO work make sure to add the slider for all disabilities.
