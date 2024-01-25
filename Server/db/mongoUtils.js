const mongoose = require('mongoose');
const url = "mongodb+srv://saanjeev:saanjeev@cluster0.iqret.mongodb.net/Chat____APP"
// mongodb+srv://saanjeev:qwerty123@cluster0.iqret.mongodb.net/challenge

function mongooseConnect(){
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify : false
    }).then(res =>{
        console.log("Mongoose Connected")
    })
    .catch(err => console.log(err))
}


module.exports = { mongooseConnect }
