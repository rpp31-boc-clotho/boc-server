const mongoose = require('mongoose');
require('dotenv').config({ path:__dirname+'/./../../.env' });

 describe("product and style db calls should return the correct data", () => {

    beforeAll(async () => {
      await mongoose.connect(`mongodb://${process.env.auth}@${process.env.mongoIp}/streamFinder?authSource=admin`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      })
    });

    test('fake test', async () => {
      expect(1).toEqual(1);
    });

    // test('db should return all styles for product id 1', async () => {
    //   let productStyles = await getProductStyles(1)

    //   expect(productStyles).toEqual(productStyle1);
    // });

    afterAll(done => {
        mongoose.disconnect();
        done();
    });
 });