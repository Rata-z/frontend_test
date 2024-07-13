import { Component, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  // @ViewChild(MatMenuTrigger)
  // trigger!: MatMenuTrigger;
  // someMethod() {
  //   this.trigger.openMenu();
  // }
}
