import {IDisabilitySimulation} from "../../interfaces/IDisabilitySimulation";
import {determineChar, getTreeWalker} from "../../functions/dyslexia";
import {DyslexiaSimulation} from "./DyslexiaSimulation";


export class DyslexiaMirrorFunctionality extends DyslexiaSimulation implements IDisabilitySimulation {
    private mirrorDictionary: Record<string, string> = {};

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
                    currWord += determineChar(char);
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