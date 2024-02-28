import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-field-color',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIcon
  ],
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss'
})
export class ColorComponent {
  @Input() prop:any;
  @Input() labelCls!:Function;

  colorChange($event: any) {
    // console.log($event.target.value, this.prop);
    this.prop.upValue($event.target.value);
  }
}
