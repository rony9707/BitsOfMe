import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DividerComponent {
  @Input() text: string | null = null;
}
