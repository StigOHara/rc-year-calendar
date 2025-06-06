import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import JsCalendar from 'js-year-calendar';
import isEqual from 'lodash.isequal';

import 'js-year-calendar/dist/js-year-calendar.css';

export default function Calendar(props) {
    const containerRef = useRef(null);
    const calendarRef = useRef(null);
    const prevProps = useRef({});

    useEffect(() => {
        const options = {
            allowOverlap: props.allowOverlap,
            alwaysHalfDay: props.alwaysHalfDay,
            contextMenuItems: props.contextMenuItems,
            customDayRenderer: props.customDayRenderer,
            customDataSourceRenderer: props.customDataSourceRenderer,
            dataSource: props.dataSource,
            disabledDays: props.disabledDays,
            disabledWeekDays: props.disabledWeekDays,
            displayDisabledDataSource: props.displayDisabledDataSource,
            displayHeader: props.displayHeader,
            displayWeekNumber: props.displayWeekNumber,
            enableContextMenu: props.enableContextMenu,
            enableRangeSelection: props.enableRangeSelection,
            hiddenWeekDays: props.hiddenWeekDays,
            language: props.language,
            loadingTemplate: props.loadingTemplate,
            maxDate: props.maxDate,
            minDate: props.minDate,
            roundRangeLimits: props.roundRangeLimits,
            style: props.style,
            weekStart: props.weekStart,
            numberMonthsDisplayed: props.numberMonthsDisplayed,
            startYear: props.year ?? props.defaultYear,
            startDate: props.startDate ?? props.defaultStartDate,

            // Event handlers
            clickDay: props.onDayClick,
            dayContextMenu: props.onDayContextMenu,
            mouseOnDay: props.onDayEnter,
            mouseOutDay: props.onDayLeave,
            renderEnd: props.onRenderEnd,
            selectRange: props.onRangeSelected,
            periodChanged: props.onPeriodChanged,
            yearChanged: props.onYearChanged

        };

        calendarRef.current = new JsCalendar(containerRef.current, options);

        return () => {
            // Proper cleanup
            if (calendarRef.current) {
                calendarRef.current.dispose?.();
            }
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, []);

    useEffect(() => {
        if (!calendarRef.current) return;

        const ops = [];

        const compareProp = (key, fn) => {
            if (!isEqual(props[key], prevProps.current[key])) {
                ops.push(() => fn(props[key]));
            }
        };

        compareProp('allowOverlap', v => calendarRef.current.setAllowOverlap(v));
        compareProp('alwaysHalfDay', v => calendarRef.current.setAlwaysHalfDay(v, true));
        compareProp('contextMenuItems', v => calendarRef.current.setContextMenuItems(v, true));
        compareProp('customDayRenderer', v => calendarRef.current.setCustomDayRenderer(v, true));
        compareProp('customDataSourceRenderer', v => calendarRef.current.setCustomDataSourceRenderer(v, true));
        compareProp('dataSource', v => calendarRef.current.setDataSource(v, true));
        compareProp('disabledDays', v => calendarRef.current.setDisabledDays(v, true));
        compareProp('disabledWeekDays', v => calendarRef.current.setDisabledWeekDays(v, true));
        compareProp('displayDisabledDataSource', v => calendarRef.current.setDisplayDisabledDataSource(v, true));
        compareProp('displayHeader', v => calendarRef.current.setDisplayHeader(v, true));
        compareProp('displayWeekNumber', v => calendarRef.current.setDisplayWeekNumber(v, true));
        compareProp('enableContextMenu', v => calendarRef.current.setEnableContextMenu(v, true));
        compareProp('enableRangeSelection', v => calendarRef.current.setEnableRangeSelection(v, true));
        compareProp('hiddenWeekDays', v => calendarRef.current.setHiddenWeekDays(v, true));
        compareProp('language', v => calendarRef.current.setLanguage(v, true));
        compareProp('loadingTemplate', v => calendarRef.current.setLoadingTemplate(v, true));
        compareProp('maxDate', v => calendarRef.current.setMaxDate(v, true));
        compareProp('minDate', v => calendarRef.current.setMinDate(v, true));
        compareProp('roundRangeLimits', v => calendarRef.current.setRoundRangeLimits(v, true));
        compareProp('style', v => calendarRef.current.setStyle(v, true));
        compareProp('weekStart', v => calendarRef.current.setWeekStart(v, true));
        compareProp('numberMonthsDisplayed', v => calendarRef.current.setNumberMonthsDisplayed?.(v, true));
        compareProp('startDate', v => calendarRef.current.setStartDate?.(v));
        compareProp('year', v => calendarRef.current.setYear?.(v));

        if (ops.length > 0) {
            ops.forEach(fn => fn());
        }

        prevProps.current = props;
    }, [props]);

    return <div ref={containerRef}></div>;
}

Calendar.locales = JsCalendar.locales;

Calendar.propTypes = {
    allowOverlap: PropTypes.bool,
    alwaysHalfDay: PropTypes.bool,
    contextMenuItems: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        click: PropTypes.func,
        visible: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        items: PropTypes.array
    })),
    customDayRenderer: PropTypes.func,
    customDataSourceRenderer: PropTypes.func,
    dataSource: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({
            startDate: PropTypes.instanceOf(Date),
            endDate: PropTypes.instanceOf(Date),
            name: PropTypes.string
        })),
        PropTypes.func
    ]),
    disabledDays: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    disabledWeekDays: PropTypes.arrayOf(PropTypes.number),
    displayDisabledDataSource: PropTypes.bool,
    displayHeader: PropTypes.bool,
    displayWeekNumber: PropTypes.bool,
    enableContextMenu: PropTypes.bool,
    enableRangeSelection: PropTypes.bool,
    hiddenWeekDays: PropTypes.arrayOf(PropTypes.number),
    language: PropTypes.string,
    loadingTemplate: PropTypes.string,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    roundRangeLimits: PropTypes.bool,
    selectRange: PropTypes.bool,
    style: PropTypes.string,
    weekStart: PropTypes.number,
    numberMonthsDisplayed: PropTypes.number,
    year: PropTypes.number,
    defaultYear: PropTypes.number,
    startDate: PropTypes.instanceOf(Date),
    defaultStartDate: PropTypes.instanceOf(Date),

    onDayClick: PropTypes.func,
    onDayContextMenu: PropTypes.func,
    onDayEnter: PropTypes.func,
    onDayLeave: PropTypes.func,
    onRenderEnd: PropTypes.func,
    onRangeSelected: PropTypes.func,
    onPeriodChanged: PropTypes.func,
    onYearChanged: PropTypes.func
};
