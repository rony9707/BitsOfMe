import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { CloseButtonComponent } from "../../shared/svg/close-button/close-button.component";
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';
import { forgetPasswordConfig } from '../../shared/formConfig/forgetPassword.config';
import { IForm } from '../../shared/interface/form-interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CloseButtonComponent, DynamicFormComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgetPasswordComponent {

  @Input() username_email?: string | null;
  @Input() closeCompomponent?: () => void;
  @ViewChild('forgetPassword', { static: false }) forgetPassword?: ElementRef;
  forgetPasswordform = forgetPasswordConfig as IForm


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.forgetPassword && !this.forgetPassword.nativeElement.contains(event.target)) {
      this.closeComponentFunction()
    }
  }

  closeComponentFunction() {
    if (this.closeCompomponent) {
      this.closeCompomponent(); // Call the parent-provided destruction function
    }
  }

  formDATA($event:FormGroup){
    console.log($event)
  }
}
