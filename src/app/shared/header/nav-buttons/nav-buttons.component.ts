import { Component, EventEmitter, Output } from '@angular/core';
import { menuItems } from '../../BitsOfLifeData/bits-data';


@Component({
  selector: 'app-nav-buttons',
  standalone: true,
  imports: [],
  templateUrl: './nav-buttons.component.html',
  styleUrl: './nav-buttons.component.css'
})
export class NavButtonsComponent {

  //Declare objects to use in the DOM-----------------------------------------
  buttonList = menuItems
  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }

}
