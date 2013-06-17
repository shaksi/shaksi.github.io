function style_size(size, height) {
  var result = ((parseInt(size)+10) * height) + (height *5);
  return result;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

  $(document).ready(function() {
    var insta_container = $(".media-grid")
      , vertical_images = 2
      , horizontal_images = 2
      , image_size = 100
      , myHash =  'RedBull'
      , insta_next_url;  

    if (window.location.pathname.length>1) {
         var pathArray = window.location.pathname.split( '/' );  
    
         var myPath = pathArray[2].split(":");
     
          if(typeof myPath[1] == 'string') myHash = myPath[1];  
  
          var s = getUrlVars()["s"];
          var w = getUrlVars()["w"];
          var h = getUrlVars()["h"];

         if (isNumber(s)) image_size = s  ;
         if (isNumber(w)) horizontal_images = w  ;
         if (isNumber(h)) vertical_images = h  ;
     }
    //style the div based on the number of images and image_size
    $(".main").css({
        "height": style_size(image_size, vertical_images),
        "width":  style_size(image_size, horizontal_images),
      });
   
    
    insta_container.instagram({
        hash: myHash
      , clientId : '3099c5030c0d45da809db1f8f4c83e6b'
      , showNo : vertical_images*horizontal_images
      , image_type:'low_resolution'
      , image_size: image_size
      , onComplete : function (photos, data) {
        insta_next_url = data.pagination.next_url
      }
    })

    $('button').on('click', function(){
      var 
        button = $(this)
      , text = button.text()

      if (button.text() != 'Loading…'){
        button.text('Loading…')
        insta_container.instagram({
            next_url : insta_next_url
          , showNo: vertical_images*horizontal_images
          , image_type:'low_resolution'
          , image_size: image_size
          , onComplete : function(photos, data) {
            insta_next_url = data.pagination.next_url
            button.text(text)
          }
        })
      }       
    })
  });