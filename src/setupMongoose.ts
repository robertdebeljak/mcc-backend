import mongoose from 'mongoose';
import { isEmptyObject } from './utils';

const MONGO_URI = `mongodb://${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DB}`;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
});

mongoose.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {

    ret.id = ret._id;
    delete ret._id;
    delete ret.password;

    Object.keys(ret).forEach(key => {
      if (ret[key] === undefined || ret[key] === null) {
        delete ret[key];
      } else if (typeof ret[key] === 'object' && key !== 'createdAt') {
        if (ret[key].length === 0) {
          delete ret[key];
        }

        if (ret[key] && ret[key].location && ret[key].location.type === 'Point' && ret[key].location.coordinates.length !== 2) {
          delete ret[key].location;
        }

        if (ret[key] && ret[key].type === 'Point' && ret[key].coordinates.length !== 2) {
          delete ret[key];
        }

        if (ret[key] && isEmptyObject(ret[key])) {
          delete ret[key];
        }

        if (ret.id.indexOf('post') !== -1 && ['hiddenBy', 'reports', 'bookmarkedBy', 'subscribed', 'localAddress', 'areas'].indexOf(key) !== -1 ) {
          delete ret[key];
        }
      }
    });

    return ret;
  }
});
