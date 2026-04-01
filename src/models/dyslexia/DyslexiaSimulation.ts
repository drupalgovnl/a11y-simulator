export class DyslexiaSimulation {
    randomNumber(max: number): number {
        return Math.floor(Math.random() * max);
    }

    constructor() {}

    shouldTrigger(max: number, chance: number): boolean {
        return this.randomNumber(max) < chance;
    }

    getTreeWalker(): TreeWalker {
        return document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null
        )
    }
}