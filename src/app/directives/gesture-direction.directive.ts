import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appGestureDirection]',
})
export class GestureDirectionDirective {
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  private isMouseDown = false;

  @Output() swipeToLeft = new EventEmitter<void>();
  @Output() swipeToRight = new EventEmitter<void>();

  @HostListener('touchstart', ['$event'])
  onTouchStart(event) {
    const coord: [number, number] = [
      event.changedTouches[0].pageX,
      event.changedTouches[0].pageY,
    ];
    const time = new Date().getTime();
    this.swipeCoord = coord;
    this.swipeTime = time;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event) {
    const coord: [number, number] = [
      event.changedTouches[0].pageX,
      event.changedTouches[0].pageY,
    ];
    const time = new Date().getTime();
    const direction = [
      coord[0] - this.swipeCoord[0],
      coord[1] - this.swipeCoord[1],
    ];
    const duration = time - this.swipeTime;
    if (
      duration < 1000 &&
      Math.abs(direction[0]) > 30 &&
      Math.abs(direction[0]) > Math.abs(direction[1] * 3)
    ) {
      if (direction[0] < 0) {
        //next
        console.log('next (swipe to left)');
        this.swipeToLeft.next();
      } else {
        //previous
        console.log('previous (swipe to right)');
        this.swipeToRight.next();
      }
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    console.log('mouse = ', event);
    this.isMouseDown = true;
    const coord: [number, number] = [event.pageX, event.pageY];
    const time = new Date().getTime();
    this.swipeCoord = coord;
    this.swipeTime = time;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    if (!this.isMouseDown) {
      return;
    }
    console.log('mouse move = ', event.pageX);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any) {
    this.isMouseDown = false;

    const coord: [number, number] = [event.pageX, event.pageY];
    const time = new Date().getTime();
    const direction = [
      coord[0] - this.swipeCoord[0],
      coord[1] - this.swipeCoord[1],
    ];
    const duration = time - this.swipeTime;
    if (
      duration < 1000 &&
      Math.abs(direction[0]) > 30 &&
      Math.abs(direction[0]) > Math.abs(direction[1] * 3)
    ) {
      if (direction[0] < 0) {
        //next
        console.log('next (swipe to left)');
        this.swipeToLeft.next();
      } else {
        //previous
        console.log('previous (swipe to right)');
        this.swipeToRight.next();
      }
    }
  }
}
