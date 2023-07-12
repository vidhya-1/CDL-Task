const  express = require('express')
const app = express()
const axios = require('axios');
const port = process.env.PORT || 3000;
const turf = require('@turf/turf');
const MyData= require("./public/models/MapData");

app.use(express.static(__dirname +'/public'))
const makeApiCall=async()=>
 {
    try {
      // Make the API call to fetch data
      const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
        const responseValue=response.data.Infogempa;
        DbStorage(responseValue.gempa)
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const DbStorage=(geoJSON)=>{
  let responseData=geoJSON
  for(var i=0; i< responseData.length;i++)
  {
  const newData = new MyData({
    dateTime: responseData[i].DateTime,
    region: responseData[i].Wilayah,
    magnitude:responseData[i].Magnitude,
    latitude:parseFloat(responseData[i].Lintang.split(" ")[0]),
    longtitude:parseFloat(responseData[i].Bujur.split(" ")[0])
  });

  newData.save()
    .then((savedData) => {
      console.log('New Data saved successfully:', savedData);
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
  }
  
}

app.get('/api',async (req,res)=>{
 MyData.find().then((records) => {
    if(records.length==0){
      makeApiCall()
    }
    else{
      const geoJSON = turf.featureCollection(records);
      res.json(geoJSON);
    }
  })
  .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving the data.'});
  });
})

app.listen(port, () => console.log(`listening on port ${port}!`))