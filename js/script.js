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

  //showing on table all personnel record
  $.ajax({
    type: "GET",
    url: "php/getAllPersonnel.php",
    dataType: "json",
    success: function (result) {
      console.log(result);
      for (var i = 0; i < result.data.length; i++) {
        $("#pId").append(result.data[i].id);
        $("#pfirstName").append(result.data[i].firstName);
        $("#plastName").append(result.data[i].lastName);
        $("#pEmail").append(result.data[i].email);
        $("#pdepartmentId").append(result.data[i].departmentID);
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
          data: {
            id: input,
          },
          success: function (output) {
            console.log(output);

            $("#id").append(output.data.personnel[0]["id"]);
            $("#firstName").append(output.data.personnel[0]["firstName"]);
            $("#lastName").append(output.data.personnel[0]["lastName"]);
            $("#email").append(output.data.personnel[0]["email"]);
            $("#departmentId").append(output.data.personnel[0]["departmentID"]);
            $("#search").val("");
          },

          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      } else {
        //  console.log("No data found");
      }
    });
  });
});
