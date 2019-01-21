import * as jwt from 'jsonwebtoken';
import configuration from '../common/env.config';

const {jwtSecret} = configuration;

// created using the following tutorial : https://www.toptal.com/nodejs/secure-rest-api-in-nodejs

export default class AuthorizationValidationController {
  static validJWTNeeded(req, res, next) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send();
        } else {
          req.jwt = jwt.verify(authorization[1], jwtSecret);
          return next();
        }
      } catch (err) {
        return res.status(403).send();
      }
    } else {
      return res.status(401).send();
    }
  }
}
