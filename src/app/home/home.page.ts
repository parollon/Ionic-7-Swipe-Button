import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {

  @ViewChild('swipeButton', { read: ElementRef }) swipeButton!: ElementRef;
  @ViewChild('swipeContainer', { read: ElementRef }) swipeContainer!: ElementRef;

  color = 'primary';
  text = 'Swipe';

  swipeInProgress = false;
  colWidth!: number;
  translateX!: number;

  maxTranslate!: number;
  startX!: number;

  constructor() {}

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    const computedStyle = window.getComputedStyle(this.swipeContainer.nativeElement);
    const buttonWidth = this.swipeButton.nativeElement.offsetWidth;
    const padding = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    const trackButtonWidth = this.swipeContainer.nativeElement.offsetWidth -padding ;
  
    this.swipeInProgress = true;
    this.maxTranslate = trackButtonWidth- buttonWidth;
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.swipeInProgress) {
      const deltaX = event.touches[0].clientX;
      console.log('deltax: ', deltaX);
      // this.colWidth = this.swipeButton.nativeElement.parentElement.clientWidth;
      // console.log('colWidth: ', this.colWidth);
      const diffX = deltaX - this.startX;
      this.translateX = Math.max(0, Math.min(this.maxTranslate, diffX));
      console.log('translatex: ', this.translateX);
      this.swipeButton.nativeElement.style.transform = `translateX(${this.translateX}px)`;
    }
  }

  @HostListener('touchend', ['$event'])
  async onTouchEnd(event: TouchEvent) {
    console.log(event);
    if(this.translateX >= this.maxTranslate *0.9) {
      console.log('swiped');
      this.text = 'Swiped';
      this.color = 'success';
      await this.delay(800);
      this.text = 'Swipe';
      this.color = 'primary';
    }
    this.swipeInProgress = false;
    this.swipeButton.nativeElement.style.transform = 'translateX(0)';
  }
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
