interface Skrollr {
    get(): void;
    init(options): void;
}

interface SkrollrFactory {
    new (options): Skrollr;
    refresh(): void;
}

declare var skrollr: Skrollr;
 