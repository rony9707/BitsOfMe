import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { emojis } from '../../BitsOfLifeData/bits-data';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-emoji-picker',
  standalone: true,
  imports: [PickerComponent, CommonModule],
  templateUrl: './emoji-picker.component.html',
  styleUrl: './emoji-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmojiPickerComponent implements OnChanges {

  @Output() emojiSelected = new EventEmitter<string>();
  @Input() isTextareaFocused: boolean = false;

  showEmojiPicker = signal(false);
  emojiButton = signal('😊');
  listOfEmojis = signal(emojis);
  message = signal(''); // Signal initialized as a string


  @ViewChild('emojiPicker', { static: false }) emojiPicker?: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isTextareaFocused'] && !changes['isTextareaFocused'].currentValue) {
      const isTextareaFocused = changes['isTextareaFocused'].currentValue
      this.showEmojiPicker.set(isTextareaFocused)
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showEmojiPicker() && this.emojiPicker && !this.emojiPicker.nativeElement.contains(event.target)) {
      this.showEmojiPicker.set(false)
    }
  }

  toggleEmojiPicker() {
    this.showEmojiPicker.update((value) => !value);
  }

  emojiRandom() {
    const countOfEmoji = this.listOfEmojis().length;
    const randomNumber = Math.floor(Math.random() * countOfEmoji);
    this.emojiButton.set(this.listOfEmojis()[randomNumber]);
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native;
    this.emojiSelected.emit(emoji);
  }
}
