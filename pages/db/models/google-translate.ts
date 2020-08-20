import mongoose, { Schema } from 'mongoose';
import '../index';

const googleTranslateSchema = new Schema({
  token: String,
});

const GoogleTranslate =
  mongoose.models['google_translate'] ||
  mongoose.model('google_translate', googleTranslateSchema);

export async function getGoogleTranslateToken(): Promise<string | null> {
  const gt = await GoogleTranslate.findOne();

  const token = gt?.get('token') ?? null;

  return token;
}

export async function setGoogleTranslateToken(token: string) {
  const gt = new GoogleTranslate({
    token,
  });
  await gt.save();
}
