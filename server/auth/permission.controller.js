// https://www.toptal.com/nodejs/secure-rest-api-in-nodejs

/*We can use the bitwise AND operator (bitmasking) to control the permissions.
If we set each required permission as a power of 2, we can treat each bit of the
32bit integer as a single permission.

An admin can then have all permissions by setting their permission value to 2147483647.
That user could then have access to any route.
As another example, a user whose permission value was set to 7 would have permissions to
the roles marked with bits for values 1, 2, and 4 (two to the power of 0, 1, and 2).*/

export default class PermissionController {
  static minimumPermissionRequired(requiredPermissionLevel) {
    return (req, res, next) => {
      const userPermissionLevel = parseInt(req.jwt.roles);
      if (userPermissionLevel & requiredPermissionLevel) {
        return next();
      } else {
        return res.status(403).send();
      }
    };
  }
}
