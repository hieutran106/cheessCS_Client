import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Component } from '@angular/core';
@Component({
    selector: "modal-content",
    templateUrl: "modalContent.component.html" 
})
export class ModalContentComponent {
    title:string;
    constructor(public bsModalRef: BsModalRef) {

    }
}