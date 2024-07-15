import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuSubjectsService } from '../../menu-subjects.service';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  ionChevronUp,
  ionChevronDown,
  ionChevronForward,
} from '@ng-icons/ionicons';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',

  providers: [
    provideIcons({
      ionChevronUp,
      ionChevronDown,
      ionChevronForward,
    }),
  ],
})
export class FooterComponent {
  menuVisible: boolean;
  iconVerticalSize: string;
  iconHorizontalSize: string;
  constructor(
    private _menuSubject: MenuSubjectsService,
    private _dataSubject: DataService
  ) {
    this.iconVerticalSize = '1.2rem';
    this.iconHorizontalSize = '0.8rem';
    this.menuVisible = false;
  }

  @Input() resetFunction!: () => void;

  triggerReset() {
    if (this.resetFunction) {
      this.resetFunction();
    }
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  changeNameVisibility(nameVisible: boolean) {
    this._menuSubject.changeNameVisibility(nameVisible);
    this.toggleMenu();
  }
  resetData() {
    this.triggerReset();
    this._menuSubject.changeNameVisibility(false);
    this._dataSubject.resetService();
    this.toggleMenu();
  }
}
