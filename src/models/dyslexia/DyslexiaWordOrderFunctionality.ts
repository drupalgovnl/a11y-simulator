import {IDisabilitySimulation} from "../../interfaces/IDisabilitySimulation";
import {DyslexiaSimulation} from "./DyslexiaSimulation";

export class DyslexiaWordOrderFunctionality extends DyslexiaSimulation implements IDisabilitySimulation {
    private orderDictionary: Record<string, string> = {};

    onActivate(): void {
        let node;

        const htmlWalker = this.getTreeWalker();
        while(node = htmlWalker.nextNode()) {
            const value: string | null = node.nodeValue;

            if(!value || value.trim().length === 0) {
                continue;
            }

            const words: string[] = value.split(" ");
            const randomWordIndex = this.randomNumber(words.length-1);
            const randomWordIndex2 = this.randomNumber(words.length-1);

            const newWords: string[] = [];

            for(let i = 0; i<words.length; i++) {
                if(i === randomWordIndex) {
                    newWords.push(words[randomWordIndex2]);
                } else if(i === randomWordIndex2) {
                    newWords.push(words[randomWordIndex]);
                } else {
                    newWords.push(words[i]);
                }
            }

            const newValue = newWords.join(" ");

            this.orderDictionary[newValue] = value;
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

            if(this.orderDictionary[value]) {
                node.nodeValue = this.orderDictionary[value];
                delete(this.orderDictionary[value])
            }
        }
    }

    onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }
}