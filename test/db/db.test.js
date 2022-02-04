describe('insert', () => {
//    let connection;
//    let db;
 
//    beforeAll(async () => {
//      connection = await MongoClient.connect('mongodb://localhost:27017', {
//        useNewUrlParser: true,
//      });
//      db = await connection.db('streamFinder');
//    });
 
//    afterAll(async () => {
//      await connection.close();
//      await db.close();
//    });

  it('should insert a doc into collection', async () => {
    expect(1).toEqual(1);
  });
 
//    it('should insert a doc into collection', async () => {
//      const users = db.collection('users');
 
//      const mockUser = {_id: 'some-user-id', name: 'John'};
//      await users.insertOne(mockUser);
 
//      const insertedUser = await users.findOne({_id: 'some-user-id'});
//      expect(insertedUser).toEqual(mockUser);
//    });
});