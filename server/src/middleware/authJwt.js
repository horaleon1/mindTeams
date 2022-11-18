import jwt from 'jsonwebtoken';
import Roles from '../models/Roles';
import Users from '../models/Users';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).json({ message: 'Token was not provided' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id;

    const findUser = await Users.findById(req.userId, { password: '' });

    if (!findUser) return res.status(404).json({ message: 'No user found' });

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const isSuperAdmin = async (req, res, next) => {
  const user = await Users.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: user.roles } });
  const findSuperAdmin = roles.find((role) => role.name === 'superAdmin');

  if (!findSuperAdmin) {
    return res
      .status(403)
      .json({ message: 'Require Super Admin role to complete task' });
  } else {
    next();
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await Users.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: user.roles } });
  const findAdmin = roles.find((role) => role.name === 'admin');

  if (!findAdmin) {
    return res
      .status(403)
      .json({ message: 'Require Admin role to complete task' });
  } else {
    next();
  }
};
