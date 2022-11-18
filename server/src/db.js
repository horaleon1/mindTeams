import mongoose from 'mongoose';
import { createRoles } from './utils/initialSetup';

mongoose
  .connect(
    'mongodb+srv://admin01:Admin.01@cluster01.z777zwp.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Db connected');
  })
  .then(() => {
    createRoles();
  })
  .catch((error) => {
    console.log(error, 'Db is not connected');
  });
