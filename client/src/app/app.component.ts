import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ParserComponent } from './layout/parser/parser.component';
import { DataService } from './data.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonModule } from '@angular/common';

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

  constructor(private _dataObject: DataService) {
    this.selectedOption = '';
    this.errorMessage = null;
    this.errorMessageListener = null;
    this.alertVisible = false;
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
    this.triggerAllert();
  }
  pushObject(id: string) {
    this._dataObject.addDataObject(id);
    this.resetForm();
    this.triggerAllert();
  }
  triggerAllert() {
    if (!this.alertVisible && this.errorMessageListener) {
      this.errorMessage = this.errorMessageListener;
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 3600);
    }
  }
}
