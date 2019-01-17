import * as XLSX from 'xlsx';
import moment from 'moment';
import model from '../models';

const {WorkDay, Avatar} = model;

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
            const length = sheetInJson.length;
            for (let element of sheetInJson) {
              const nameInFile = element['Name'];
              if (nameInFile === userName) {
                WorkDay.create({
                  user_id,
                  date: moment.utc(element['Date'], 'DD/MM/YYYY').toDate(),
                  from: element['From'],
                  to: element['To'],
                  logged_hours: element['Logged'],
                  tags: element['Tags'],
                  notes: element['Note']
                })
                  .then(() => {
                    if (sheetInJson.indexOf(element) === length - 1) {
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
            }
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
      .catch(error => res.status(400).send(error));
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
}

export default WorkdayController;
