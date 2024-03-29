import model from '../models';
import moment from 'moment';
import {generateLeaves} from '../utils/utils';

const {Leave, Avatar} = model;

class LeaveController {
  static addMultipleLeaves(req, res) {
    const {leavesData} = req.body;
    const avatarId = req.params.avatarId;
    const generateLeavesData = generateLeaves(leavesData, avatarId);
    if (generateLeavesData.status === false) {
      return res.status(400).send(generateLeavesData);
    }
    Avatar.findByPk(avatarId)
      .then(avatar => {
        if (avatar) {
          return Leave.bulkCreate(generateLeavesData.leaves)
            .then(leaves =>
              res.status(201).send({
                success: true,
                message: 'Leaves were successfully saved',
                leaves
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
      .catch(error => {
        return res.status(400).send(error);
      });
  }

  static addLeave(req, res) {
    const {date, notes, from, to} = req.body;
    const avatarId = req.params.avatarId;
    if (!date) {
      res.status(400).send({
        status: false,
        message: 'Date is required to create a leave'
      });
    }
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

  static getUserLeaves(req, res) {
    const avatarId = req.params.avatarId;
    Leave.findAll({
      where: {avatarId}
    })
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
