import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-create-posts-header',
  standalone: true,
  imports: [AvatarModule,FormsModule,NgFor],
  templateUrl: './create-posts-header.component.html',
  styleUrl: './create-posts-header.component.css'
})
export class CreatePostsHeaderComponent{

  visibilityOptions = [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
  ];
  selectedVisibility = this.visibilityOptions[0].value; // Default to 'public'

}
