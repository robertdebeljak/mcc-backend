import mongoose, { Document, Model, Schema } from 'mongoose';
import Random from 'meteor-random-universal';

export interface INetworkOperatorNumberType extends Document {
  name: string;
}

export interface INetworkOperatorNumberTypeModel extends Model<INetworkOperatorNumberType> {
}

export const INetworkOperatorNumberTypeSchema = new Schema({
  _id: {
    type: String,
    default: () => `nt_${Random.id()}`,
    required: true
  },
  name: String
}, { timestamps: true });

const NetworkOperatorNumberType = mongoose.model<INetworkOperatorNumberType, INetworkOperatorNumberTypeModel>('NetworkOperatorNumberType', INetworkOperatorNumberTypeSchema);

export default NetworkOperatorNumberType;
