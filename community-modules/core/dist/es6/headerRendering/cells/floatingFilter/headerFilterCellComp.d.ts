// Type definitions for @ag-grid-community/core v26.1.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Column } from '../../../entities/column';
import { IFilterDef } from '../../../interfaces/iFilter';
import { Beans } from '../../../rendering/beans';
import { AbstractHeaderCellComp } from '../abstractCell/abstractHeaderCellComp';
import { HeaderFilterCellCtrl } from './headerFilterCellCtrl';
export declare class HeaderFilterCellComp extends AbstractHeaderCellComp<HeaderFilterCellCtrl> {
    private static TEMPLATE;
    private readonly columnHoverService;
    private readonly userComponentFactory;
    private readonly gridApi;
    private readonly filterManager;
    private readonly menuFactory;
    protected readonly beans: Beans;
    private readonly eFloatingFilterBody;
    private readonly eButtonWrapper;
    private readonly eButtonShowMainFilter;
    protected readonly column: Column;
    protected readonly pinned: string | null;
    private suppressFilterButton;
    private floatingFilterCompPromise;
    constructor(ctrl: HeaderFilterCellCtrl);
    private postConstruct;
    getColumn(): Column;
    protected onTabKeyDown(e: KeyboardEvent): void;
    protected handleKeyDown(e: KeyboardEvent): void;
    protected onFocusIn(e: FocusEvent): void;
    private setupFloatingFilter;
    private setupLeftPositioning;
    private setupSyncWithFilter;
    private showParentFilter;
    private setupColumnHover;
    private onColumnHover;
    private setupWidth;
    private onColumnWidthChanged;
    private setupWithFloatingFilter;
    private parentFilterInstance;
    private getFilterComponent;
    static getDefaultFloatingFilterType(def: IFilterDef): string | null;
    private getFloatingFilterInstance;
    private currentParentModel;
    private onParentModelChanged;
    private onFloatingFilterChanged;
}
