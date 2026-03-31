export interface IDisabilitySimulation {
    onActivate(): void;
    onDeactivate(): void;
    onUpdate(value: string): void;
}