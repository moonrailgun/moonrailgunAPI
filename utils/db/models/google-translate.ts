import mongoose, { Schema } from 'mongoose';
import '../index';

const googleTranslateSchema = new Schema({
  tkk: String,
  updatedAt: Date,
});

const GoogleTranslate =
  mongoose.models['google_translate'] ||
  mongoose.model('google_translate', googleTranslateSchema);

export async function getGoogleTranslateTkk(): Promise<{
  tkk: string | null;
  updatedAt: Date | null;
}> {
  const gt = await GoogleTranslate.findOne();

  return {
    tkk: gt?.get('tkk') ?? null,
    updatedAt: gt?.get('updatedAt') ?? null,
  };
}

export async function setGoogleTranslateTkk(tkk: string) {
  await GoogleTranslate.findOneAndUpdate(
    {},
    {
      tkk,
      updatedAt: new Date(),
    },
    {
      upsert: true,
      useFindAndModify: true,
    }
  );
}
