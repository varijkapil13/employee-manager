import model from '../models';
import moment from 'moment';
import * as sequelize from 'sequelize';

const {Leave, Avatar, Holiday, WorkDay} = model;
const Op = sequelize.Op;
const startOfMonth = moment()
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
    const avatar = Avatar.findById(avatarId);

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
          avatar.then(avat => {
            console.log(workday);
            console.log(leaves);
            console.log(holiday);
            console.log(avat);
          });
        });
      });
    });
  }
}

export default HomeController;
