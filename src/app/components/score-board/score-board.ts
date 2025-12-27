import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { TextToMatch } from '../../shared/models/TextToMatch';
import { TextToMatchStatuses } from '../../shared/enums/TextToMatchStatuses';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './score-board.html',
  styleUrl: './score-board.css'
})
export class ScoreBoard {
  @Input() textsToMatch: TextToMatch[] = [];
  public TextToMatchStatuses = TextToMatchStatuses;
  public showDetails = false;

  get correctWords(): TextToMatch[] {
    return this.textsToMatch.filter(
      text => text.IsSubmitted && text.StatusId === TextToMatchStatuses.Correct
    );
  }

  get incorrectWords(): TextToMatch[] {
    return this.textsToMatch.filter(
      text => text.IsSubmitted && text.StatusId === TextToMatchStatuses.Incorrect
    );
  }

  get correctWordCounts(): Array<{ word: string; count: number }> {
    return this.getWordCounts(this.correctWords);
  }

  get incorrectWordCounts(): Array<{ word: string; count: number }> {
    return this.getWordCounts(this.incorrectWords);
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  private getWordCounts(words: TextToMatch[]): Array<{ word: string; count: number }> {
    const counts = new Map<string, number>();
    words.forEach(word => {
      counts.set(word.Word, (counts.get(word.Word) ?? 0) + 1);
    });

    return Array.from(counts.entries()).map(([word, count]) => ({ word, count }));
  }
}
