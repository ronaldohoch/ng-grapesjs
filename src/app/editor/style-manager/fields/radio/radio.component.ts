import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//material
import { MatRadioButton, MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
//components
import { FloatComponent } from '../../custom-fields/float/float.component';
import { PositionComponent } from '../../custom-fields/position/position.component';

@Component({
  selector: 'app-field-radio',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioButton, MatRadioModule, MatFormFieldModule,
    FloatComponent, MatIcon, MatButtonModule, PositionComponent
  ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent implements OnInit {
  @Input() prop: any;
  @Input() labelCls!: Function;

  handleRadioChange($event: MatRadioChange) {
    const value = $event.value;
    this.prop.upValue(value);
  }

  ngOnInit(): void {
    console.log('prop', this.prop);
  }
}
