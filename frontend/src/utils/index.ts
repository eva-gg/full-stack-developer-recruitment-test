import moment from 'moment';

export function getMomentFromDate(date: string) {
    return moment(date, 'YYYY-MM-DD');
}