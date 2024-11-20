import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.css'
})
export class AuthButtonsComponent {
  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }
}
