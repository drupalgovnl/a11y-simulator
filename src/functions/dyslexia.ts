//types of dyslexia

//1. d/p/b - m/w mirroring ✓
//2. dancing characters
//3. changing the order of words in sentence
//4. add new spaces, remove other spaces
//5. change location of letters in a word (without the dancing)

let mirrorActive: boolean = false;
const mirrorDictionary: Record<string, string> = {}

function shouldTrigger(max: number, chance: number): boolean {
    const number = Math.floor(Math.random() * max);
    console.log(number);
    return Math.floor(Math.random() * max) < chance;
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

export function mirrorChars() {
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
            let currWord = "";
            for (let char of word.split("")) {
                currWord += determineChar(char);
            }
            newWords.push(currWord);
        }

        const newValue = newWords.join(" ");

        mirrorDictionary[newValue] = value;
        node.nodeValue = newValue;
    }
}

export function unmirrorChars() {
    let node;

    const htmlWalker = getTreeWalker();

    while(node = htmlWalker.nextNode()) {
        const value: string | null = node.nodeValue;

        if(!value || value.trim().length === 0) {
            continue;
        }

        if(mirrorDictionary[value]) {
            node.nodeValue = mirrorDictionary[value];
            delete(mirrorDictionary[value])
        }
    }
}
