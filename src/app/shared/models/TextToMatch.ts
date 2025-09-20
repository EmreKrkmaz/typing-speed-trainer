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

    static getDefaultWords(): TextToMatch[] {
        return [
            new TextToMatch(this.getRandomId(), "çiçek", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "gölge", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "rüzgâr", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "deniz", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "kırlangıç", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "ayak", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "kitap", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "toprak", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "yıldız", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "düşünce", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "bardak", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "ağaç", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "yol", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "kalem", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "kuş", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "taş", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "umut", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "çatı", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "ses", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "balık", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "çiçek", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "gölge", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "rüzgâr", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "deniz", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "rüzgâr", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "deniz", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "kırlangıç", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "ayak", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "kitap", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "toprak", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "yıldız", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "düşünce", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "bardak", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "ağaç", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "yol", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "kalem", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "kuş", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "taş", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "umut", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "çatı", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "ses", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "balık", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "çiçek", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "gölge", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "rüzgâr", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "deniz", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "rüzgâr", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "deniz", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "kırlangıç", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "ayak", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "kitap", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "toprak", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "yıldız", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "düşünce", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "bardak", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "ağaç", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "yol", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "kalem", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "kuş", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "taş", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "umut", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "çatı", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "ses", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "balık", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "çiçek", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "gölge", TextToMatchStatuses.Pending),
            new TextToMatch(this.getRandomId(), "rüzgâr", TextToMatchStatuses.Pending), new TextToMatch(this.getRandomId(), "deniz", TextToMatchStatuses.Pending)
        ]
    }

    private static getRandomId(): number {
        return Math.floor(Math.random() * 9000000000) + 1000000000;
    }
}