import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { IonContent, IonText,  IonIcon, IonFabButton,  IonButton,  IonCardContent, IonCardTitle, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'swipe-button',
  templateUrl: './swipe-button.component.html',
  styleUrls: ['./swipe-button.component.scss'],
  standalone: true,
  imports: [ IonRow, IonCol, IonCardContent, IonCardTitle, IonContent, IonIcon, IonFabButton, IonButton,IonText],
})
export class SwipeButtonComponent {
  @Output() onButtonSwipped = new EventEmitter<any>();
  @ViewChild('swipeButton', { read: ElementRef }) swipeButton!: ElementRef;
  @ViewChild('swipeContainer', { read: ElementRef }) swipeContainer!: ElementRef;

  color = 'primary';
  text = 'Swipe';

  swipeInProgress = false;
  //colWidth!: number;
  translateX!: number;

  maxTranslate!: number;
  startX!: number;

  constructor() {}

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    const swipeContainerStyles = window.getComputedStyle(this.swipeContainer.nativeElement);
    const buttonWidth = this.swipeButton.nativeElement.offsetWidth;
    const padding = parseFloat(swipeContainerStyles.paddingLeft) + parseFloat(swipeContainerStyles.paddingRight);
    const trackButtonWidth = this.swipeContainer.nativeElement.offsetWidth -padding ;
  
    this.swipeInProgress = true;
    this.maxTranslate = trackButtonWidth- buttonWidth;
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.swipeInProgress) {
      
      const deltaX = event.touches[0].clientX;
      //console.log('deltax: ', deltaX);
      // this.colWidth = this.swipeButton.nativeElement.parentElement.clientWidth;
      // console.log('colWidth: ', this.colWidth);
      const diffX = deltaX - this.startX;
      this.translateX = Math.max(0, Math.min(this.maxTranslate, diffX));
      //console.log('translatex: ', this.translateX);
      this.swipeButton.nativeElement.style.transform = `translateX(${this.translateX}px)`;
    }
  }

  @HostListener('touchend', ['$event'])
  async onTouchEnd(event: TouchEvent) {
    if(this.translateX >= this.maxTranslate *0.9) {
      this.onButtonSwipped.emit({completed: true});
      this.text = 'Swiped';
      this.color = 'success';
      await this.delay(800);
      this.text = 'Swipe';
      this.color = 'primary';
    }else{ this.onButtonSwipped.emit({completed: false});   }
    this.swipeInProgress = false;
    this.translateX = 0;
    this.swipeButton.nativeElement.style.transform = 'translateX(0)';
  }
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
