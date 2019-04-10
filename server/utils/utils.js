import moment from 'moment-business-days';

/**
 *
 * @param start
 * @param end
 * @param holidays
 * @returns {number}
 */
export const calculateWorkdaysInTimePeriod = (start, end, holidays) => {
  moment.updateLocale('us', {
    holidays: holidays,
    holidayFormat: 'DD/MM/YYYY'
  });
  return moment(start).businessDiff(moment(end));
};

/**
 * Will return an object which contains all the elements from the `items` array grouped according to the `key` field
 * Eg. items = [{name: "ABC", age:2},{name: "DEF", age:2},{name: "GHI", age:2},{name: "JKL", age:3},{name: "MNO", age:3}]
 * key = "age"
 * result = {2: [{name: "ABC", age:2},{name: "DEF", age:2},{name: "GHI", age:2}], 3: [{name: "JKL", age:3},{name: "MNO", age:3}]}
 * @param {Array} items - array of items that needs to be grouped
 * @param {String} key - key in the object inside the items array for which the grouping is to be performed
 * @returns {*} - resulting object with grouped elements
 */
const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item]
    }),
    {}
  );

const timelySheetKeys = {
  name: 'Name',
  date: 'Date',
  from: 'From',
  to: 'To',
  hoursLogged: 'Logged',
  tags: 'Tags',
  notes: 'Note'
};

const dateNotPresentInArray = (array, date) => {
  for (const item of array) {
    const arrayDate = moment.utc(item).format('DD/MM/YYYY');
    const compareDate = moment.utc(date).format('DD/MM/YYYY');
    if (arrayDate === compareDate) {
      return false;
    }
  }
  return true;
};

/**
 *
 * @param sheet
 * @param userId
 * @param userName
 * @param skipDates
 * @returns {Array}
 */
export const reduceWorkdayEntries = (sheet, userId, userName, skipDates) => {
  let reducedEntries = [];
  const groupedByDate = groupBy(sheet, timelySheetKeys.date);
  for (const groupedByDateKey in groupedByDate) {
    if (groupedByDate.hasOwnProperty(groupedByDateKey)) {
      const convertedComparisonDate = moment.utc(groupedByDateKey, 'DD/MM/YYYY').toDate();
      const allElements = groupedByDate[groupedByDateKey];
      const sheetName = allElements[0][timelySheetKeys.name];
      if (userName === sheetName && dateNotPresentInArray(skipDates, convertedComparisonDate)) {
        reducedEntries.push({
          avatarId: userId,
          date: convertedComparisonDate,
          logged_hours: allElements.reduce((acc, val) => acc + val[[timelySheetKeys.hoursLogged]], 0.0),
          tags: allElements.map(item => item[[timelySheetKeys.tags]]).join(','),
          notes: allElements.map(item => item[[timelySheetKeys.notes]]).join(',')
        });
      }
    }
  }

  return reducedEntries;
};

export const generateLeaves = (leavesData, avatarId) => {
  const {startDate, endDate, overtimeDates, notes} = leavesData;
  if (!startDate || !endDate || !notes) {
    return {
      status: false,
      message: 'Dates and Notes are required values!',
      leaves: []
    };
  } else {
    const overtime = overtimeDates ? overtimeDates.map(date => moment.utc(date)) : [];
    const dateRange = createDatesArray(startDate, endDate);
    const leaves = dateRange.map(date => {
      return {
        date,
        overtime: overtime.filter(item => item.isSame(date, 'day')).length > 0,
        notes,
        avatarId
      };
    });

    return {
      status: true,
      message: 'Leaves generated',
      leaves
    };
  }
};

const createDatesArray = (start, end) => {
  const startDate = moment.utc(start);
  const endDate = moment.utc(end);
  const difference = endDate.diff(startDate, 'day');
  let datesArray = [];
  for (let i = 0; i <= difference; i++) {
    datesArray.push(startDate.clone().add(i, 'day'));
  }
  return datesArray;
};
