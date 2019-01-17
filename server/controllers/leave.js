import model from '../models';
import moment from 'moment';

const {Leave, Avatar} = model;

class LeaveController {
  static addLeave(req, res) {
    const {date, notes, from, to} = req.body;
    const avatarId = req.params.avatarId;

    Avatar.findByPk(avatarId)
      .then(user => {
        if (user) {
          return Leave.create({
            date: moment.utc(date),
            notes,
            from,
            to,
            avatarId
          })
            .then(leave =>
              res.status(201).send({
                success: true,
                message: 'Leave was successfully added',
                leave
              })
            )
            .catch(error => res.status(400).send(error));
        } else {
          return res.status(400).send({
            status: false,
            message: 'User with id ' + avatarId + ' not found'
          });
        }
      })
      .catch(error => res.status(400).send(error));
  }

  static deleteLeave(req, res) {
    const leaveId = req.params.leaveId;

    Leave.findByPk(leaveId).then(leave => {
      if (!leave) {
        return res.status(400).send({
          message: 'Leave Not Found'
        });
      } else {
        leave
          .destroy()
          .then(() =>
            res.status(200).send({
              message: 'Leave successfully deleted'
            })
          )
          .catch(error => res.status(400).send(error));
      }
    });
  }

  static getAllLeaves(req, res) {
    Leave.findAll()
      .then(leaves => {
        let message = 'Leaves successfully retrieved';
        if (leaves.length <= 0) {
          message = 'No leaves were found';
        }
        return res.status(200).send({
          status: true,
          message,
          leaves
        });
      })
      .catch(error => res.status(400).send(error));
  }
}

export default LeaveController;
