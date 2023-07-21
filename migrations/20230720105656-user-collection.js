const COLLECTION_NAME = 'users'
module.exports = {
  async up(db, client) {
    return db.createCollection(COLLECTION_NAME);
  },

  async down(db, client) {
    return db.collection(COLLECTION_NAME).drop();
  }
};
