import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-close-button',
  standalone: true,
  imports: [],
  templateUrl: './close-button.component.html',
  styleUrl: './close-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloseButtonComponent {

  @Input()fillColor?: string|null
}
