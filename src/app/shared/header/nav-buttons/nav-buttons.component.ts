import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { menuItems } from '../../BitsOfLifeData/bits-data';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav-buttons',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-buttons.component.html',
  styleUrl: './nav-buttons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavButtonsComponent {

  //Declare objects to use in the DOM-----------------------------------------
  buttonList = signal(menuItems)
  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  //Inject Services here------------------------------------------------------
  private router = inject(Router)

  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }

  goToMusic():void{
    this.router.navigate(['/music']);
  }

}
