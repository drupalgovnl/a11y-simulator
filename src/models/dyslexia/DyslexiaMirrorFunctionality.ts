import {IDisabilitySimulation} from "../../interfaces/IDisabilitySimulation";
import {DyslexiaSimulation} from "./DyslexiaSimulation";


export class DyslexiaMirrorFunctionality extends DyslexiaSimulation implements IDisabilitySimulation {
    private mirrorDictionary: Record<string, string> = {};

    determineChar(char: string): string {
        // generates a number 0 or 1 whether option 1 or 2 should be triggered (=RANDOM)
        const triggerTrue: boolean = this.shouldTrigger(2, 1);

        switch(char) {
            case "b":
                return triggerTrue ? "d" : "p";
            case "d":
                return triggerTrue ? "b" : "p";
            case "p":
                return triggerTrue ? "d": "b";
            case "m":
                return "w";
            case "w":
                return "m";
            default:
                return char;
        }
    }

    onActivate(): void {
        let node;

        const htmlWalker = this.getTreeWalker();
        while(node = htmlWalker.nextNode()) {
            const value: string | null = node.nodeValue;

            if(!value || value.trim().length === 0) {
                continue;
            }

            const words: string[] = value.split(" ");
            const newWords: string[] = [];

            for(const word of words) {
                let currWord = "";
                for (let char of word.split("")) {
                    currWord += this.determineChar(char);
                }
                newWords.push(currWord);
            }

            const newValue = newWords.join(" ");
            this.mirrorDictionary[newValue] = value;
            node.nodeValue = newValue;
        }
    }

    onDeactivate(): void {
        let node;

        const htmlWalker = this.getTreeWalker();

        while(node = htmlWalker.nextNode()) {
            const value: string | null = node.nodeValue;

            if(!value || value.trim().length === 0) {
                continue;
            }

            if(this.mirrorDictionary[value]) {
                node.nodeValue = this.mirrorDictionary[value];
                delete(this.mirrorDictionary[value])
            }
        }
    }


    onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }



}