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
        this.MessagingService.sendMessage(message);
    }
}
