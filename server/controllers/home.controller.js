import model from '../models';
import moment from 'moment';
import * as sequelize from 'sequelize';
import {calculateWorkdaysInTimePeriod} from '../utils/utils';

const {Leave, Avatar, Holiday, WorkDay} = model;
const Op = sequelize.Op;
const startOfMonth = moment()
  .subtract(1, 'month')
  .startOf('month')
  .toDate();
const endOfMonth = moment(startOfMonth)
  .endOf('month')
  .toDate();

class HomeController {
  static getHomeViewDataForUser(req, res) {
    const avatarId = req.params.avatarId;
    // create a default home view for the user, if the user is a normal user
    const holidays = Holiday.findAll({
      where: {
        [Op.and]: {
          date: {
            [Op.gte]: startOfMonth,
            [Op.lte]: endOfMonth
          }
        }
      }
    });
    const leaves = Leave.findAll({
      where: {
        avatarId,
        [Op.and]: {
          date: {
            [Op.gte]: startOfMonth,
            [Op.lte]: endOfMonth
          }
        }
      }
    });

    WorkDay.findAll({
      where: {
        avatarId,
        [Op.and]: {
          date: {
            [Op.gte]: startOfMonth,
            [Op.lte]: endOfMonth
          }
        }
      },
      order: [['date', 'ASC']]
    }).then(workday => {
      leaves.then(leaves => {
        holidays.then(holiday => {
          if (workday && workday.length > 0) {
            const lastWorkday = workday[workday.length - 1].date;
            // create holidays array for business days calculation
            const holidaysInPeriod = holiday.map(item => moment(item.date).format('DD/MM/YYYY'));
            // create leaves array for business days calculation

            const leavesInPeriod = leaves.map(item => moment(item.date).format('DD/MM/YYYY'));
            const workingDaysInPeriod = calculateWorkdaysInTimePeriod(startOfMonth, lastWorkday, [...holidaysInPeriod, ...leavesInPeriod]);
            const workingHoursInPeriod = workingDaysInPeriod * 8;
            const workedHoursByAvatarInPeriod = workday.reduce((acc, val) => acc + val.logged_hours, 0.0);
            const overOrUnderTime = workedHoursByAvatarInPeriod - workingHoursInPeriod;
            return res.status(200).send({
              lastWorkday,
              leavesInPeriod,
              holidaysInPeriod,
              workingDaysInPeriod,
              workingHoursInPeriod,
              workedHoursByAvatarInPeriod,
              overOrUnderTime
            });
          } else {
            return res.status(404).send({
              message: 'No workdays found'
            });
          }
        });
      });
    });
  }
}

export default HomeController;
