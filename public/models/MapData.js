const mongoose = require('mongoose');


const uri = 'mongodb+srv://vidhya:kasthoori@tracker.ukehkbx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.on('error', (err) => {
    console.log("Error", err);
})

db.once('open', () => {
    console.log("Database Connection Established Successfully");
})
const myDataSchema = new mongoose.Schema({
    dateTime: {
    type: Date,
    required: true
    },
  magnitude: {
    type: Number,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longtitude: {
    type: Number,
    required: true
  }
});

const MyData = mongoose.model('MyData', myDataSchema);

module.exports=MyData