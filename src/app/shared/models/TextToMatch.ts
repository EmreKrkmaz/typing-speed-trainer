import { TextToMatchStatuses } from "../enums/TextToMatchStatuses";

export class TextToMatch {
    Id: number;
    Word: string;
    StatusId: number; // 0: not attempted, 1: correct, 2: incorrect
    IsSubmitted: boolean = false;

    constructor(id: number, word: string, statusId: number) {
        this.Id = id;
        this.Word = word;
        this.StatusId = statusId;
    }

    static fromWords(words: string[]): TextToMatch[] {
        return words.map(word => {
            const textToMatch = new TextToMatch(this.getRandomId(), word, TextToMatchStatuses.Pending);
            textToMatch.IsSubmitted = false;
            return textToMatch;
        });
    }

    private static getRandomId(): number {
        return Math.floor(Math.random() * 9000000000) + 1000000000;
    }
}
