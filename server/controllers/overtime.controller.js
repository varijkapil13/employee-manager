import model from '../models';
import {calculateOvertimeFromWorkdayHolidaAndLeaves} from '../utils/utils';

const {WorkDay, Leave, Holiday, Avatar, Overtime} = model;

class OvertimeController {
  // find overtime for all users
  /**
   *
   * @param req
   * @param res
   */
  static async getAll(req, res) {
    const overtime = await OvertimeController.calculateOvertimeForAvatarId(1);
    console.log(overtime);
    Overtime.findAll()
      .then(overtime => res.status(200).send({overtime}))
      .catch(error => res.status(400).send(error));
  }

  /**
   *
   * @param avatarId
   * @returns {Promise<{overtime: Model, message: string, status: boolean}|{message: string, error: *, status: boolean}|{message: string, status: boolean}|{message: string, status: boolean}|{message: string, status: boolean}>}
   */
  static async initializeOvertimeForAvatarId(avatarId) {
    try {
      const avatar = await Avatar.findByPk(avatarId);
      if (!avatar) {
        return {status: false, message: 'User not found'};
      }
      const overtime = await Overtime.findByPk(avatarId);
      if (!overtime) {
        const createOvertime = await Overtime.create({avatarId, hours: 0.0});
        if (createOvertime) {
          return {status: true, message: 'Overtime for user initialized successfully'};
        } else {
          return {status: false, message: 'Initializing overtime caused an error'};
        }
      }
      return {status: false, message: 'Overtime value already present for user', overtime};
    } catch (e) {
      return {status: false, message: 'There was an error processing the request', error: e};
    }
  }

  /**
   *
   * @param avatarId
   * @returns {Promise<{overtime: number, message: string, status: boolean}|{overtime: number, message: string, status: boolean}|{message: string, status: boolean}|{message: string, error: *, status: boolean}|{message: string, status: boolean}>}
   */
  static async calculateOvertimeForAvatarId(avatarId) {
    if (!avatarId) {
      return {status: false, message: 'User does not exist'};
    }
    try {
      const avatar = await Avatar.findByPk(avatarId);
      if (!avatar) {
        return {status: false, message: 'User does not exist'};
      }
      const workdays = await WorkDay.findAll({where: {avatarId}});
      if (!workdays) {
        return {status: false, message: 'No workday data present'};
      }
      const holidays = await Holiday.findAll();
      const leaves = await Leave.findAll({where: avatarId});
      const calculatedOvertime = calculateOvertimeFromWorkdayHolidaAndLeaves(workdays, holidays, leaves);
      const overtime = calculatedOvertime.overOrUnderTime;
      const updateOvertime = await Overtime.update({hours: overtime}, {where: {avatarId}});
      if (updateOvertime) {
        return {status: true, message: 'Overtime updated successfully', overtime};
      } else {
        return {status: false, message: 'Overtime was not updated', overtime};
      }
    } catch (e) {
      return {status: false, message: 'There was an error processing the request', error: e};
    }
  }
}

export default OvertimeController;
