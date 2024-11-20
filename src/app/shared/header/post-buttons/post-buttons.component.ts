import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-buttons',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './post-buttons.component.html',
  styleUrl: './post-buttons.component.css'
})
export class PostButtonsComponent {
  @Output() closeSidebarEvent = new EventEmitter
  
  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }
}
