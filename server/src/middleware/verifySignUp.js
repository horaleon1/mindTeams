import Users from '../models/Users';

export const checkDuplicateEmail = async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ message: 'The email already exists' });
  }
  next();
};
