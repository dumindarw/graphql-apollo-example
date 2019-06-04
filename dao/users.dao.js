let users;

export default class UsersDAO {

  static async injectDB(db) {

    try {
      users = await db.collection("users");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async getAllUsers() {
    return await users.find({}/*, { projection: { 'username' : 1, 'nic' : 1, '_id': 0 }}*/
    ).toArray();
  }

  static async getUserByUsername(username) {
    return await users.findOne({ 'username': username });
  }

  static async addNewUser(userObj) {
    return await users.insertOne(userObj.user);
  }

  /*
{ lastErrorObject: { n: 1, updatedExisting: true },
  value:
   { _id: 5cf6a37be972dd1e4fa62c44,
     username: 'dum7',
     firstname: 'Duminda2',
     lastname: 'Wanninayake',
     password: 'abc123',
     nic: '870750986V',
     deviceid: '1234567',
     email: 'deemind@gmail.com',
     tp: '0779906999',
     location: { type: 'Point', coordinates: [Array] },
     currentaddr: { district: 'Jaffna', dsdivision: 'Periamia' },
     verified: false,
     blackListed: false },
  ok: 1,
  operationTime:
   Timestamp { _bsontype: 'Timestamp', low_: 3, high_: 1559669621 },
  '$clusterTime':
   { clusterTime:
      Timestamp { _bsontype: 'Timestamp', low_: 3, high_: 1559669621 },
     signature: { hash: [Binary], keyId: [Long] } } }

  */

  static async updateUser(username, firstname, lastname) {
    return await users.findOneAndUpdate({
      username: username
    }, {
      $set: {
        firstname: firstname,
        lastname: lastname
      }
      })
  }

  static async deleteUser(username) {
    return await users.findOneAndDelete({
      username: username
    })
  }

}