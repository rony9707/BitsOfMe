import { Component, ElementRef, EventEmitter, inject, OnInit, Output, signal, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { menuItems, emojis } from '../../../../shared/BitsOfLifeData/bits-data';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { AttachItemsComponent } from '../../../../shared/svg/attach-items/attach-items.component';
import { LoggerService } from '../../../../services/logger/logger.service';
import { CloseButtonComponent } from '../../../../shared/svg/close-button/close-button.component';
import { EmojiPickerComponent } from '../../../../shared/components/emoji-picker/emoji-picker.component';



@Component({
  selector: 'app-create-posts-content',
  standalone: true,
  imports: [FormsModule, 
    PickerModule, 
    CommonModule, 
    TooltipModule, 
    AttachItemsComponent, 
    CloseButtonComponent, 
    EmojiPickerComponent],
  templateUrl: './create-posts-content.component.html',
  styleUrl: './create-posts-content.component.css'
})
export class CreatePostsContentComponent implements OnInit {
  //Inject Services here
  private logger = inject(LoggerService)



  // Declare variables and signals
  selectBoxOptions = signal(menuItems);
  selectedOption = this.selectBoxOptions()[0].hobbie;
  message = signal('');
  imageURL = signal('');
  showEmojiPicker = signal(true);
  selectedFiles: File[] = [];

  //Output to sent to Parent
  @Output() postClicked = new EventEmitter<void>();
  @Output() postmessage = new EventEmitter<string>();
  @Output() selectedFilesChange = new EventEmitter<File[]>();
  @Output() selectedOptionChange = new EventEmitter<string>();


  // Array to store both images and their titles
  myImages: { uploadedImages: string; title: string }[] = [];

  ngOnInit(): void {
    this.emitSelectedOption();
  }


  //Appends the selected emoji in the textare
  addEmoji(event: any) {
    const emoji = event;
    this.message.update((currentMessage) => currentMessage + emoji);
    this.emitMessage();
  }

  //If focus on TextArea, the Emojpicket closes
  onFocus() {
    this.showEmojiPicker.set(false);
  }

  //If focus on TextArea, the Emojpicket op
  onBlur(): void {
    this.showEmojiPicker.set(true);
  }


  
  //Append the message
  onInput(event: any) {
    this.message.set(event.target.value);
    this.emitMessage();
  }
  

  //Adjust height of the textarea based on text written
  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '50px'; // Reset the height to measure the full content
    const newHeight = Math.max(50, Math.min(textarea.scrollHeight, 150));
    textarea.style.height = `${newHeight}px`;
  }



  // Handle image upload and store the image URL along with the title
  onImageUpload(event: any) {
    const files = event.target.files;
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

    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.selectedFiles = Array.from(input.files); // Convert FileList to Array
      this.emitSelectedFiles();
    } else {
      this.logger.log(`No Files Selected`, 'error')
    }
  }


  // Remove image method
  removeImage(imageUrl: string) {
    // Revoke the object URL to free memory
    URL.revokeObjectURL(imageUrl);

    // Find the image object to remove from myImages
    const imageToRemove = this.myImages.find((img) => img.uploadedImages === imageUrl);

    // Remove the image from the array
    this.myImages = this.myImages.filter((img) => img.uploadedImages !== imageUrl);
    this.selectedFiles = this.selectedFiles.filter((file) => file.name !== imageToRemove?.title);
    this.emitSelectedFiles();
  }

  uploadPost() {
    this.postClicked.emit();
  }

  public emitMessage() {
    this.postmessage.emit(this.message());
  }

  public emitSelectedFiles() {
    this.selectedFilesChange.emit(this.selectedFiles);
  }

  public emitSelectedOption() {
    this.selectedOptionChange.emit(this.selectedOption);
  }


}

