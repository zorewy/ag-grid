import {ChartProxy, ChartProxyParams, UpdateParams} from '../chartProxy';
import {
    AgCharts,
    AgNightingaleSeriesOptions,
    AgPolarAxisOptions,
    AgPolarChartOptions,
    AgRadarAreaSeriesOptions,
    AgRadarLineSeriesOptions,
    AgRadialBarSeriesOptions,
    AgRadialColumnSeriesOptions
} from 'ag-charts-community';

type PolarSeriesOptions =
    AgRadarLineSeriesOptions |
    AgRadarAreaSeriesOptions |
    AgNightingaleSeriesOptions |
    AgRadialBarSeriesOptions |
    AgRadialColumnSeriesOptions;

export class PolarChartProxy extends ChartProxy {
    public constructor(params: ChartProxyParams) {
        super(params);
    }

    public getAxes(_: UpdateParams): AgPolarAxisOptions[] {
        const radialBar = this.standaloneChartType === 'radial-bar';
        return [
            {type: radialBar ? 'angle-number' : 'angle-category'},
            {type: radialBar ? 'radius-category' : 'radius-number'},
        ];
    }

    public getSeries(params: UpdateParams): PolarSeriesOptions[] {
        const {fields, category} = params;
        const radialBar = this.standaloneChartType === 'radial-bar';

        return fields.map(f => ({
            type: this.standaloneChartType as AgRadarAreaSeriesOptions['type'],
            angleKey: radialBar ? f.colId : category.id,
            angleName: radialBar ? (f.displayName ?? undefined) : category.name,
            radiusKey: radialBar ? params.category.id : f.colId,
            radiusName: radialBar ? params.category.name : (f.displayName ?? undefined),
        }));
    }

    public update(params: UpdateParams): void {
        const axes = this.getAxes(params);

        const options: AgPolarChartOptions = {
            ...this.getCommonChartOptions(params.updatedOverrides),
            data: this.getData(params, axes),
            axes,
            series: this.getSeries(params),
        };

        AgCharts.update(this.getChartRef(), options);
    }

    private getData(params: UpdateParams, axes: AgPolarAxisOptions[]): any[] {
        const isCategoryAxis = axes.some((axis) => axis.type === 'angle-category' || axis.type === 'radius-category');
        return this.getDataTransformedData(params, isCategoryAxis);
    }

    private getDataTransformedData(params: UpdateParams, isCategoryAxis: boolean) {
        return this.transformData(params.data, params.category.id, isCategoryAxis);
    }

    public crossFilteringReset(): void {
        // cross filtering is not currently supported in polar charts
    }
}
