import User from '../models/Users';

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const findUser = await User.findById(req.params.userId);
  res.status(200).json(findUser);
};

export const updateUserById = async (req, res) => {
  const { userId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  res.status(204).json(updatedUser);
};

export const deleteUserById = async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);
  res.status(204).json(deletedUser);
};
