import { Directive, ElementRef, Attribute, Input } from "@angular/core";
@Directive({
    selector: "[square-attr]"
})
export class SquareAttrDirective {
    constructor(private element: ElementRef) {}
    @Input("square-attr")
    index:number;
    ngOnInit() {
        let row=Math.floor(this.index/8);
        let col=this.index%8;
        if ((row+col)%2==0) {
            this.element.nativeElement.classList.add("white");
        } else {
            this.element.nativeElement.classList.add("black");
        }
        
    }
}