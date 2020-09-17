import mongoose from 'mongoose';
import { env } from '../../config/env';

mongoose.connect(env.mongoUrl!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
