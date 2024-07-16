import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService, DataType } from '../../data.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit {
  json: DataType[];
  focusedId: number | null;
  cols: string;

  newValue: string;
  constructor(private _dataObject: DataService) {
    this.json = [];
    this.newValue = '';

    this.focusedId = null;
    this.cols = '28';
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    window.innerWidth >= 960 ? (this.cols = '45') : (this.cols = '28');
  }

  saveCurrentStatus() {
    localStorage.setItem('jsonObject', JSON.stringify(this.json));
    this._dataObject.fetchData();
  }
  selectObject(content: string, id: number) {
    this.newValue = content;
    this.focusedId = id;
  }
  cancelEdit() {
    this.newValue = '';
    this.focusedId = null;
  }
  deleteContent(id: number) {
    this.json = this.json.filter((item) => item.id !== id);
    this.newValue = '';
    this.focusedId = null;
    this.saveCurrentStatus();
  }
  addContent(content: string) {
    const newObject: DataType = { id: Date.now(), body: content };
    this.json.push(newObject);
    this.newValue = '';
    this.saveCurrentStatus();
  }
  acceptEdit(content: string, id: number) {
    const object = this.json.find((item) => item.id === id);
    console.log(object);
    if (object) {
      object.body = content;
      this.saveCurrentStatus();
    }
    this.newValue = '';
    this.focusedId = null;
  }
  @Output() close = new EventEmitter<void>();
  closeEditor() {
    this.close.emit();
  }

  ngOnInit() {
    const data = localStorage.getItem('jsonObject');
    if (data) this.json = JSON.parse(data);
    if (window.innerWidth >= 960) this.cols = '45';
  }
}
