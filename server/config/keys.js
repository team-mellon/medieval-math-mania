var DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
dbPassword = `mongodb://${DATABASE_URL}/test?retryWrites=true`;

module.exports = {
    mongoURI: dbPassword
};
