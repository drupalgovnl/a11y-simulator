import Tab = chrome.tabs.Tab;
import {CreateEventListenerProps} from "./types";

function createEventListener(props: CreateEventListenerProps) {
    const { elementId, eventName, messageAction } = props;
    const htmlElement: HTMLElement | null = document.getElementById(elementId);

    if(!htmlElement) {
        console.warn("could not find correct element")
        return;
    }

    htmlElement.addEventListener(eventName, function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs: Tab[]) {
            const currentTab: Tab = tabs[0];
            const url: string | undefined = currentTab.url;
            const id: number | undefined = currentTab.id;

            if(!url || !id) {
                console.warn("Current tab is invalid");
                return;
            }

            if(url.startsWith("http")) {
                chrome.tabs.sendMessage(id, messageAction);
            } else {
                alert("Deze extensie werkt alleen op HTTP/HTTPS websites");
            }
        })
    });
}

createEventListener({elementId: "black-overlay", eventName: "click", messageAction: "blackOverlay"});
createEventListener({elementId: "orange-colour", eventName: "click", messageAction: "orangeColour"});
createEventListener({elementId: "tremor", eventName: "click", messageAction: "tremor"});

