import mongoose from 'mongoose';
import { config } from '../../config';

mongoose.connect(config.mongoUrl!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
