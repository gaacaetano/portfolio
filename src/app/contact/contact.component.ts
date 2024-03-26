import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  form = new FormGroup({
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  handleSendClick() {
    location.href = `mailto:gabrielcaetano@outlook.com?subject=${this.form.get('subject')?.value}&body=${this.form.get('message')?.value}`;
    this.form.reset();
  }
}
