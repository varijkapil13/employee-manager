import moment from 'moment-business-days';

/**
 *
 * @param start
 * @param end
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
