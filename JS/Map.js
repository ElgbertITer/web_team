var lc = document.getElementById("location");
  function getLocation() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (position) {
      var lng = position.longitude;
      var lat = position.latitude;
      var point = new BMap.Point(lng, lat);
      var geoc = new BMap.Geocoder();
      geoc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents;
        var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
        // console.log(address);测试用
        lc.innerText = address;
      });
    }, function () {
      lc.innerText = "获取位置失败！";
  });
}
window.onload = getLocation;