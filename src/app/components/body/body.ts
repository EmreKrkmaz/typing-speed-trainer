import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
export class Body implements OnInit, AfterViewInit {
  @ViewChild('textBox', { static: true }) textBoxRef!: ElementRef<HTMLDivElement>;

  textsToMatch: TextToMatch[] = [];
  userTextInput: string = '';
  textsToMatchToDisplay: TextToMatch[] = [];

  maxLentghOfTextToDisplay: number = 0; // max number of words to display in text-box

  public TextToMatchStatuses = TextToMatchStatuses;

  private inputStart$ = new Subject<void>();
  public readonly startingOfTimer: number = 60;

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

  ngAfterViewInit(): void {
    this.updateDisplayFromFirstUnsubmitted();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateDisplayFromFirstUnsubmitted();
  }

  getTexts() {
    // depending on the character size, words will be adjusted into array and into text-box
    try {
      this.textsToMatch = TextToMatch.getDefaultWords();
      this.updateDisplayFromFirstUnsubmitted();
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

      const currentTextToMatch = this.textsToMatch.find(nextText => !nextText.IsSubmitted);
      if (!currentTextToMatch) {
        return;
      }

      if (this.isSpaceKey(event)) {
        return;
      }

      this.isTextBeenTypingCorrectly(currentTextToMatch);
    } catch (error) {
      console.error('Error handling key up event:', error);
    }
  }

  onSpace(event: any): void {
    try {
      event.preventDefault();
      this.startTimer();

      const currentTextToMatch = this.textsToMatch.find(nextText => !nextText.IsSubmitted);
      if (!currentTextToMatch) {
        return;
      }

      this.userTextInput = this.userTextInput.trim();
      this.onTextSubmit(currentTextToMatch);
    } catch (error) {
      console.error('Error handling space key event:', error);
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

      const allDisplayedSubmitted = this.textsToMatchToDisplay.every(text => text.IsSubmitted);
      if (allDisplayedSubmitted) {
        this.updateDisplayFromFirstUnsubmitted();
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
    this.updateDisplayFromFirstUnsubmitted();
  }

  setTextsToMatchToDisplay(startingIndex: number): TextToMatch[] {
    const maxToDisplay = this.getMaxWordsForStartIndex(startingIndex);
    return this.textsToMatch.slice(startingIndex, startingIndex + maxToDisplay);
  }

  startTimer() {
    this.inputStart$.next();
  }

  // stopTimer() {
  //   this.inputStart$.unsubscribe();
  // }

  private updateDisplayFromFirstUnsubmitted(): void {
    if (!this.textsToMatch.length) {
      this.textsToMatchToDisplay = [];
      return;
    }

    const startingIndex = this.textsToMatch.findIndex(text => !text.IsSubmitted);
    const safeIndex = startingIndex === -1 ? this.textsToMatch.length : startingIndex;
    this.textsToMatchToDisplay = this.setTextsToMatchToDisplay(safeIndex);
  }

  private getMaxWordsForStartIndex(startingIndex: number): number {
    const textBox = this.textBoxRef?.nativeElement;
    if (!textBox) {
      return this.maxLentghOfTextToDisplay;
    }

    const availableWidth = textBox.clientWidth;
    if (!availableWidth) {
      return this.maxLentghOfTextToDisplay;
    }

    const styles = getComputedStyle(textBox);
    const fontFamily = styles.fontFamily || 'sans-serif';
    const fontSize = '24px';
    const fontWeight = '700';
    const measurementCanvas = document.createElement('canvas');
    const context = measurementCanvas.getContext('2d');
    if (!context) {
      return this.maxLentghOfTextToDisplay;
    }

    context.font = `${fontWeight} ${fontSize} ${fontFamily}`;

    const marginX = 10;
    let widthSoFar = 0;
    let wordsToDisplay = 0;

    for (let i = startingIndex; i < this.textsToMatch.length; i += 1) {
      const wordWidth = context.measureText(this.textsToMatch[i].Word).width + marginX;
      if (wordsToDisplay === 0 && wordWidth > availableWidth) {
        wordsToDisplay = 1;
        break;
      }
      if (widthSoFar + wordWidth > availableWidth) {
        break;
      }
      widthSoFar += wordWidth;
      wordsToDisplay += 1;
    }

    return Math.max(wordsToDisplay, 1);
  }

  private isSpaceKey(event: KeyboardEvent): boolean {
    return event.key === ' ' || event.key === 'Spacebar' || event.code === 'Space';
  }

}
