import { Message } from "../models/Types";
import { MessagingService } from "../services/MessagingService";

export class ExtensionMenuController {
    private MessagingService: MessagingService;
    constructor(messagingService: MessagingService){
        this.MessagingService = messagingService;
    }
    public activate(message: Message) {
        this.MessagingService.sendMessage(message);
    }
}
