import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { ColorComponent } from '../color/color.component';
import { DefaultComponent } from '../default/default.component';
import { FileComponent } from '../file/file.component';
import { NumberComponent } from '../number/number.component';
import { RadioComponent } from '../radio/radio.component';
import { SelectComponent } from '../select/select.component';
import { SliderComponent } from '../slider/slider.component';
import { StackComponent } from '../stack/stack.component';
import { ButtonComponent } from '../button/button.component';
import { Editor, Property } from 'grapesjs';

@Component({
  selector: 'app-property-fields',
  standalone: true,
  imports: [
    CommonModule,
    ColorComponent, DefaultComponent,
    FileComponent, NumberComponent, RadioComponent,
    SelectComponent, SliderComponent, StackComponent,
    ButtonComponent
  ],
  templateUrl: './property-fields.component.html',
  styleUrl: './property-fields.component.scss'
})
export class PropertyFieldsComponent {
  @Input() prop:any;
  @Input() editor!:Editor;

  labelCls(prop: Property) {
    const parent = prop.getParent();
    const hasParentValue = prop.hasValueParent() && (parent ? parent.isDetached() : true);

    return {
      'label-style-selected': prop.canClear(),
      'label-style-parent-selected': hasParentValue
    }
  }
}
