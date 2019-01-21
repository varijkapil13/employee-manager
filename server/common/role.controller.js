import config from './env.config';

export default class RoleController {
  static convertToInteger(roleName) {
    if (this.__isAdmin(roleName)) {
      return config.permissions.ADMIN;
    }
    if (this.__isManager(roleName)) {
      return config.permissions.MANAGER;
    }

    return config.permissions.USER;
  }

  static __isAdmin(role) {
    const lowerCaseRole = role.toLowerCase();
    return lowerCaseRole === 'admin' || lowerCaseRole === 'administrator' || lowerCaseRole === 'superuser';
  }

  static __isManager(role) {
    const lowerCaseRole = role.toLowerCase();
    return (
      lowerCaseRole === 'manager' ||
      lowerCaseRole === 'manage' ||
      lowerCaseRole === 'hr' ||
      lowerCaseRole === 'human resource' ||
      lowerCaseRole === 'resource' ||
      lowerCaseRole === 'ceo' ||
      lowerCaseRole === 'management' ||
      lowerCaseRole === 'cto' ||
      lowerCaseRole === 'coo' ||
      lowerCaseRole === 'finance'
    );
  }
}
