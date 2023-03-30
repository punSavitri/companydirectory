$(document).ready(function () {
  //populate location
  $.ajax({
    type: "GET",
    url: "php/getAllLocations.php",
    dataType: "json",
    success: function (output) {
      console.log(output);
      for (var i = 0; i < output.data.length; i++) {
        $("#select_location").append(
          `<option value="${output.data[i].id}">${output.data[i].name}</option>`
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.textStatus);
    },
  });

  //populate department drop down list
  $.ajax({
    type: "GET",
    url: "php/getAllDepartments.php",
    dataType: "json",
    success: function (result) {
      console.log(result);
      for (var i = 0; i < result.data.length; i++) {
        $("#select_department").append(
          `<option value="${result.data[i].id}">${result.data[i].name}</option>`
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.textStatus);
    },
  });

  //get  personnel details by ID
  $("#search").keyup(function () {
    var input = $(this).val();
    // alert(input);
    $("#searchBtn").click(function () {
      //checking if the input field is empty
      if (input != "") {
        $.ajax({
          url: "php/getPersonnelByID.php",
          method: "GET",
          success: function (data) {
            console.log(data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      } else {
        // console.log("No data found")
      }
    });
  });
});
