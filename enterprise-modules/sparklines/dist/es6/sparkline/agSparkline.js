import { AreaSparkline } from "./area/areaSparkline";
import { ColumnSparkline } from "./column/columnSparkline";
import { LineSparkline } from "./line/lineSparkline";
var AgSparkline = /** @class */ (function () {
    function AgSparkline() {
    }
    AgSparkline.create = function (options, tooltip) {
        // avoid mutating user provided options
        options = Object.create(options);
        var sparkline = getSparklineInstance(options.type);
        if (tooltip) {
            sparkline.tooltip = tooltip;
        }
        initSparkline(sparkline, options);
        initSparklineByType(sparkline, options);
        if (options.data) {
            sparkline.data = options.data;
        }
        return sparkline;
    };
    return AgSparkline;
}());
export { AgSparkline };
function getSparklineInstance(type) {
    if (type === void 0) { type = 'line'; }
    switch (type) {
        case 'column':
            return new ColumnSparkline();
        case 'area':
            return new AreaSparkline();
        case 'line':
        default:
            return new LineSparkline();
    }
}
function initSparklineByType(sparkline, options) {
    switch (options.type) {
        case 'column':
            initColumnSparkline(sparkline, options);
            break;
        case 'area':
            initAreaSparkline(sparkline, options);
            break;
        case 'line':
        default:
            initLineSparkline(sparkline, options);
            break;
    }
}
function initSparkline(sparkline, options) {
    setValueIfPropertyExists(sparkline, 'context', options.context, options);
    setValueIfPropertyExists(sparkline, 'width', options.width, options);
    setValueIfPropertyExists(sparkline, 'height', options.height, options);
    setValueIfPropertyExists(sparkline, 'container', options.container, options);
    setValueIfPropertyExists(sparkline, 'xKey', options.xKey, options);
    setValueIfPropertyExists(sparkline, 'yKey', options.yKey, options);
    if (options.padding) {
        initPaddingOptions(sparkline.padding, options.padding);
    }
    if (options.axis) {
        initAxisOptions(sparkline.axis, options.axis);
    }
    if (options.highlightStyle) {
        initHighlightStyleOptions(sparkline.highlightStyle, options.highlightStyle);
    }
    if (options.tooltip && sparkline.tooltip) {
        initTooltipOptions(sparkline.tooltip, options.tooltip);
    }
}
function initLineSparkline(sparkline, options) {
    if (options.marker) {
        initMarkerOptions(sparkline.marker, options.marker);
    }
    if (options.line) {
        initLineOptions(sparkline.line, options.line);
    }
}
function initAreaSparkline(sparkline, options) {
    setValueIfPropertyExists(sparkline, 'fill', options.fill, options);
    if (options.marker) {
        initMarkerOptions(sparkline.marker, options.marker);
    }
    if (options.line) {
        initLineOptions(sparkline.line, options.line);
    }
}
function initColumnSparkline(sparkline, options) {
    setValueIfPropertyExists(sparkline, 'fill', options.fill, options);
    setValueIfPropertyExists(sparkline, 'stroke', options.stroke, options);
    setValueIfPropertyExists(sparkline, 'strokeWidth', options.strokeWidth, options);
    setValueIfPropertyExists(sparkline, 'paddingInner', options.paddingInner, options);
    setValueIfPropertyExists(sparkline, 'paddingOuter', options.paddingOuter, options);
    setValueIfPropertyExists(sparkline, 'formatter', options.formatter, options);
}
function setValueIfPropertyExists(target, property, value, options) {
    if (property in options) {
        if (property in target) {
            if (target[property] !== value) { // only set property if the value is different to new value
                target[property] = value;
            }
        }
        else {
            console.warn("Property " + property + " does not exist on the target object.");
        }
    }
}
function initPaddingOptions(target, options) {
    setValueIfPropertyExists(target, 'top', options.top, options);
    setValueIfPropertyExists(target, 'right', options.right, options);
    setValueIfPropertyExists(target, 'bottom', options.bottom, options);
    setValueIfPropertyExists(target, 'left', options.left, options);
}
function initMarkerOptions(target, options) {
    setValueIfPropertyExists(target, 'enabled', options.enabled, options);
    setValueIfPropertyExists(target, 'size', options.size, options);
    setValueIfPropertyExists(target, 'shape', options.shape, options);
    setValueIfPropertyExists(target, 'fill', options.fill, options);
    setValueIfPropertyExists(target, 'stroke', options.stroke, options);
    setValueIfPropertyExists(target, 'strokeWidth', options.strokeWidth, options);
    setValueIfPropertyExists(target, 'formatter', options.formatter, options);
}
function initLineOptions(target, options) {
    setValueIfPropertyExists(target, 'stroke', options.stroke, options);
    setValueIfPropertyExists(target, 'strokeWidth', options.strokeWidth, options);
}
function initAxisOptions(target, options) {
    setValueIfPropertyExists(target, 'type', options.type, options);
    setValueIfPropertyExists(target, 'stroke', options.stroke, options);
    setValueIfPropertyExists(target, 'strokeWidth', options.strokeWidth, options);
}
function initHighlightStyleOptions(target, options) {
    setValueIfPropertyExists(target, 'fill', options.fill, options);
    setValueIfPropertyExists(target, 'size', options.size, options);
    setValueIfPropertyExists(target, 'stroke', options.stroke, options);
    setValueIfPropertyExists(target, 'strokeWidth', options.strokeWidth, options);
}
function initTooltipOptions(target, options) {
    setValueIfPropertyExists(target, 'enabled', options.enabled, options);
    setValueIfPropertyExists(target, 'container', options.container, options);
    setValueIfPropertyExists(target, 'renderer', options.renderer, options);
}
