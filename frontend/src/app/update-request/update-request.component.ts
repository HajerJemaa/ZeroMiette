
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestService } from '../services/request.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
})
export class UpdateRequestComponent {
  @Input() request: any;
  @Input() userId!: string;
  @Output() updateDone = new EventEmitter<void>();
  @Output() cancelUpdate = new EventEmitter<void>();

  form:FormGroup;

  constructor(private fb: FormBuilder, private requestService: RequestService) {
    this.form = this.fb.group({
      description: [''],
      quantity: ['']
    });
  }

  ngOnChanges() {
    if (this.request) {
      this.form.patchValue({
        description: this.request.description,
        quantity: this.request.quantity
      });
    }
  }

  submit() {
    const updatedData = {
      annCode: this.request.annCode,
      userId: Number(this.userId),
      description: this.form.value.description,
      quantity: Number(this.form.value.quantity)
    };

    this.requestService.updateRequest(updatedData).subscribe({
      next: () => this.updateDone.emit(),
      error: () => alert("Erreur lors de la mise à jour")
    });
  }

  cancel() {
    this.cancelUpdate.emit();
  }
}
