
buttonSwipped(event: any) {
  console.log("button swipped",event);
}

buttonSwipping(event: any) {
  console.log("button swipping",event);
}


<swipe-button (onButtonSwipped)="buttonSwipped($event)"   (onButtonSwipping)="buttonSwipping($event)"></swipe-button>
