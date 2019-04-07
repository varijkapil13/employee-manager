import moment from 'moment-business-days';

/**
 *
 * @param start
 * @param end
 * @returns {number}
 */
const calculateWorkdaysInTimePeriod = (start, end) => {
  return moment(start).businessDiff(end);
};

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
  console.debug(skipDates);
  let reducedEntries = [];
  const groupedByDate = groupBy(sheet, timelySheetKeys.date);
  for (const groupedByDateKey in groupedByDate) {
    if (groupedByDate.hasOwnProperty(groupedByDateKey)) {
      const convertedComparisonDate = moment.utc(groupedByDateKey, 'DD/MM/YYYY').toDate();
      console.debug(convertedComparisonDate);
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
