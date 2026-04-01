import { Message } from "../models/types";
import { MessagingService } from "../services/MessagingService";

export class ExtensionMenuController {
    private MessagingService: MessagingService;
    constructor(messagingService: MessagingService){
        this.MessagingService = messagingService;
    }

    public activateGlaucoma(message: Message): void {
        console.log('ExtensionMenuController activateGlaucoma');
        this.MessagingService.sendMessage(message);
    }

    public activateCataract(message: Message): void {
        console.log('ExtensionMenuController MessagingService');
        this.MessagingService.sendMessage(message);
    }
    
    public activateVisualImpaired(message: Message): void {
        console.log('ExtensionMenuController activateVisualImpaired');
        this.MessagingService.sendMessage(message);
    }

    public activateParkinsons(message: Message): void {
        console.log("ExtensionMenuController activateParkinsons");
        this.MessagingService.sendMessage(message);
    }

    public editIntensity(message: Message): void {
        console.log('extensionMenuController editIntensity : ', message.value);
        this.MessagingService.sendMessage(message);
    }

    public reset(message: Message) {
        this.MessagingService.sendMessage(message);
    }

    public activateDyslexiaSwitchChars(message: Message) {
        console.log("switch characters dyslexia")
        this.MessagingService.sendMessage(message);
    }

    public switchWords(message: Message) {
        this.MessagingService.sendMessage(message);
        console.log("switch words dyslexia")
    }

    public activateMirror(message: Message) {
        this.MessagingService.sendMessage(message);
        console.log("switch cmirror dyslexia")
    }

    public activateSpaces(message: Message) {
        this.MessagingService.sendMessage(message);
        console.log("activate spaces dyslexia")
    }

    public activateBlackOverlay(message: Message) {
        this.MessagingService.sendMessage(message);
        console.log("activate black overlay")
    }
}
