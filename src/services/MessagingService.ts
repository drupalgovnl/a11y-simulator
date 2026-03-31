import { Message } from "../models/types";
import Tab = chrome.tabs.Tab;

export class MessagingService {
    public async sendMessage (message: Message ) {
        console.log('sending message about', message);
        const tabs: Tab[] = await chrome.tabs.query({active: true, currentWindow: true});
        const activeTab = tabs[0];

        if(!activeTab.id) return;
        chrome.tabs.sendMessage(activeTab.id, message);
    }
}