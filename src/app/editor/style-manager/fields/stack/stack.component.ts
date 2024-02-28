import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-stack',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss'
})
export class StackComponent {
  @Input() prop:any;
  @Input() labelCls!:Function;
}
