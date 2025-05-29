module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // TODO write your migration here.

    await db
      .collection("users")
      .updateMany(
        {
          $or: [
            { languages: { $exists: false } },
            { university: { $exists: false } },
            { experience: { $exists: false } },
          ],
        },
        { $set: { languages: [], university: [], experience: "" } }
      );
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    await db
      .collection("users")
      .updateMany(
        {},
        { $unset: { languages: [], university: [], experience: "" } }
      );
  },
};
