let users;

export default class UsersDAO {

    static async injectDB(db) {
     
    try {
        users = await db.collection("users");
      } catch (e) {
        console.error(`Unable to establish collection handles in userDAO: ${e}`)
      }
    }

    static async getAllUsers(){

        return await users.find({}/*, { projection: { 'username' : 1, 'nic' : 1, '_id': 0 }}*/
        ).toArray();
    }

}