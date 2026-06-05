export class ProhibitedWord {
    constructor(
        readonly id: string,
        readonly word: string,
        readonly category: string,
        readonly createdAt: Date,
    ) {}
}
