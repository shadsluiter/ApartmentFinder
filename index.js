$(document).ready(function() {
      var apartmentsList = [];
    

    $.ajax({
        url:"http://api.myjson.com/bins/2sadq?pretty=1",
        dataType:"json",
        success: function(response) {
            $.each(response.apartments, function(i, apartment){
                //console.log(i, apartment);
                apartmentsList.push(apartment);
            })
            //console.log(apartmentsList);
        },
        error: function(error) {
            console.log(error);
        }
    });

    $(document).ajaxComplete(function(event, request, settings) {
        showApartments(apartmentsList);
   });


    var showApartments = function (list) {
       
         list.forEach(function(apartment){
            var apartmentClass = apartment.city.toLowerCase().replace(" ","-");
            var listing= "<a href='#' id = " + apartment.id  + " class='list-group-item listings " + apartmentClass + "'><h4 class='list-group-item-heading' data-toggle='modal' data-target='.apartment-modal'>" + apartment.description + "</h4><p class='list-group-item-text'>"+ apartment.bedrooms + " bedroom / " + apartment.price + "/ " + apartment.neighborhood + "</p></a>";
                    $(".apartments").append(listing); 
         });
    } 

    $(".filter").click(function() {
        var city = $(this).attr("id");
        $(".listings").show();
        if (city !== "all")
          $(".listings").not("." + city).css("display","none");
        
        //set the active menu item to blue
        $(".filter").removeClass("active");
        $(this).addClass("active");
    });


    var showMap = function (a) {
        //given a, an apartment in the array, open a google map for the address of a
      
        var id = $(a).parent().attr("id");
        var selectedApartment = $.grep(apartmentsList, function(apartment){
            return apartment.id == id;
        });
        var address = selectedApartment[0].address;
        window.open("https://maps.google.com?q=" + address);
    } 


    previewImage = function(a) {
        var id = $(a).parent().attr("id");
        var selectedApartment = $.grep(apartmentsList, function(apartment){
            return apartment.id == id;
        });
        var address = selectedApartment[0].address.toLowerCase().replace(/ /g,'%20');;
        var imgPrefix = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=";
        var imgPostfix = "&fov=90&heading=235&pitch=10&key=AIzaSyCu_3UKEc0xYJeAU3I49dCTsxMAOpUtv-4";
        var imgURL = imgPrefix + address + imgPostfix;
        
        $("#street-view").attr("src",imgURL);
        $("#address-view").html(selectedApartment[0].address);
        console.log(imgPrefix);
          
    }

    $(document).on("click",".listings h4", function(event) {
        console.log(event.target);  
        previewImage(event.target);
        //showMap(event.target); 
    });

});


