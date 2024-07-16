import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ParserComponent } from './layout/parser/parser.component';
import { DataService } from './data.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './layout/editor/editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
    ParserComponent,
    EditorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  selectedOption: string;
  errorMessageListener: string | null;
  errorMessage: string | null;
  jsonSubscription!: Subscription;
  alertVisible: boolean;
  isEditorOpen: boolean;

  constructor(private _dataObject: DataService) {
    this.selectedOption = '';
    this.errorMessage = null;
    this.errorMessageListener = null;
    this.alertVisible = false;
    this.isEditorOpen = false;
  }
  resetForm() {
    this.selectedOption = '';
  }

  ngOnInit() {
    this.jsonSubscription = this._dataObject.errorMessage$.subscribe(
      (data) => (this.errorMessageListener = data)
    );
  }

  replaceObject(id: string) {
    this._dataObject.replaceObject(id);
    this.resetForm();
    this.triggerAlert();
  }
  pushObject(id: string) {
    this._dataObject.addDataObject(id);
    this.resetForm();
    this.triggerAlert();
  }
  triggerAlert() {
    if (!this.alertVisible && this.errorMessageListener) {
      this.errorMessage = this.errorMessageListener;
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 3500);
    }
  }
  handleOpenEditor() {
    this.isEditorOpen = true;
  }
  handleEditorClose() {
    this.isEditorOpen = false;
  }
}
