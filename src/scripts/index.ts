import mongoose from 'mongoose';
import Country from '../models/Country';
import NetworkOperator from '../models/NetworkOperator';
import NetworkOperatorData from '../models/NetworkOperatorData';
import NetworkOperatorNumberType from '../models/NetworkOperatorNumberType';
import NetworkOperatorPrefix from '../models/NetworkOperatorPrefix';
import * as fs from 'fs';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/mcc';
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

let country, networkOperator, networkOperatorData, networkOperatorPrefix, networkOperatorNumberType;
const countryIds = [], networkOperatorIds = [], networkOperatorDataIds = [], networkOperatorPrefixIds = [], networkOperatorNumberTypeIds = [];

(async () => {
  await Country.deleteMany({});

  await fs.readFile('F:\\work\\MEMBERSHIP\\workspace\\MCC\\countries.json', 'utf-8', async function (err, data) {
    if (err) throw err;
    const dbData = JSON.parse(data);
    for (const idx in dbData) {
      const {id, ...rowData} = dbData[idx];
      country = new Country(rowData);

      await country.save();

      await countryIds.push({
        _id: country._id,
        id
      });
    }
    await console.log('country imported');

    // add NetworkOperator
    await NetworkOperator.deleteMany({});

    await fs.readFile('F:\\work\\MEMBERSHIP\\workspace\\MCC\\network_operators.json', 'utf-8', async function (err, data) {
      if (err) throw err;
      const dbData = JSON.parse(data);
      for (const idx in dbData) {
        const {id, ...rowData} = dbData[idx];

        networkOperator = new NetworkOperator({
          ...rowData,
          country: countryIds.find((country: any) => country.id === rowData.countries_id)._id
        });

        await networkOperator.save();

        await networkOperatorIds.push({
          _id: networkOperator._id,
          id
        });
      }

      await console.log('networkOperator imported');

      // add NetworkOperatorData
      await NetworkOperatorData.deleteMany({});

      await fs.readFile('F:\\work\\MEMBERSHIP\\workspace\\MCC\\network_operator_data.json', 'utf-8', async function (err, data) {
        if (err) throw err;
        const dbData = JSON.parse(data);
        for (const idx in dbData) {
          const {id, ...rowData} = dbData[idx];

          networkOperatorData = new NetworkOperatorData({
            ...rowData,
            country: countryIds.find((country: any) => country.id === rowData.countries_id)._id,
            networkOperatorData: networkOperatorIds.find((networkOperator: any) => networkOperator.id === rowData.network_operators_id)._id
          });

          await networkOperatorData.save();

          await networkOperatorDataIds.push({
            _id: networkOperatorData._id,
            id
          });
        }

        await console.log('networkOperatorData imported');

        // add NetworkOperatorNumberType
        await NetworkOperatorNumberType.deleteMany({});

        await fs.readFile('F:\\work\\MEMBERSHIP\\workspace\\MCC\\network_operator_number_type.json', 'utf-8', async function (err, data) {
          if (err) throw err;
          const dbData = JSON.parse(data);
          for (const idx in dbData) {
            const {id, ...rowData} = dbData[idx];
            networkOperatorNumberType = new NetworkOperatorNumberType({
              ...rowData
            });

            await networkOperatorNumberType.save();

            await networkOperatorNumberTypeIds.push({
              _id: networkOperatorNumberType._id,
              id
            });
          }

          await console.log('networkOperatorNumberType imported');

          // add NetworkOperatorPrefix
          await NetworkOperatorPrefix.deleteMany({});

          await fs.readFile('F:\\work\\MEMBERSHIP\\workspace\\MCC\\network_operator_prefixes.json', 'utf-8', async function (err, data) {
            if (err) throw err;
            const dbData = JSON.parse(data);
            for (const idx in dbData) {
              const {id, ...rowData} = dbData[idx];
              networkOperatorPrefix = new NetworkOperatorPrefix({
                ...rowData,
                networkOperator: networkOperatorIds.find((networkOperator: any) => networkOperator.id === rowData.network_operators_id)._id,
                country: countryIds.find((country: any) => country.id === rowData.countries_id)._id,
                networkOperatorNumberType: networkOperatorNumberTypeIds.find((networkOperatorNumberType: any) => networkOperatorNumberType.id === rowData.network_operator_number_types_id)._id
              });

              await networkOperatorPrefix.save();

              await networkOperatorPrefixIds.push({
                _id: networkOperatorPrefix._id,
                id
              });
            }

            await console.log('networkOperatorPrefix imported');
          });
        });
      });
    });
  });

  
})();
