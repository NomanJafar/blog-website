const { PrismaClient } = require('@prisma/client');
const dbContext = new PrismaClient();
module.exports = dbContext;