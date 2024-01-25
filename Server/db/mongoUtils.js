const mongoose = require('mongoose');
const url = ""


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
