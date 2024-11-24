import { Component,  signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { menuItems, emojis } from '../../../../shared/BitsOfLifeData/bits-data';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { AttachItemsComponent } from '../../../../shared/svg/attach-items/attach-items.component';



@Component({
  selector: 'app-create-posts-content',
  standalone: true,
  imports: [FormsModule, PickerModule, CommonModule, TooltipModule, AttachItemsComponent],
  templateUrl: './create-posts-content.component.html',
  styleUrl: './create-posts-content.component.css'
})
export class CreatePostsContentComponent {
  // Declare variables and signals
  selectBoxOptions = signal(menuItems);
  selectedOption = this.selectBoxOptions()[0].hobbie;
  message = signal('');
  imageURL = signal('');
  showEmojiPicker = signal(false);
  emojiButton = signal('😊');
  listOfEmojis = signal(emojis);
  uploadedImages: string[] = [];

  // Array to store both images and their titles
  myImages: { uploadedImages: string; title: string }[] = [];

  // Toggle emoji picker
  toggleEmojiPicker() {
    this.showEmojiPicker.update((value) => !value);
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native;
    this.message.update((currentMessage) => currentMessage + emoji);
  }

  onFocus() {
    this.showEmojiPicker.set(false);
  }

  emojiRandom() {
    let countOfEmoji = this.listOfEmojis().length;
    const randomNumber = Math.floor(Math.random() * (countOfEmoji - 1)); // 0 to 5
    this.emojiButton.set(this.listOfEmojis()[randomNumber]);
  }

  onInput(event: any) {
    this.message.set(event.target.value);
    console.log('Raw message:', this.message());
  }

  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '50px'; // Reset the height to measure the full content
    const newHeight = Math.max(50, Math.min(textarea.scrollHeight, 150));
    textarea.style.height = `${newHeight}px`;
  }

  get formattedMessage(): string {
    return this.embedLink(this.message()).replace(/\n/g, '<br>');
  }

  embedLink(text: string): string {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    text = text.replace(urlPattern, '<a href="$1" class="embedded-link" target="_blank">$1</a>');
    return text;
  }

  // Handle image upload and store the image URL along with the title
  onImageUpload(event: any) {
    const files = event.target.files;
    console.log(files);
    if (files && files.length > 0) {
      Array.from(files).forEach((file: any) => {
        // Create a URL for the uploaded file
        const imageUrl = URL.createObjectURL(file);
        const imageTitle = file.name

        // Create a new object with the image URL and a default title (you can modify this as needed)
        const imageObject = {
          uploadedImages: imageUrl,
          title: imageTitle 
        };

        // Push the image object to the array
        this.myImages.push(imageObject);
      });
    }
  }

  // Remove image method
  removeImage(imageUrl: string) {
    // Revoke the object URL to free memory
    URL.revokeObjectURL(imageUrl);

    // Remove the image from the array
    this.myImages = this.myImages.filter((img) => img.uploadedImages !== imageUrl);
  }
}

