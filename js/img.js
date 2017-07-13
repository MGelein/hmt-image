var targetString = "http://www.homermultitext.org/iipsrv?OBJ=IIP,1.0&FIF=/project/homer/pyramidal/VenA/FOLIO.tif&RGN=REGION&WID=800&CVT=JPEG"

function loadImage(e){
  //Copy the targetString to the srcString
  var srcString = targetString.substr(0);
  //get the value from the urnfield
  var urn = $('#urnField').val();
  //only continue if the urn is valid
  if(urn.indexOf('urn:cite2:hmt:vaimg.2017a:') == -1) return;

  //get the folio from the urn
  var folio = urn.substring(urn.lastIndexOf(':') + 1, urn.lastIndexOf('@'));
  //get the ROI from the urn
  var roi = urn.substr(urn.lastIndexOf('@') + 1);

  //create the image source srcString
  srcString = srcString.replace('REGION', roi);
  srcString = srcString.replace('FOLIO', folio);

  //set the loaded image
  $('#loadedImage').attr('src', srcString);
  //set the loaded image download link
  $('#downloadLink').attr('href', srcString);
  $('#downloadLink').attr('download', 'download.jpeg');
  return false;
}

/**Copies text to clipboard from the provided element*/
function copyTextToClipboard(){
  var copyText = $('#loadedImage').attr('src');
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = copyText.trim();
  document.body.appendChild(textArea);
  textArea.select();
  try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      if(msg != 'successful'){
        copyText = "ERROR: UNABLE TO COPY";
      }else{
        copyText = 'Copied: ' + copyText;
      }
      showNotif(copyText);
  } catch (err) {
      showNotif("ERROR: UNABLE TO COPY");
  }
  document.body.removeChild(textArea);
}

/*Check for GET parameter on load of page*/
$(document).ready(function(){
  if(params.urn != undefined){
      if(params.urn.indexOf('urn:cite2:hmt:') == -1) return;
      $('#urnField').val(params.urn);
      loadImage();
  }
});


/**
Shows the notification
**/
function showNotif(text){
  $('#notification').removeClass().addClass('showNotification');
  $('#notificationText').html(text);
  setTimeout(function(){
    $('#notification').removeClass().addClass('hideNotification');
  }, 2000);
}

var params={};
window.location.search
  .replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
    params[key] = value;
  }
)
