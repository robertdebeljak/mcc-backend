import mongoose, { Document, Model, Schema } from 'mongoose';
import Random from 'meteor-random-universal';

import { ICountry } from './Country';
import { INetworkOperator } from './NetworkOperator';
import { INetworkOperatorNumberType } from './NetworkOperatorNumberType';

export interface INetworkOperatorPrefix extends Document {
  networkOperator: string | INetworkOperator;
  country: string | ICountry;
  prefix: string;
  prefixMin: number;
  prefixMax: number;
  networkOperatorNumberType: string | INetworkOperatorNumberType;
  systemInsertUpdate: boolean;
}

export interface INetworkOperatorPrefixModel extends Model<INetworkOperatorPrefix> {
}

export const networkOperatorPrefixSchema = new Schema({
  _id: {
    type: String,
    default: () => `nopp_${Random.id()}`,
    required: true
  },
  networkOperator: {
    type: String,
    ref: 'NetworkOperator'
  },
  country: {
    type: String,
    ref: 'Country'
  },
  prefix: String,
  prefixMin: Number,
  prefixMax: Number,
  networkOperatorNumberType: {
    type: String,
    ref: 'NetworkOperatorNumberType'
  },
  systemInsertUpdate: Boolean
}, { timestamps: true });

const NetworkOperatorPrefix = mongoose.model<INetworkOperatorPrefix, INetworkOperatorPrefixModel>('NetworkOperatorPrefix', networkOperatorPrefixSchema);

export default NetworkOperatorPrefix;
