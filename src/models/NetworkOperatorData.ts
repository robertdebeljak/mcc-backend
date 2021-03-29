import mongoose, { Document, Model, Schema } from 'mongoose';
import Random from 'meteor-random-universal';

import { ICountry } from './Country';
import { INetworkOperator } from './NetworkOperator';

export interface INetworkOperatorData extends Document {
  country: string | ICountry;
  networkOperator: string | INetworkOperator;
  name: string;
  mcc: number;
  mnc: number;
  mncLong: number;
  imsi: number;
  defaultMnc: boolean;
  preferredNetwork: boolean;
}

export interface INetworkOperatorDataModel extends Model<INetworkOperatorData> {
}

export const networkOperatorDataSchema = new Schema({
  _id: {
    type: String,
    default: () => `nopd_${Random.id()}`,
    required: true
  },
  name: String,
  country: {
    type: String,
    ref: 'Country'
  },
  networkOperator: {
    type: String,
    ref: 'NetworkOperator'
  },
  mcc: Number,
  mnc: Number,
  mncLong: Number,
  imsi: Number,
  defaultMnc: Boolean,
  preferredNetwork: Boolean
}, { timestamps: true });

const NetworkOperatorData = mongoose.model<INetworkOperatorData, INetworkOperatorDataModel>('NetworkOperatorData', networkOperatorDataSchema);

export default NetworkOperatorData;
