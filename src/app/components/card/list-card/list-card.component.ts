import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { UtilityService } from 'src/app/services/utility/utility.service';

export interface GridColumnModel {
    width: number;
    field?: string;
    headerText: string;
    visible?: boolean;
    type?: string;
    format?: string;
    headerTextAlign?: string;
    textAlign?: string;
}

@Component({
    selector: 'app-list-card',
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {

    @Input('NamaPoli') NamaPoli: string = "";

    @ViewChild('GridListCard') public GridListCard!: GridComponent;

    @Input('GridDatasource') GridDatasource: any[] = [];

    @Input('GridColumn') GridColumn: GridColumnModel[] = [];

    constructor(
        private utilityService: UtilityService
    ) { }

    ngOnInit(): void {
    }
}
