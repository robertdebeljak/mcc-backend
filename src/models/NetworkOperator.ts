import mongoose, { Document, Model, Schema } from 'mongoose';
import Random from 'meteor-random-universal';

import Country, { ICountry } from './Country';

export interface INetworkOperator extends Document {
  name: string;
  country: string | ICountry;
  virtual: boolean;
  parent: string;
  unknown: boolean;
  visible: boolean;
  systemInsertUpdate: boolean;
  marketShare: number;
  subscribers: number;
  comment: string;
  activeInPricing: boolean;
  premiumNumbers: number;
  failedOperator: boolean;
}

export interface INetworkOperatorModel extends Model<INetworkOperator> {
}

export const networkOperatorSchema = new Schema({
  _id: {
    type: String,
    default: () => `nop_${Random.id()}`,
    required: true
  },
  name: String,
  country: {
    type: String,
    ref: 'Country'
  },
  virtual: Boolean,
  parent: String,
  unknown: Boolean,
  visible: Boolean,
  systemInsertUpdate: Boolean,
  marketShare: Number,
  subscribers: Number,
  comment: String,
  activeInPricing: Boolean,
  premiumNumbers: Number,
  failedOperator: Boolean
}, { timestamps: true });

const NetworkOperator = mongoose.model<any, any>('NetworkOperator', networkOperatorSchema);

export default NetworkOperator;
