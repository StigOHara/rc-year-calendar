import React from 'react';

interface CalendarEvent {
    startDate: Date;
    endDate: Date;
    name: string;
    [key: string]: any;
}

interface ContextMenuItem {
    text: string;
    click: (e: MouseEvent) => void;
    visible?: boolean | ((e: MouseEvent) => boolean);
    items?: ContextMenuItem[];
}

interface CalendarProps {
    // Options
    allowOverlap?: boolean;
    alwaysHalfDay?: boolean;
    contextMenuItems?: ContextMenuItem[];
    customDayRenderer?: (element: HTMLElement, currentDate: Date) => void;
    customDataSourceRenderer?: (element: HTMLElement, currentEvents: CalendarEvent[]) => void;
    dataSource?: CalendarEvent[] | ((currentYear: number) => CalendarEvent[] | Promise<CalendarEvent[]>);
    disabledDays?: Date[];
    disabledWeekDays?: number[];
    displayDisabledDataSource?: boolean;
    displayHeader?: boolean;
    displayWeekNumber?: boolean;
    enableContextMenu?: boolean;
    enableRangeSelection?: boolean;
    hiddenWeekDays?: number[];
    language?: string;
    loadingTemplate?: string;
    maxDate?: Date;
    minDate?: Date;
    roundRangeLimits?: boolean;
    selectRange?: boolean;
    style?: string;
    weekStart?: number;
    numberMonthsDisplayed?: number;
    year?: number;
    defaultYear?: number;
    startDate?: Date;
    defaultStartDate?: Date;

    // Event Handlers
    onDayClick?: (e: MouseEvent, date: Date) => void;
    onDayContextMenu?: (e: MouseEvent, date: Date) => void;
    onDayEnter?: (e: MouseEvent, date: Date) => void;
    onDayLeave?: (e: MouseEvent, date: Date) => void;
    onRenderEnd?: () => void;
    onSelectRange?: (e: { startDate: Date; endDate: Date }) => void;
    onPeriodChanged?: (e: { startDate: Date; endDate: Date }) => void;
    onYearChanged?: (e: { year: number }) => void;
}

declare class Calendar extends React.Component<CalendarProps> {
    static locales: any; // You might want to define a more specific type for locales
}

export default Calendar;