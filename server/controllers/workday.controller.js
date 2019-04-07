import * as XLSX from 'xlsx';
import moment from 'moment';
import business from 'moment-business';
import model from '../models';
import * as sequelize from 'sequelize';
import {reduceWorkdayEntries} from '../utils/utils';

const Op = sequelize.Op;
const {WorkDay, Avatar, Holiday, Leave} = model;

class WorkdayController {
  /**
   *
   * @param req
   * @param res
   */
  static importTimelyFile(req, res) {
    // get the user id from the url
    const user_id = req.params.avatarId;
    Avatar.findById(user_id)
      .then(avatar => {
        if (avatar) {
          const userName = avatar.first_name + ' ' + avatar.last_name;
          // parse the excel file from the request
          if (req.file) {
            const workbook = XLSX.read(req.file.buffer, {type: 'buffer'});
            const sheetNameList = workbook.SheetNames;
            const sheetInJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[1]]);
            // remove the first row from the array. because it contains only the total hours logged
            sheetInJson.shift();
            // get existing entries for the user, do not add for a date that is already present
            WorkDay.findAll({where: {avatarId: user_id}}).then(workdays => {
              const dateList = workdays ? workdays.map(item => item.date) : [];
              const reducedSheet = reduceWorkdayEntries(sheetInJson, user_id, userName, dateList);
              const length = reducedSheet.length;
              if (length <= 0) {
                return res.status(200).send({
                  status: true,
                  msg: 'Entries already present in the database. No new entries were created'
                });
              }
              for (let element of reducedSheet) {
                WorkDay.create({
                  ...element
                })
                  .then(() => {
                    if (reducedSheet.indexOf(element) === length - 1) {
                      return res.status(200).send({
                        status: true,
                        msg: 'Entries saved to database successfully'
                      });
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    return res.status(400).send(error);
                  });
              }
            });
          } else {
            return res.status(400).send({
              status: false,
              errors: [
                {
                  name: 'File not found error',
                  detail: 'File was not found in the request.'
                }
              ]
            });
          }
        } else {
          return res.status(400).send({
            status: false,
            errors: [
              {
                name: 'User not found error',
                details: 'User with id ' + user_id + ' was not found in the database'
              }
            ]
          });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(400).send(error);
      });
  }

  static addWorkday(req, res) {
    const avatarId = req.params.avatarId;
    const {date, tags, notes, from, to, logged_hours} = req.body;
    Avatar.findByPk(avatarId)
      .then(avatar => {
        if (avatar) {
          WorkDay.create({
            date,
            tags,
            notes,
            from,
            to,
            logged_hours,
            avatarId
          })
            .then(workday => {
              return res.status(201).send({
                status: true,
                message: 'Workday successfully added for ' + avatar.first_name + ' ' + avatar.last_name,
                workday
              });
            })
            .catch(error => res.status(400).send(error));
        } else {
          return res.status(400).send({
            status: false,
            message: 'Avatar with id ' + avatarId + ' not found'
          });
        }
      })
      .catch(error => res.status(400).send(error));
  }

  static getUserWorkdays(req, res) {
    const avatarId = req.params.avatarId;
    WorkDay.findAll({
      where: {avatarId}
    })
      .then(workdays => {
        let message = 'Workdays successfully retrieved';
        if (workdays.length <= 0) {
          message = 'No workdays were found';
        }
        return res.status(200).send({
          status: true,
          message,
          workdays
        });
      })
      .catch(error => res.status(400).send(error));
  }

  static getAllWorkdays(req, res) {
    const year = req.query.year;
    const month = req.query.month - 1;

    const startOfMonth = moment()
      .utc()
      .year(year)
      .month(month)
      .startOf('month')
      .toDate();
    const endOfMonth = moment(startOfMonth)
      .endOf('month')
      .toDate();

    // get all workdays in the specific time
    const workdays = WorkDay.findAll({
      where: {
        [Op.and]: {
          date: {
            [Op.gte]: startOfMonth,
            [Op.lte]: endOfMonth
          }
        }
      },
      order: [['date', 'ASC']]
    });

    // get all holidays in the specific time
    const holidays = Holiday.findAll({
      where: {
        [Op.and]: {
          date: {
            [Op.gte]: startOfMonth,
            [Op.lte]: endOfMonth
          }
        }
      },
      order: [['date', 'ASC']]
    });

    // get all leaves in the specific time
    const leaves = Leave.findAll({
      where: {
        [Op.and]: {
          date: {
            [Op.gte]: startOfMonth,
            [Op.lte]: endOfMonth
          }
        }
      },
      order: [['date', 'ASC']]
    });

    const avatars = Avatar.findAll();

    workdays
      .then(workdays => {
        let message = 'Workdays successfully retrieved';
        if (workdays.length <= 0) {
          return res.status(404).send({
            status: true,
            message: 'No workdays were found'
          });
        }
        leaves.then(leaves => {
          holidays.then(holidays => {
            avatars.then(avatars => {
              createWorkdayDataForFrontend(workdays, leaves, holidays, avatars, startOfMonth);
              return res.status(200).send({
                status: true,
                message,
                leaves,
                avatars,
                holidays,
                workdays
              });
            });
          });
        });
      })
      .catch(error => res.status(400).send(error));
  }
}

const createWorkdayDataForFrontend = (workdays, leaves, holidays, avatars, startDate) => {
  const month = generateMonthFromDate(startDate);
  const workdaysGroupedByAvatar = groupBy(workdays, 'avatarId');
  const leavesGroupedByAvatar = groupBy(leaves, 'avatarId');

  for (const workdayKey in workdaysGroupedByAvatar) {
    if (workdaysGroupedByAvatar.hasOwnProperty(workdayKey)) {
      const avatarWorkdays = workdaysGroupedByAvatar[workdayKey];
      for (const days of month) {
        const workdayForDay = avatarWorkdays.filter(item => moment(item.date).isSame(days.date, 'd'));
        if (workdayForDay.length <= 0) {
          // no workday found search for leaves
          const avatarLeaves = leavesGroupedByAvatar[workdayKey] ? leavesGroupedByAvatar[workdayKey] : [];
          if (avatarLeaves.length <= 0) {
            // no leaves exist, search for holidays
            const dayHoliday = holidays.filter(item => moment(item.date).isSame(days.date, 'd'));
            if (dayHoliday.length <= 0) {
              // no holiday found
              // check if the day is a weekend
              if (business.isWeekendDay(days.date)) {
                console.log('is a weekend');
              } else {
                console.log('no holiday found');
              }
            } else {
              console.log('holiday found');
            }
          } else {
            console.log('found a leave for avatar');
          }
        } else {
          // get total hours
          const hours = workdayForDay.reduce((acc, value) => acc + value.logged_hours, 0.0);
          console.log(hours);
        }
      }
    }
  }

  avatars.map(avatar => {});
};

const groupBy = (xs, key) => {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const generateMonthFromDate = startDate => {
  const momentDate = moment(startDate);
  const daysInMonth = momentDate.daysInMonth();
  const monthName = momentDate.format('MMM');
  const yearName = momentDate.format('YYYY');
  let array = [];
  for (let i = 1; i <= daysInMonth; i++) {
    array.push({
      name: i,
      monthName,
      yearName,
      date: momentDate.clone().add(i - 1, 'd')
    });
  }
  return array;
};

export default WorkdayController;
