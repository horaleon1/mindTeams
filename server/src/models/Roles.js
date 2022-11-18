import { Schema, model } from 'mongoose';

const rolesSchema = new Schema({
  name: String,
});

export default model('Role', rolesSchema);
