import { Component, HostListener, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionLogoHtml5 } from '@ng-icons/ionicons';
//import breakpoints

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [provideIcons({ ionLogoHtml5 })],
})
export class HeaderComponent implements OnInit {
  iconSize: string;

  constructor() {
    this.iconSize = '2.1rem';
  }

  ngOnInit(): void {
    if (window.innerWidth >= 960) this.iconSize = '3rem';
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    window.innerWidth >= 960
      ? (this.iconSize = '3rem')
      : (this.iconSize = '2.1rem');
  }
}
