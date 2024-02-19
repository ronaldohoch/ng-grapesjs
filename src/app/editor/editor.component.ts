import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
//material design
import {DragDropModule} from '@angular/cdk/drag-drop';
//editor's const
import { editorBlocks } from './blocks';
//pipes
import { SanitizePipe } from '../shared/pipes/sanitize.pipe';
//thirds
import { grapesjs, Editor, Block } from 'grapesjs';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    SanitizePipe,
    DragDropModule
  ],
  providers: [SanitizePipe],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  constructor(sanitizer:DomSanitizer) {

  }
  editor!: Editor;
  editorCustomBlocks!: Array<Block>;
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
      blockManager: {
        custom: true,
        blocks: editorBlocks,
      }
    })

    this.editor.on('load', () => {
      console.log('editor loaded')
    })



    this.editor.on('block:custom', (props) => {
      console.log('block:custom', props)
      this.editorCustomBlocks = props.blocks;
      this.editorCustomBlocksOnDragStart = function(block:any){
        console.log('editorCustomBlocksOnDragStart');
        props.dragStart(block);
      };
      this.editorCustomBlocksOnDragStop = function(block:any){
        console.log('editorCustomBlocksOnDragStop');
        props.dragStop(block);
      };
      // The `props` will contain all the information you need in order to update your UI.
      // props.blocks (Array<Block>) - Array of all blocks
      // props.dragStart (Function<Block>) - A callback to trigger the start of block dragging.
      // props.dragStop (Function<Block>) - A callback to trigger the stop of block dragging.
      // props.container (HTMLElement) - The default element where you can append your UI

      // Here you would put the logic to render/update your UI.
    });
  }
}
