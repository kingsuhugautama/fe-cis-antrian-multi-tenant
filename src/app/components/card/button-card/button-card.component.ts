import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-button-card',
    templateUrl: './button-card.component.html',
    styleUrls: ['./button-card.component.css']
})
export class ButtonCardComponent implements OnInit {

    @Input('ButtonText') ButtonText: string = "";

    @Input('ButtonIcon') ButtonIcon: string = "";

    @Input('ButtonDisabled') ButtonDisabled: boolean = false;

    @Output('onClick') onClick = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    onClicked(args: any): void {
        this.onClick.emit(args);
    }
}
