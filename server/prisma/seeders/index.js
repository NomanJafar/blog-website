const userSeeder = require('./userSeeder');
const dbContext = require('../../database/dbContext');

const ensureSeeded = (async () => {
    await userSeeder(dbContext);
})();