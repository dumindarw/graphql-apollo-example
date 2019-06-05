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
    return await users.insertOne(userObj);
  }

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