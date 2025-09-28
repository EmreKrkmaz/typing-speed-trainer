import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'; // Add this import
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TextToMatch } from '../../shared/models/TextToMatch';
import { TextToMatchStatuses } from '../../shared/enums/TextToMatchStatuses';
import { exhaustMap, interval, map, Observable, shareReplay, startWith, Subject, takeWhile, } from 'rxjs';
import { ScoreBoard } from '../score-board/score-board';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [NgForOf, FormsModule, NgClass, AsyncPipe, ScoreBoard, NgIf], // Add NgForOf here
  templateUrl: './body.html',
  styleUrls: ['./body.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Body implements OnInit {
  textsToMatch: TextToMatch[] = [];
  userTextInput: string = '';
  textsToMatchToDisplay: TextToMatch[] = [];

  maxLentghOfTextToDisplay: number = 3; // max number of words to display in text-box

  public TextToMatchStatuses = TextToMatchStatuses;

  private inputStart$ = new Subject<void>();
  public readonly startingOfTimer: number = 5;

  public remaining$?: Observable<number> = this.inputStart$.pipe(
    exhaustMap(() =>
      interval(1000).pipe(
        map(i => this.startingOfTimer - (i + 1)),
        startWith(this.startingOfTimer),
        takeWhile(v => v > 0, true)
      )
    ),
    startWith(this.startingOfTimer),
    shareReplay({ bufferSize: 1, refCount: true })
  );;
  // continue with displaying 60 at the start until user first input a text

  constructor() { }

  ngOnInit(): void {
    this.getTexts();
  }

  getTexts() {
    // depending on the character size, words will be adjusted into array and into text-box
    try {
      this.textsToMatch = TextToMatch.getDefaultWords();
      this.textsToMatchToDisplay = this.setTextsToMatchToDisplay(0);
    } catch (error) {
      console.error('Error fetching texts:', error);
    }
  }

  setTimersInitals() {
    this.remaining$ = this.inputStart$.pipe(
      exhaustMap(() =>
        interval(1000).pipe(
          map(i => this.startingOfTimer - (i + 1)),
          startWith(this.startingOfTimer),
          takeWhile(v => v > 0, true)
        )
      ),
      startWith(this.startingOfTimer),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  onKeyUp(event: KeyboardEvent): void {
    try {

      this.startTimer();

      let currentTextToMatch: TextToMatch = this.textsToMatch.find(nextText => !nextText.IsSubmitted)!;

      this.isTextBeenTypingCorrectly(currentTextToMatch);

      if (event.key === ' ') {
        this.onTextSubmit(currentTextToMatch);
      }
    } catch (error) {
      console.error('Error handling key up event:', error);
    }
  }

  isTextBeenTypingCorrectly(currentTextToMatch: TextToMatch) {
    try {

      // reset to pending status if input text is empty
      if (this.userTextInput === '' || !this.userTextInput) {
        this.userTextInput = '';
        currentTextToMatch.StatusId = TextToMatchStatuses.Pending;
        return;
      }

      // marks texts as red if incorrect
      if (this.userTextInput && !currentTextToMatch.Word.startsWith(this.userTextInput.trim())) {
        currentTextToMatch.StatusId = TextToMatchStatuses.Incorrect;
      }
      else {
        currentTextToMatch.StatusId = TextToMatchStatuses.Pending;
      }

    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  onTextSubmit(currentTextToMatch: TextToMatch) {
    try {
      // if input text is blank, clear input text and exit function
      if (this.userTextInput.trim() == '') {
        this.userTextInput = '';
        currentTextToMatch.StatusId = TextToMatchStatuses.Pending;
        return;
      }

      if (this.userTextInput.trim() == currentTextToMatch.Word) {
        currentTextToMatch.StatusId = TextToMatchStatuses.Correct;
      }
      else {
        currentTextToMatch.StatusId = TextToMatchStatuses.Incorrect;
      }

      currentTextToMatch.IsSubmitted = true;
      this.userTextInput = '';

      let sumOfSubmittedTexts = this.textsToMatchToDisplay.reduce((sum, text) => text.IsSubmitted ? sum + 1 : sum, 0);
      if (sumOfSubmittedTexts == this.maxLentghOfTextToDisplay) {
        this.textsToMatchToDisplay = this.setTextsToMatchToDisplay(this.textsToMatch.indexOf(currentTextToMatch) + 1);
      }

    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  refresh() {
    // this.stopTimer();
    this.userTextInput = '';
    this.getTexts();
    this.setTimersInitals();
  }

  setTextsToMatchToDisplay(startingIndex: number): TextToMatch[] {
    return this.textsToMatch.slice(startingIndex, startingIndex + this.maxLentghOfTextToDisplay);
  }

  startTimer() {
    this.inputStart$.next();
  }

  // stopTimer() {
  //   this.inputStart$.unsubscribe();
  // }

}
