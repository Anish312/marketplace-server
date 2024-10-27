const mongoose = require('mongoose');


function getContextDatabase(dbName) {
  
    const contextDatabase = mongoose.connection.useDb(dbName);

    return contextDatabase
}
module.exports = getContextDatabase