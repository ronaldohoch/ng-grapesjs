import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-field-default',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, MatInputModule, MatIcon
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {
  @Input() prop:any;
  @Input() labelCls!:Function;

  handleChange($event: any) {
    const value = ($event.target as HTMLInputElement).value;
    this.prop.upValue(value);
  }
}
