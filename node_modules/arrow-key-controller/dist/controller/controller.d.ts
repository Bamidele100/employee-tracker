export declare class Controller {
    private keys;
    readonly up: boolean;
    readonly down: boolean;
    readonly right: boolean;
    readonly left: boolean;
    init(): void;
    onKeyDown(event: KeyboardEvent): void;
    onKeyUp(event: KeyboardEvent): void;
}
