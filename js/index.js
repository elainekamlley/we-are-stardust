//Create today's date
// Why: to pass in a default date if no date is set by the user
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
  dd = '0'+dd
}

if(mm<10) {
  mm = '0'+mm
} 
today = yyyy + '-' + mm + '-' + dd;

// API varibles to build url
// Why: to make things easier to read in the function below
const url = "https://api.nasa.gov/planetary/apod";
const api_key = "QgDMI1o3R1ZRi108ixVQ9g1TBXgnE22ClPQpB5O9";

// Function to pass urls to ajax request
//Why: Creating the if statement builds the url variable for any date input to pass the url into the API call
function myFunction() {
  var x = document.getElementById("myDate");    
  if (x.value != ""){
    key = url + "?api_key=" + api_key + "&date=" + x.value;
    }
  else {
    key = url + "?api_key=" + api_key + "&date=" + today;
  } 

  $.ajax({
    url: key,
    success: function(result){
      if("copyright" in result) {
          $("#copyright").text("Image Credits: " + result.copyright);
        }
        else {
          $("#copyright").text("Image Credits: " + "Public Domain");
        }
        
        if(result.media_type == "video") {
          $("#apod_img_id").css("display", "none"); 
          $("#apod_vid_id").attr("src", result.url);
        }
        else {
          $("#apod_vid_id").css("display", "none"); 
          $("#apod_img_id").attr("src", result.url);
        } 
        $("#apod_explaination").text(result.explanation);
        $("#apod_title").text(result.title);
      }
    });
}
