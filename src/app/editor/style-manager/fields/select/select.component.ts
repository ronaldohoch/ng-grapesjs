import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
//material
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectChange } from '@angular/material/select';
import { MatSelect, MatOption } from '@angular/material/select';

@Component({
  selector: 'app-field-select',
  standalone: true,
  imports: [
    CommonModule,
    MatLabel, MatFormField, MatSelect, MatOption
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() prop: any;
  @Input() labelCls!: Function;

  toOptions() {
    return this.prop.getOptions().map((o: any) => ({ value: this.prop.getOptionId(o), text: this.prop.getOptionLabel(o) }))
  }

  handleSelectChange($event: MatSelectChange) {
    const value = $event.value;
    this.prop.upValue(value);
  }
}
