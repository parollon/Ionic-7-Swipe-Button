import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SwipeButtonComponent } from '../swipe-button-component/swipe-button.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,SwipeButtonComponent],
})
export class HomePage {

  constructor() {}

  buttonSwipped(event: any) {
    console.log("button swipped",event);
  }

}
