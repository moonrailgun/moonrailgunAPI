import got from 'got/dist/source';
import moment from 'moment';
import mongoose, { Schema } from 'mongoose';
import '../index';

const financeRateSchema = new Schema({
  base: String,
  date: String,
  timeLastUpdated: Number,
  rates: Object,
});

const FinanceRate =
  mongoose.models['finance_rate'] ||
  mongoose.model('finance_rate', financeRateSchema);

export async function getFinanceRate(
  base: string
): Promise<{
  base: string;
  date: string;
  timeLastUpdated: number;
  rates: any;
} | null> {
  const data = await FinanceRate.findOne({
    base,
    date: moment().format('YYYY-MM-DD'),
  });

  if (!data) {
    return null;
  }

  return {
    base: data?.get('base') ?? null,
    date: data?.get('date') ?? null,
    timeLastUpdated: data?.get('timeLastUpdated') ?? null,
    rates: data?.get('rates') ?? null,
  };
}

export async function fetchFinanceRate(base: string) {
  const res = await got<any>(
    `https://api.exchangerate-api.com/v4/latest/${base.toUpperCase()}`
  );

  const body = JSON.parse(res.body);

  const document = {
    base: body.base,
    date: body.date,
    timeLastUpdated: body.time_last_updated,
    rates: body.rates,
  };

  await FinanceRate.findOneAndUpdate({ base: body.base }, document, {
    upsert: true,
    useFindAndModify: true,
  });

  return document;
}
