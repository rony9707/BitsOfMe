import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-create-posts-header',
  standalone: true,
  imports: [AvatarModule,FormsModule,NgFor],
  templateUrl: './create-posts-header.component.html',
  styleUrl: './create-posts-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostsHeaderComponent implements OnInit{

  @Output() visibilityChange = new EventEmitter<string>();

  visibilityOptions = [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
  ];
  selectedVisibility = this.visibilityOptions[0].value; // Default to 'public'

  ngOnInit(): void {
      this.onVisibilityChange();
  }

  // Emit the selected visibility whenever it changes
  onVisibilityChange() {
    this.visibilityChange.emit(this.selectedVisibility);
  }

}
