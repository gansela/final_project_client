import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() searchet: string[];
  public element: ElementRef
  public originalColor
  constructor(el: ElementRef, private renderer: Renderer2) {
    this.element = el
    this.originalColor = el.nativeElement.style.backgroundColor

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.searchet || !this.searchet.length) {
      this.element.nativeElement.style.backgroundColor = this.originalColor
      return;
    }
    this.renderer.setProperty(
      this.element.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    if (this.element.nativeElement.innerText.includes(this.searchet)) {
      this.element.nativeElement.style.backgroundColor = "gold"
      return this.element.nativeElement.innerHTML
    }
    this.element.nativeElement.style.backgroundColor = this.originalColor
    return this.element.nativeElement.innerHTML

  }
}