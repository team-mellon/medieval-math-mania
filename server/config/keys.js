var DATABASE_URL = process.env.DATABASE_URL || '192.168.99.100'
dbPassword = `mongodb://${DATABASE_URL}/test?retryWrites=true`;

module.exports = {
    mongoURI: dbPassword
};
