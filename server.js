const app = require('./app');
require('dotenv').config()
const connectDb = require('./config/db')
connectDb()


const server = app.listen(process.env.PORT || 8080 ,() => {
    try {
        console.log('listening on port ' + process.env.PORT);
    } catch (error) {
        console.error(error);
    }
}); 

process.on('unhandleRejection', (err) => {
    console.log('error: ' +err)
    console.log('Shutting down')

    server.close(()=> {
        process.exit(1);
    })
})
