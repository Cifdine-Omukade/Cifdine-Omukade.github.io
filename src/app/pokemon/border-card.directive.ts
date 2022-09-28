import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  constructor(private el : ElementRef) { // elementRef sert a s 'attacher a un element du DOM similaire a une methode getById
    this.setBorder('#f5f5f5');
    this.setHeight(180);
   }
   
   
   private setBorder(color : string){
     let border = 'solid 4px' + color;
     this.el.nativeElement.style.border = border
   }
   private setHeight(height : number){
     this.el.nativeElement.style.height = height + 'px'
   }
   @Input('pkmnBorderCard') borderColor!: string;
   
   @HostListener('mouseenter') onMouseEnter(){
     this.setBorder( this.borderColor || '#a2f3c8')
   }
   @HostListener('mouseleave') onMouseLeave(){
     this.setBorder('#f5f5f5')
   }
   

}
