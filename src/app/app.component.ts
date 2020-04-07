import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';
import { DebounceTime } from './decorator/debounce.decorator';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit {
  @Input('isAutoPlay') isAutoPlay = false;
  @Input('autoPlayDirection') playDirection: 'right' | 'left' = 'right';

  items = [1,2,3,4,5,6,7,8,9];
  activeItem = this.items[0];
  currentIndex = 0;
  moveDistance = 0;

  constructor(private readonly element: ElementRef) {}
  
  ngAfterViewInit() {
    const hostElement = this.element.nativeElement;
    const sliderItemEle = hostElement.querySelectorAll('.slider .item');
    const itemWidth = sliderItemEle[this.currentIndex].getBoundingClientRect().width;
    const sliderEle = hostElement.querySelector('.slider');
    this.moveDistance = itemWidth * -1;
    sliderEle.style.left = `${this.moveDistance}px`;
    this.elementActiveHandler(0);
  }

  onItemClick(index: number) {
    this.currentIndex = index;
    this.activeItem = this.items[index];
    this.elementActiveHandler(this.currentIndex);

    const totalItem = this.items.length - 1;
    const hostElement = this.element.nativeElement;
    const sliderItemEle = hostElement.querySelectorAll('.slider .item');
    const sliderEle = hostElement.querySelector('.slider');
    const itemWidth = sliderItemEle[this.currentIndex].getBoundingClientRect().width;
    sliderEle.classList.remove('removeAni')
    this.moveDistance = (itemWidth * (this.currentIndex + 1)) * -1;
    sliderEle.style.left = `${this.moveDistance}px`;
  }

  @DebounceTime(200)
  onBtnClick(direction: string) {
    const totalItem = this.items.length - 1;
    const hostElement = this.element.nativeElement;
    const sliderItemEle = hostElement.querySelectorAll('.slider .item');
    const sliderEle = hostElement.querySelector('.slider');
    let directionNum = -1; // right
    sliderEle.classList.remove('removeAni');
    if (direction === 'left') {
      this.currentIndex = this.currentIndex - 1 < 0 ? totalItem : this.currentIndex - 1;
      directionNum = 1;
    } else {
      this.currentIndex = this.currentIndex >= totalItem ? 0 : this.currentIndex + 1;
      directionNum = -1;
    }

    const itemWidth = sliderItemEle[this.currentIndex].getBoundingClientRect().width;
    this.activeItem = this.items[this.currentIndex];
    this.elementActiveHandler(this.currentIndex);
 
    this.moveDistance = this.moveDistance + (itemWidth * directionNum);
    sliderEle.style.left = `${this.moveDistance}px`;
  }

  elementActiveHandler(index: number) {
    const hostElement = this.element.nativeElement;
    const itemList = hostElement.querySelectorAll('.list .item');
    itemList.forEach(data => data.classList.remove('active'));
    itemList[index].classList.add('active');
  }

  onTransitionEnd($event) {
    const totalItem = this.items.length - 1;
    const hostElement = this.element.nativeElement;
    const sliderItemEle = hostElement.querySelectorAll('.slider .item');
    const sliderEle = hostElement.querySelector('.slider');
    const itemWidth = sliderItemEle[this.currentIndex].getBoundingClientRect().width;
    
    if (this.currentIndex === this.items.length - 1) {
        this.moveDistance = itemWidth * this.items.length * -1;
    } else if (this.currentIndex === 0) {
      this.moveDistance = itemWidth * -1;
    }

    sliderEle.classList.add('removeAni');
    sliderEle.style.left = `${this.moveDistance}px`;
  }
}
