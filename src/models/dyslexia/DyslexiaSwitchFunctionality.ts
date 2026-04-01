import {IDisabilitySimulation} from "../../interfaces/IDisabilitySimulation";
import {DyslexiaSimulation} from "./DyslexiaSimulation";


export class DyslexiaSwitchFunctionality extends DyslexiaSimulation implements IDisabilitySimulation {
    private switchDictionary: Record<string, string> = {};

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
                const shouldSwitch = this.shouldTrigger(100, 40);

                if(shouldSwitch) {
                    let newWord: string = "";

                    const maxIndex = word.length - 1;
                    const randomIndex1 = this.randomNumber(maxIndex);
                    const randomIndex2 = this.randomNumber(maxIndex);

                    const char1 = word[randomIndex1];
                    const char2 = word[randomIndex2];

                    for(let i = 0; i < word.length; i++) {
                        if(i === randomIndex1) {
                            newWord += char2;
                        } else if(i === randomIndex2) {
                            newWord += char1;
                        } else {
                            newWord += word[i];
                        }
                    }
                    newWords.push(newWord);
                } else {
                    newWords.push(word)
                }

            }

            const newValue = newWords.join(" ");
            this.switchDictionary[newValue] = value;
            node.nodeValue = newValue;
        }
    }

    onDeactivate(): void {
        const htmlWalker: TreeWalker = this.getTreeWalker();

        let node;
        while(node = htmlWalker.nextNode()) {
            const value: string | null = node.nodeValue;

            if (!value || value.trim().length === 0) {
                continue;
            }

            if(this.switchDictionary[value]) {
                node.nodeValue = this.switchDictionary[value];
                delete(this.switchDictionary[value])
            }

        }
    }

    onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }

}