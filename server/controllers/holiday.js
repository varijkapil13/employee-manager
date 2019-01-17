import model from '../models';
import moment from 'moment';

const {Holiday} = model;

class HolidayController {
  static addHoliday(req, res) {
    const {date, notes, from, to} = req.body;

    return Holiday.create({
      date: moment.utc(date),
      notes,
      from,
      to
    })
      .then(holidayData =>
        res.status(201).send({
          success: true,
          message: 'Holiday was successfully added',
          holidayData
        })
      )
      .catch(error => res.status(400).send(error));
  }

  static deleteHoliday(req, res) {
    const holidayId = req.params.holidayId;

    Holiday.findByPk(holidayId).then(holiday => {
      if (!holiday) {
        return res.status(400).send({
          message: 'Holiday Not Found'
        });
      } else {
        holiday
          .destroy()
          .then(() =>
            res.status(200).send({
              message: 'Holiday successfully deleted'
            })
          )
          .catch(error => res.status(400).send(error));
      }
    });
  }

  static getAllHolidays(req, res) {
    Holiday.findAll()
      .then(holidays => {
        return res.status(200).send({
          status: true,
          message: 'Found holidays',
          holidays
        });
      })
      .catch(error => res.status(400).send(error));
  }
}

export default HolidayController;
