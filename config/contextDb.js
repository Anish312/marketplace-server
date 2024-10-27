const mongoose = require('mongoose');


async function contextDb(indentifer) {
    const newDatabaseName = `${indentifer}_db`;
    const contextDatabase = mongoose.connection.useDb(newDatabaseName);

    return newDatabaseName;
}

module.exports = contextDb;
