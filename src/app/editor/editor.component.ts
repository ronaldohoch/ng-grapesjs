import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
//material design
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
//editor's const
import { blockManager, styleManager } from './editorConfig';
//pipes
import { SanitizePipe } from '../shared/pipes/sanitize.pipe';
import { PipeObjectKeysPipe } from '../shared/pipes/pipe-object-keys.pipe'
//services
import { UtilsService } from './services/utils.service';
//thirds
import { grapesjs, Editor, Block, Sector, Property, PropertySelect } from 'grapesjs';
//standalone components

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    SanitizePipe,
    PipeObjectKeysPipe,
    MatRippleModule, MatExpansionModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatRadioModule
  ],
  providers: [
    SanitizePipe,
    PipeObjectKeysPipe,
    UtilsService
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  editor!: Editor;
  @ViewChild('blocksWrapper') blocksWrapper!: ElementRef;
  constructor(
    private utilSvc: UtilsService,
    private cdr: ChangeDetectorRef,
  ) {

  }

  editorCustomBlocks!: Array<Block>;
  editorCustomBlocksCategorys!: { [key: string]: any[] };
  editorCustomBlocksOnDragStart!: Function;
  editorCustomBlocksOnDragStop!: Function;
  ngOnInit(): void {

    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: '100%',
      width: 'auto',
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      // panels: { defaults: [] },
      styleManager,
      // panels,
      blockManager
    })

    this.editor.on('load', this.editorLoad)

    this.editor.on('block:custom', (props) => {
      this.editorBlockCustom(props);
    });

    this.editor.on('style:custom', props => {
      this.editorStyleCustom(props);
    });
  }

  editorLoad() {
  }

  editorBlockCustom(props: any): void {
    this.editorCustomBlocks = props.blocks;
    this.editorCustomBlocksCategorys = this.utilSvc.groupByCategory(props.blocks);
    console.log(this.utilSvc.groupByCategory(props.blocks));
    this.editorCustomBlocksOnDragStart = function (block: any) {
      props.dragStart(block);
    };
    this.editorCustomBlocksOnDragStop = function (block: any) {
      props.dragStop(block);
    };
    props.container.append(this.blocksWrapper.nativeElement);
  }

  editorCustomStyleManagerSectors!: Sector[];
  @ViewChild('styleManagerWrapper') styleManagerWrapper!: ElementRef;
  editorStyleCustom(props: any): void {
    this.editorCustomStyleManagerSectors = this.editor.StyleManager.getSectors({ visible: true });
    props.container.append(this.styleManagerWrapper.nativeElement);
    this.cdr.detectChanges();

    // props.container (HTMLElement)
    //    The default element where you can append your
    //    custom UI in order to render it in the default position.

    // Here you would put the logic to render/update your UI by relying on Style Manager API
  }
  // labelCls(prop: Property) {
  //   const parent = prop.getParent();
  //   const hasParentValue = prop.hasValueParent() && (parent ? parent.isDetached() : true);
  //   return ['flex-nowrap', prop.canClear() && 'indigo--text text--accent-1', hasParentValue && 'orange--text'];
  // }
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
  toOptions(prop: PropertySelect) {
    return prop.getOptions().map(o => ({ value: prop.getOptionId(o), text: prop.getOptionLabel(o) }))
  }
  getRawOptions(prop:any){
    return prop.getOptions();
  }
  getOptionId(prop:any, id:string){
    return prop.getOptionId(id);
  }
  getOptionLabel(prop:any, id:string){
    return prop.getOptionLabel(id);
  }

  handleChange($event: Event, prop: Property) {
    const value = ($event.target as HTMLInputElement).value;
    prop.upValue(value);
  }
  handleRadioChange($event: MatRadioChange, prop: Property) {
    const value = $event.value;
    prop.upValue(value);
  }
  handleNumberChange($event: Event, prop: Property) {
    const value = ($event.target as HTMLInputElement).value;
    console.log($event, prop);
    prop.upValue(value);
  }
}
