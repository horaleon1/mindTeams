import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userShema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: 'Role',
        type: Schema.Types.ObjectId,
      },
    ],
    englishLevel: String,
    technicalKnowledge: String,
    linkToCv: String,
  },
  { timestamps: true, versionKey: false }
);

userShema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

userShema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model('User', userShema);
