import { Message } from "../models/types";
import { MessagingService } from "../services/MessagingService";

export class ExtensionMenuController {
    private MessagingService: MessagingService;
    constructor(messagingService: MessagingService){
        this.MessagingService = messagingService;
    }

    public activateGlaucoma(message: Message) {
        //  Need to change the send message string 0 because not always you have intensity when activating a dissability...
        console.log('messageeeeeeeee1');
        this.MessagingService.sendMessage(message);
    }

    public activateCataract(message: Message) { 
        console.log('messageeeeeeeee2');
        this.MessagingService.sendMessage(message);
    }
    
    public activateVisualImpaired(message: Message) {
        console.log('messageeeeeeeee3');
        this.MessagingService.sendMessage(message);
    }

    public activateParkinsons(message: Message) {
        console.log("activateParkinsons");
        this.MessagingService.sendMessage(message);
    }

    public activateDyslexia(message: Message) {
        const element: HTMLElement | null = document.getElementById('dyslexia-menu');

        if(element) {
            if(element.style.visibility === "hidden") {
                element.style.visibility = "visible";
                this.MessagingService.sendMessage(message);
            } else {
                element.style.visibility = "hidden";
            }
        }
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
