function showInfoMsg(title,text) {
  swal(title,text,"success");
}

function showErrorMsg(title,text) {
  swal(title,text,"error");
}

        $(function () {
           GetCountries();
            GetStates();
            GetCities();
			
			$("#check").click(function() {
			     var country=$("#country :selected").text();
				 var state=$("#state :selected").text();
				 var city=$("#city :selected").text();
				   showInfoMsg("Information","Country: "+country+", State: "+state+", City: "+city+"");
				 
			});
		
		    $( "#country" ).addClass("overflow");
			
			$("#check").button({
			     icons: {
				    primary: "ui-icon-check"
				 }
			});
        });
		
        function GetCountries() {
            $.ajax({
                url: "http://api.geonames.org/countryInfoJSON?&lang=en&style=full&username=ximademo",
                contentType: "application/json; charset=utf-8",
				username: "demo",
				style:"full",
				lang:"en",
                dataType: "jsonp",
                success: function (data) {
                    $("#ddlCountry").append($('<option />', { value: -1, text: 'Select Country' }));
                    $(data.geonames).each(function (index, item) {
                        $("#country").append($('<option />', { value: item.geonameId, text: item.countryName }));
                    });
                },
                error: function (data) {
                    alert("Failed to get countries.");
                }
            });
        }
		
		function GetCities() {
            $("#state").change(function () {
                GetChildren($(this).val(),"Cities", $("#city"));
            });
        };

        function GetChildren(geoNameId, childType, ddlSelector) {
            $.ajax({
                type: "GET",
                url: "http://api.geonames.org/childrenJSON?geonameId=" + geoNameId + "&username=ximademo",
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {
                    $(ddlSelector).empty();
                    $(ddlSelector).append($('<option />', { value: -1, text: 'Select ' + childType }));
                    $(data.geonames).each(function (index, item) {
                        $(ddlSelector).append($('<option />', { value: item.geonameId, text: item.name }));
                    });
                },
                error: function (data) {
                    alert("failed to get data");
                }
            });
}

         function GetStates() {
            $("#country").change(function () {
                GetChildren($(this).val(), "States", $("#state"));
            });
        }
