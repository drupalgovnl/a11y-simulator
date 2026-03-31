import {IDisabilitySimulation} from "../../interfaces/IDisabilitySimulation";

export class DyslexiaSimulation implements IDisabilitySimulation {

    constructor() {
    }

    getTreeWalker(): TreeWalker {
        return document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null
        )
    }

    onActivate(): void {
        const dyslexiaMenu: HTMLElement | null = document.getElementById('dyslexia-menu');
        console.log(dyslexiaMenu);
        console.log("awdawdawdawdawdawd")
    }

    onDeactivate(): void {
        const dyslexiaMenu: HTMLElement | null = document.getElementById('dyslexia-menu');
        console.log("123123123")
    }

    onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }

}