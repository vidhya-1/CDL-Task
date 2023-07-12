
fetch('/api').then(res => res.json())
  .then(data => {
    console.log("client side",data);
    let responseData=data.features
    displayDataOnMap(responseData);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


const displayDataOnMap=(responseData)=>{
    var map = L.map('map').setView([0, 0], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);


  for(var i=0 ;i<responseData.length;i++){
  var item = responseData[i];
  var longitude = item.longtitude
  var latitude = item.latitude
  var region =item.region

  var m = L.marker([latitude, longitude], { 'title': region })
    .bindPopup(region)
    .addTo(map)
  }
}





