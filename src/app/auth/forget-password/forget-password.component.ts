import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CloseButtonComponent } from "../../shared/svg/close-button/close-button.component";

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CloseButtonComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgetPasswordComponent {

  @Input() username_email?: string | null;
  @Input() closeCompomponent?: () => void;

  closeComponentFunction() {
    if (this.closeCompomponent) {
      this.closeCompomponent(); // Call the parent-provided destruction function
    }
  }
}
