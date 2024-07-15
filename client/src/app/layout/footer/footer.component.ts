import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuSubjectsService } from '../../menu-subjects.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  menuVisible: boolean;
  constructor(private _menuSubject: MenuSubjectsService) {
    this.menuVisible = false;
  }
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  changeNameVisibility(nameVisible: boolean) {
    this._menuSubject.changeNameVisibility(nameVisible);
    this.toggleMenu();
  }
  resetData() {
    this._menuSubject.changeNameVisibility(false);
    this.toggleMenu();
  }
}
