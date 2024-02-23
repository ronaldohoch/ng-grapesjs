import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
//Thirds
import { Editor, Property, Sector } from 'grapesjs';
//components
import { ColorComponent } from './fields/color/color.component';
import { CompositeComponent } from './fields/composite/composite.component';
import { DefaultComponent } from './fields/default/default.component';
import { FileComponent } from './fields/file/file.component';
import { NumberComponent } from './fields/number/number.component';
import { RadioComponent } from './fields/radio/radio.component';
import { SelectComponent } from './fields/select/select.component';
import { SliderComponent } from './fields/slider/slider.component';
import { StackComponent } from './fields/stack/stack.component';

@Component({
  selector: 'app-style-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatRadioModule, MatSliderModule,

    ColorComponent, CompositeComponent, DefaultComponent,
    FileComponent, NumberComponent, RadioComponent,
    SelectComponent, SliderComponent, StackComponent
  ],
  templateUrl: './style-manager.component.html',
  styleUrl: './style-manager.component.scss'
})
export class StyleManagerComponent {
  @Input() Sectors!: Sector[];
  @Input() editor!:Editor;

  labelCls(prop: Property) {
    const parent = prop.getParent();
    const hasParentValue = prop.hasValueParent() && (parent ? parent.isDetached() : true);

    return {
      'label-style-selected': prop.canClear(),
      'label-style-parent-selected': hasParentValue
    }
  }
  inputValue(prop: Property) {
    return prop.hasValue() ? prop.getValue() : '';
  }
  propName(prop: Property) {
    return prop.getName();
  }
  propType(prop: Property) {
    return prop.getType();
  }
  defValue(prop: Property) {
    return prop.getDefaultValue();
  }
  toOptions(prop: any) {
    return prop.getOptions().map((o: any) => ({ value: prop.getOptionId(o), text: prop.getOptionLabel(o) }))
  }
  getRawOptions(prop: any) {
    return prop.getOptions();
  }
  getOptionId(prop: any, id: string) {
    return prop.getOptionId(id);
  }
  getOptionLabel(prop: any, id: string) {
    return prop.getOptionLabel(id);
  }
  getMin(prop: any) { return prop.getMin(); }
  getMax(prop: any) { return prop.getMax(); }
  getStep(prop: any) { return prop.getStep(); }
  getValue(prop: any) { return prop.getValue(); }


  colorChange($event: any, prop: any) {
    console.log($event.target.value, prop);
    prop.upValue($event.target.value);
  }
  openAssets(prop: any) {
    const { Assets } = this.editor;
    Assets.open({
      select: (asset, complete) => {
        console.log("select", prop, asset, complete);
        prop.upValue(asset.getSrc());
        complete && Assets.close();
      },
      types: ['image'],
      accept: 'image/*',
    })
  }
  CHECKVALUES($event: any, prop: any) {
    console.log($event, prop);
  }

  showProp(prop: Property) {
    console.log(prop);
    console.log('toOptions', this.toOptions(prop))
  }
}
