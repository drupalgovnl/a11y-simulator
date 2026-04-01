import {IDisabilitySimulation} from "../../interfaces/IDisabilitySimulation";
import {DyslexiaSimulation} from "./DyslexiaSimulation";


export class DyslexiaSpacesFunctionality extends DyslexiaSimulation implements IDisabilitySimulation {
    private spacesDictionary: Record<string, string> = {};

    onActivate(): void {
        const htmlWalker: TreeWalker = this.getTreeWalker();

        let node;
        while(node = htmlWalker.nextNode()) {
            const value: string | null = node.nodeValue;

            if(!value || value.trim().length === 0) {
                continue;
            }

            const omittedSpaces: string = value.replaceAll(" ", "");
            let toReturn: string = "";
            let justAddedSpace: boolean = false;

            for(let char of omittedSpaces.split("")) {
                const shouldAddSpace = this.shouldTrigger(100, 33);

                if((shouldAddSpace || char === ".") && (!justAddedSpace)) {
                    toReturn += char + " "
                    justAddedSpace = true;
                } else {
                    toReturn += char;
                    justAddedSpace = false;
                }
            }

            this.spacesDictionary[toReturn] = value;
            node.nodeValue = toReturn;
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

            if(this.spacesDictionary[value]) {
                node.nodeValue = this.spacesDictionary[value];
                delete(this.spacesDictionary[value])
            }

        }
    }

    onUpdate(value: string): void {
        throw new Error("Method not implemented.");
    }



}