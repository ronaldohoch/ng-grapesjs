import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//material
import { MatRadioButton, MatRadioChange, MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-field-radio',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioButton,MatRadioModule,
  ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent {
  @Input() prop:any;
  @Input() labelCls!:Function;

  handleRadioChange($event: MatRadioChange) {
    const value = $event.value;
    this.prop.upValue(value);
  }
}
