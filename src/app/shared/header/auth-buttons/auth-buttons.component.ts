import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/API/auth.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [RouterModule,AsyncPipe],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthButtonsComponent {

  public authService = inject(AuthService)

  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }

}
