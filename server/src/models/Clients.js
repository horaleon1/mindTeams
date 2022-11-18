import { Schema, model } from 'mongoose';

const clientShema = new Schema(
  {
    name: String,
    account: String,
    manager: String,
    team: [
      {
        ref: 'User',
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default model('Client', clientShema);
