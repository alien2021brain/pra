const { truncate } = require('lodash');
const User = require('../Modal/user.modal');
const { trace } = require('../routes');

const deleteuser = async (req, res) => {
  console.log(req.id, 'reqid');
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.send(404).send('no user found');
    console.log('user: ', user);

    if (req.id !== user._id.toString()) {
      res
        .status(403)
        .send({ message: 'you have not permission to delete this user' });
    }
    await User.findByIdAndDelete(req.id);
    res.status(200).send({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'no user found' });
  }
};
module.exports = { deleteuser };
