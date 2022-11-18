import User from '../models/Users';
import jwt from 'jsonwebtoken';
import Role from '../models/Roles';

export const signUp = async (req, res) => {
  const {
    name,
    email,
    password,
    roles = ['user'],
    englishLevel = '',
    technicalKnowledge = '',
    linkToCv = '',
  } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    password: await User.encryptPassword(password),
    roles,
    englishLevel,
    technicalKnowledge,
    linkToCv,
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: 'user' });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: 86400,
  });
  res.status(201).json(token);
};

export const signIn = async (req, res) => {
  const findUser = await User.findOne({ email: req.body.email }).populate(
    'roles'
  );

  if (!findUser) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatchPassword = await User.comparePassword(
    req.body.password,
    findUser.password
  );

  if (!isMatchPassword) {
    return res.status(401).json({ token: null, message: 'Invalid password' });
  }

  const token = jwt.sign({ id: findUser._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: 86400,
  });

  res.json({ token });
};
