import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { menuItems } from '../../../../shared/BitsOfLifeData/bits-data';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@Component({
  selector: 'app-create-posts-content',
  standalone: true,
  imports: [FormsModule,PickerModule],
  templateUrl: './create-posts-content.component.html',
  styleUrl: './create-posts-content.component.css'
})
export class CreatePostsContentComponent {
  // message: string = '';

  //Declare objects to use in the DOM-----------------------------------------
  selectBoxOptions = menuItems

  selectedOption = this.selectBoxOptions[0].hobbie

  // addEmoji(event: any) {
  //   this.message += event.emoji.native; // Add selected emoji to the message
  // }


  name = 'Angular';
  message = '';
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
        this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event:any) {
    console.log(this.message)
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`)
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }
}
