import { Group } from '../scene/group';
import { Scene } from '../scene/scene';
import { Observable } from '../util/observable';
import { Padding } from '../util/padding';
import { SparklineTooltip } from './tooltip/sparklineTooltip';
import { HighlightStyle } from "@ag-grid-community/core";
import { LinearScale } from '../scale/linearScale';
import { TimeScale } from '../scale/timeScale';
import { BandScale } from '../scale/bandScale';
export interface SeriesNodeDatum {
    readonly seriesDatum: any;
    readonly point?: Point;
}
export interface Point {
    readonly x: number;
    readonly y: number;
}
interface SeriesRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
declare type Container = HTMLElement | undefined | null;
declare type Data = any[] | undefined | null;
declare type DataType = 'number' | 'array' | 'object' | undefined;
declare type AxisType = 'number' | 'category' | 'time';
declare type ScaleType = LinearScale | TimeScale | BandScale<string>;
export declare class SparklineAxis extends Observable {
    type?: AxisType;
    stroke: string;
    strokeWidth: number;
}
export declare abstract class Sparkline extends Observable {
    readonly id: string;
    readonly scene: Scene;
    readonly canvasElement: HTMLCanvasElement;
    readonly rootGroup: Group;
    tooltip: SparklineTooltip;
    private static tooltipDocuments;
    protected seriesRect: SeriesRect;
    private _context;
    context: {
        data: any;
    } | undefined;
    private _container;
    container: Container;
    private _data;
    data: Data;
    padding: Padding;
    xKey: string;
    yKey: string;
    protected dataType: DataType;
    protected xData: any[];
    protected yData: (number | undefined)[];
    protected min: number | undefined;
    protected max: number | undefined;
    protected xScale: ScaleType;
    protected yScale: LinearScale;
    readonly axis: SparklineAxis;
    readonly highlightStyle: HighlightStyle;
    protected constructor();
    private _width;
    width: number;
    private _height;
    height: number;
    /**
     * Generate node data from processed data.
     * Produce data joins.
     * Update selection's nodes using node data.
     */
    protected update(): void;
    protected updateYScale(): void;
    protected updateYScaleDomain(): void;
    protected updateYScaleRange(): void;
    protected updateXScale(): void;
    protected updateXScaleRange(): void;
    protected updateXScaleDomain(): void;
    /**
    * Return xScale instance based on the provided type or return a `BandScale` by default.
    * The default type is `category`.
    * @param type
    */
    protected getXScale(type?: AxisType): ScaleType;
    protected updateXAxisLine(): void;
    protected updateAxes(): void;
    protected generateNodeData(): {
        nodeData: SeriesNodeDatum[];
        areaData: SeriesNodeDatum[];
    } | SeriesNodeDatum[] | undefined;
    protected getNodeData(): readonly SeriesNodeDatum[];
    protected updateNodes(): void;
    protected highlightedDatum?: SeriesNodeDatum;
    protected highlightDatum(closestDatum: SeriesNodeDatum): void;
    protected dehighlightDatum(): void;
    abstract getTooltipHtml(datum: SeriesNodeDatum): string | undefined;
    /**
     * Highlight closest datum and display tooltip if enabled.
     * Only update if necessary, i.e. only update if the highlighted datum is different from previously highlighted datum,
     * or if there is no previously highlighted datum.
     * @param event
     */
    private onMouseMove;
    /**
     * Dehighlight all nodes and remove tooltip.
     * @param event
     */
    private onMouseOut;
    private processData;
    /**
    * Return the type of data provided to the sparkline based on the first truthy value in the data array.
    * If the value is not a number, array or object, return `undefined`.
    * @param data
    */
    private getDataType;
    /**
    * Return the given value depending on the type of axis.
    * Return `undefined` if the value is invalid for the given axis type.
    * @param value
    */
    private getDatum;
    private layoutId;
    /**
     * Only `true` while we are waiting for the layout to start.
     * This will be `false` if the layout has already started and is ongoing.
     */
    readonly layoutScheduled: boolean;
    /**
     * Execute update method on the next available screen repaint to make changes to the canvas.
     * If we are waiting for a layout to start and a new layout is requested,
     * cancel the previous layout using the non 0 integer (this.layoutId) returned from requestAnimationFrame.
     */
    protected scheduleLayout(): void;
    /**
     * Return the closest data point to x/y canvas coordinates.
     * @param x
     * @param y
     */
    private pickClosestSeriesNodeDatum;
    /**
     * calculate x/y coordinates for tooltip based on coordinates of highlighted datum, position of canvas and page offset.
     * @param datum
     */
    private handleTooltip;
    protected formatNumericDatum(datum: number): string;
    private defaultDateFormatter;
    protected formatDatum(datum: any): string;
    private _onMouseMove;
    private _onMouseOut;
    private setupDomEventListeners;
    private cleanupDomEventListerners;
    /**
     * Cleanup and remove canvas element from the DOM.
     */
    destroy(): void;
    /**
     * @returns this.scene.canvas.element
     */
    getCanvasElement(): HTMLCanvasElement;
}
export {};
