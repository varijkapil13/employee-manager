import model from '../models';

const {Avatar} = model;

class AvatarController {
  static signUp(req, res) {
    const {first_name, last_name, email} = req.body;
    return Avatar.create({
      last_name,
      first_name,
      email
    }).then(avatarData =>
      res.status(201).send({
        success: true,
        message: 'Avatar successfully created',
        avatarData
      })
    );
  }

  static list(req, res) {
    return Avatar.findAll().then(avatars => res.status(200).send(avatars));
  }

  static modify(req, res) {
    const {last_name, first_name, email} = req.body;
    return Avatar.findById(req.params.avatarId)
      .then(avatar => {
        avatar
          .update({
            last_name: last_name || avatar.last_name,
            first_name: first_name || avatar.first_name,
            email: email || avatar.email
          })
          .then(updatedAvatar => {
            res.status(200).send({
              message: 'Avatar updated successfully',
              data: {
                last_name: last_name || updatedAvatar.last_name,
                first_name: first_name || updatedAvatar.first_name,
                email: email || updatedAvatar.email
              }
            });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

  static delete(req, res) {
    return Avatar.findById(req.params.avatarId)
      .then(avatar => {
        if (!avatar) {
          return res.status(400).send({
            message: 'Avatar Not Found'
          });
        }
        return avatar
          .destroy()
          .then(() =>
            res.status(200).send({
              message: 'Avatar successfully deleted'
            })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}

export default AvatarController;
