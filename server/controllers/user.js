import model from '../models';

const {User} = model;
const {Avatar} = model;

class Users {
  static signUpWithAvatar(req, res) {
    const {email, password, roles} = req.body;
    const avatarId = req.params.avatarId;
    Avatar.findById(avatarId).then(avatar => {
      if (avatar) {
        return User.create({
          email,
          password,
          avatarId,
          roles
        }).then(userData =>
          res.status(201).send({
            success: true,
            message: 'User successfully created',
            userData
          })
        );
      } else {
        return res.status(400).send({
          status: false,
          errors: [
            {
              name: 'No Avatar found',
              details: 'Avatar with id ' + avatarId + ' was not found in the database'
            }
          ]
        });
      }
    });
  }

  static signUp(req, res) {
    const {email, password, roles, first_name, last_name} = req.body;
    Avatar.create({
      first_name,
      last_name,
      email
    })
      .then(avatar => {
        return User.create({
          email,
          password,
          avatarId: avatar.id,
          roles
        })
          .then(userData =>
            res.status(201).send({
              success: true,
              message: 'User successfully created',
              userData
            })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}

export default Users;
