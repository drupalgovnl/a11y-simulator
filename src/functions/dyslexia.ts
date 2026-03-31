//types of dyslexia

//1. d/p/b - m/w mirroring ✓
//2. dancing characters
//3. changing the order of words in sentence
//4. add new spaces, remove other spaces
//5. change location of letters in a word (without the dancing)

let mirrorActive: boolean = false;
let spacesActive: boolean = false;
let switchFunctionalityActive: boolean = false;
let changeWordOrderActive: boolean = false;
const mirrorDictionary: Record<string, string> = {};
const spacesDictionary: Record<string, string> = {};
const switchDictionary: Record<string, string> = {};
const orderDictionary: Record<string, string> = {};

export function switchChars() {
    let node;

    const htmlWalker = getTreeWalker();
    while(node = htmlWalker.nextNode()) {
        const value: string | null = node.nodeValue;

        if(!value || value.trim().length === 0) {
            continue;
        }

        const words: string[] = value.split(" ");
        const newWords: string[] = [];

        for(const word of words) {
            const shouldSwitch = shouldTrigger(100, 40);

            if(shouldSwitch) {
                let newWord: string = "";

                const maxIndex = word.length - 1;
                const randomIndex1 = randomNumber(maxIndex);
                const randomIndex2 = randomNumber(maxIndex);

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
        switchDictionary[newValue] = value;
        node.nodeValue = newValue;
    }
}

export function unswitchChars() {
    const htmlWalker: TreeWalker = getTreeWalker();

    let node;
    while(node = htmlWalker.nextNode()) {
        const value: string | null = node.nodeValue;

        if (!value || value.trim().length === 0) {
            continue;
        }

        if(switchDictionary[value]) {
            node.nodeValue = switchDictionary[value];
            delete(switchDictionary[value])
        }

    }
}

export function switchFunctionality() {
    if(switchFunctionalityActive) {
        unswitchChars();
        switchFunctionalityActive = false;
    } else {
        switchChars();
        switchFunctionalityActive = true;
    }
}

function shouldTrigger(max: number, chance: number): boolean {
    return randomNumber(max) < chance;
}

function randomNumber(max: number) {
    return Math.floor(Math.random() * max);
}

export function mirrorFunctionality() {
    if(mirrorActive) {
        unmirrorChars();
        mirrorActive = false;
    } else {
        mirrorChars();
        mirrorActive = true;
    }
}

export function spacesFunctionality() {
    if(spacesActive) {
        unarrangeSpace();
        spacesActive = false;
    } else {
        arrangeSpaces();
        spacesActive = true;
    }
}

export function arrangeSpaces() {
    const htmlWalker: TreeWalker = getTreeWalker();

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
            const shouldAddSpace = shouldTrigger(100, 33);

            if((shouldAddSpace || char === ".") && (!justAddedSpace)) {
                toReturn += char + " "
                justAddedSpace = true;
            } else {
                toReturn += char;
                justAddedSpace = false;
            }
        }

        spacesDictionary[toReturn] = value;
        node.nodeValue = toReturn;
    }

}

export function unarrangeSpace() {
    const htmlWalker: TreeWalker = getTreeWalker();

    let node;
    while(node = htmlWalker.nextNode()) {
        const value: string | null = node.nodeValue;

        if (!value || value.trim().length === 0) {
            continue;
        }

        if(spacesDictionary[value]) {
            node.nodeValue = spacesDictionary[value];
            delete(spacesDictionary[value])
        }

    }
}

export function wordOrderFunctionality() {
    if(changeWordOrderActive) {
        undoChangeWordOrder();
        changeWordOrderActive = false;
    } else {
        changeWordOrder();
        changeWordOrderActive = true;
    }
}

export function changeWordOrder() {
    let node;

    const htmlWalker = getTreeWalker();
    while(node = htmlWalker.nextNode()) {
        const value: string | null = node.nodeValue;

        if(!value || value.trim().length === 0) {
            continue;
        }


        const words: string[] = value.split(" ");
        const randomWordIndex = randomNumber(words.length-1);
        const randomWordIndex2 = randomNumber(words.length-1);

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

        orderDictionary[newValue] = value;
        node.nodeValue = newValue;
    }
}

export function undoChangeWordOrder() {
    let node;

    const htmlWalker = getTreeWalker();

    while(node = htmlWalker.nextNode()) {
        const value: string | null = node.nodeValue;

        if(!value || value.trim().length === 0) {
            continue;
        }

        if(orderDictionary[value]) {
            node.nodeValue = orderDictionary[value];
            delete(orderDictionary[value])
        }
    }
}


export function getTreeWalker() {
    return document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
    )
}

export function determineChar(char: string): string {
    // generates a number 0 or 1 whether option 1 or 2 should be triggered (=RANDOM)
    const triggerTrue: boolean = shouldTrigger(2, 1);

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


