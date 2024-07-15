import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionLogoHtml5 } from '@ng-icons/ionicons';

import { Subscription } from 'rxjs';
import { MenuSubjectsService } from '../../menu-subjects.service';
//import breakpoints

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [provideIcons({ ionLogoHtml5 })],
})
export class HeaderComponent implements OnInit, OnDestroy {
  iconSize: string;
  nameSubscription!: Subscription;
  isNameVisible: boolean;

  constructor(private _menuSubject: MenuSubjectsService) {
    this.iconSize = '2.1rem';
    this.isNameVisible = false;
  }

  ngOnInit() {
    this.nameSubscription = this._menuSubject.nameVisible$.subscribe(
      (visibility) => (this.isNameVisible = visibility)
    );
    if (window.innerWidth >= 960) this.iconSize = '3rem';
  }
  ngOnDestroy(): void {
    this.nameSubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    window.innerWidth >= 960
      ? (this.iconSize = '3rem')
      : (this.iconSize = '2.1rem');
  }
}
