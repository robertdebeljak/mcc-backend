import mongoose from 'mongoose';
import Country from '../models/Country';
import NetworkOperator from '../models/NetworkOperator';
import NetworkOperatorData from '../models/NetworkOperatorData';
import NetworkOperatorNumberType from '../models/NetworkOperatorNumberType';
import NetworkOperatorPrefix from '../models/NetworkOperatorPrefix';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/mcc';
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const NAME = 'Argentina Republic';
const COUNTRY_CODE = 54;
const CONTINENT = 'continent';
const ISO = 'ar';
const ISO3 = 'ARG';
const MNC_LENGTH_MIN = 3;
const MNC_LENGTH_MAX = 3;
const SHORTCODE_LENGTH_MIN = 1;
const SHORTCODE_LENGTH_MAX = 10;
const MNP_COUNTRY = 0;
const MNP_PROVIDER_AVAILABLE = 0;
const CACHE_DURATION = 3;
const DEFAULT_LOOKUP_COST = 10;
const TIMEZONE = 'America/Argentina/Buenos_Aires';
const UTC_SHIFT = -180;
const DAYLIGHT_SHIFT = 0;
const EU_VAT_EXEMPT = false;
const INT_VAT_EXEMPT = false;

let country, networkOperator, networkOperatorNumberType;

(async () => {
  await Country.deleteMany({});

  country = await Country.findOne({countryCode: COUNTRY_CODE});
  if (!country) {
    country = new Country({
      name: NAME,
      countryCode: COUNTRY_CODE,
      continent: CONTINENT,
      iso: ISO,
      iso3: ISO3,
      mncLengthMin: MNC_LENGTH_MIN,
      mncLengthMax: MNC_LENGTH_MAX,
      shortcodeLengthMin: SHORTCODE_LENGTH_MIN,
      shortcodeLengthMax: SHORTCODE_LENGTH_MAX,
      mnpCountry: MNP_COUNTRY,
      mnpProviderAvailable: MNP_PROVIDER_AVAILABLE,
      cacheDuration: CACHE_DURATION,
      defaultLookupCost: DEFAULT_LOOKUP_COST,
      timezone: TIMEZONE,
      utcShift: UTC_SHIFT,
      daylightShift: DAYLIGHT_SHIFT,
      euVatExempt: EU_VAT_EXEMPT,
      intVatExempt: INT_VAT_EXEMPT
    });

    await country.save();
  }

  // add NetworkOperator
  await NetworkOperator.deleteMany({});

  networkOperator = new NetworkOperator({
    name: '3/Orange/One Connect (Austria)',
    country: country._id,
    virtual: 0,
    parent: '',
    unknown: false,
    visible: true,
    systemInsertUpdate: false,
    marketShare: 11,
    subscribers: 123,
    comment: '16_04_20:Operator filters on valid A1 source address. Messages with these senderID will not deliver.',
    activeInPricing: false,
    premiumNumbers: 0,
    failedOperator: false
  });

  await networkOperator.save();

  console.log('3/Orange/One Connect (Austria)');

  // add NetworkOperatorData
  await NetworkOperatorData.deleteMany({});

  const networkOperatorData = new NetworkOperatorData({
    country: country._id,
    networkOperator: networkOperator._id,
    name: 'Yorkville Telephone Cooperative',
    mcc: 311,
    mnc: 390,
    mncLong: 390,
    imsi: 722341,
    defaultMnc: false,
    preferredNetwork: true
  });

  await networkOperatorData.save();

  console.log('Yorkville Telephone Cooperative');

  // add NetworkOperatorNumberType
  await NetworkOperatorNumberType.deleteMany({});

  networkOperatorNumberType = new NetworkOperatorNumberType({
    name: 'mobile'
  });

  await networkOperatorNumberType.save();

  console.log('mobile');

  // add NetworkOperatorPrefix
  await NetworkOperatorPrefix.deleteMany({});

  const networkOperatorPrefix = new NetworkOperatorPrefix({
    networkOperator: networkOperator._id,
    country: country._id,
    prefix: '49151%',
    prefixMin: 0,
    prefixMax: 25,
    networkOperatorNumberType: networkOperatorNumberType._id,
    systemInsertUpdate: false
  });

  await networkOperatorPrefix.save();

  console.log('49151%');
})();
