import mongoose, { Document, Model, Schema } from 'mongoose';
import Random from 'meteor-random-universal';

export interface ICountry extends Document {
  name: string;
  countryCode: number;
  continent: string;
  iso: string;
  iso3: string;
  mncLengthMin: number;
  mncLengthMax: number;
  shortcodeLengthMin: number;
  shortcodeLengthMax: number;
  mnpCountry: number;
  mnpProviderAvailable: boolean;
  cacheDuration: number;
  defaultLookupCost: number;
  timezone: string;
  utcShift: number;
  daylightShift: number;
  euVatExempt: boolean;
  intVatExempt: boolean;
}

export interface ICountryModel extends Model<ICountry> {
}

export const countrySchema = new Schema({
  _id: {
    type: String,
    default: () => `country_${Random.id()}`,
    required: true
  },
  name: String,
  countryCode: Number,
  continent: String,
  iso: String,
  iso3: String,
  mncLengthMin: Number,
  mncLengthMax: Number,
  shortcodeLengthMin: Number,
  shortcodeLengthMax: Number,
  mnpCountry: Number,
  mnpProviderAvailable: Boolean,
  cacheDuration: Number,
  defaultLookupCost: Number,
  timezone: String,
  utcShift: Number,
  daylightShift: Number,
  euVatExempt: Boolean,
  intVatExempt: Boolean,
}, { timestamps: true });

const Country = mongoose.model<any, any>('Country', countrySchema);

export default Country;
