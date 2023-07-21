require("dotenv").config();

const config = {
  mongodb: {
    url: process.env.MONGODB_CONNECTION_STR_TEST,
    databaseName: "testDB", 

    options: {
      ssl: true,
      sslValidate: true,
      sslCA: './testDBmongoCA.pem',
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      connectTimeoutMS: 60000, // increase connection timeout to 1 mints
      socketTimeoutMS: 60000, // increase socket timeout to 1 mints
    }
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  moduleSystem: 'commonjs',

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false,
};

module.exports = config;
