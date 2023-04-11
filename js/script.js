$(document).ready(function () {
  //personnel table
  //show personnel database as page load
  function loadPersonnelTable() {
    $.ajax({
      type: "GET",
      url: "php/getAllPersonnel.php",
      dataType: "json",
      success: function (result) {
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
          $("#output").append(
            "<tr><td>" +
              result.data[i].id +
              "</td><td>" +
              result.data[i].firstName +
              "</td><td>" +
              result.data[i].lastName +
              "</td><td>" +
              result.data[i].email +
              "</td><td>" +
              result.data[i].departmentID +
              "</td><td><a href='' id='editPersonnel' class='line-dark'><i class='fa-solid fa-pen-to-square  fs-5 me-3'  style='color:orange'></i></a><a href='' id='deletePersonnel' class='line-dark'><i class='fa-solid fa-trash fs-5'style='color:red'></i></a> </td></tr>"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  }
  loadPersonnelTable();

  //insert personnel details
  //insert personnel  on personnel table
  $("#addpersonnelBtn").on("click", function (e) {
    e.preventDefault();
    $("#addpersonnelModal").modal("show");

    //get input field value from user
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var jobtitle = $("#jobtitle").val();
    var emailid = $("#emailid").val();
    var departmentid = $("#departmentid").val();

    //check form validation
    if (
      firstname == "" &&
      lastname == "" &&
      jobtitle == "" &&
      emailid == "" &&
      departmentid == ""
    ) {
      $("#messageError").html("*Please fill all required field.");
    } else {
      $.ajax({
        url: "php/insertPersonnel.php",
        type: "POST",
        dataType: "json",
        data: {
          firstName: firstname,
          lastName: lastname,
          jobTitle: jobtitle,
          email: emailid,
          departmentID: departmentid,
        },
        success: function (data) {
          console.log(data);

          // //check form validation
          loadPersonnelTable();

          $("#messageSuccess").html("*Data successfully inserted. ");

          $("#addpersonnelForm").trigger("reset");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.textStatus);
        },
      });
    }
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
            $("#personnelModal").modal("show");
            $("#search").val("");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      } else {
        $("#message").html("*Please fill all required field.");
      }
    });
  });

  // department table
  //load department database as page load
  function loadTable() {
    $.ajax({
      type: "GET",
      url: "php/getAllDepartments.php",
      dataType: "json",
      success: function (result) {
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
          $("#load-data").append(
            "<tr><td>" +
              result.data[i].id +
              "</td><td>" +
              result.data[i].name +
              "</td><td>" +
              result.data[i].locationID +
              "</td><td><a href='#' id='editBtn'class='line-dark'><i class='fa-solid fa-pen-to-square  fs-5 me-3'  style='color:orange'></i></a><a href='#' class='line-dark'><i class='fa-solid fa-trash fs-5'style='color:red'></i></a> </td></tr>"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  }
  //display table on page load
  loadTable();

  //insert department on database
  $("#adddepartmentBtn").on("click", function (e) {
    e.preventDefault();
    $("#adddepartmentModal").modal("show");
    var departName = $("#depart_name").val();
    var locationid = $("#location_id").val();

    $.ajax({
      url: "php/insertDepartment.php",
      type: "POST",
      data: {
        name: departName,
        locationID: locationid,
      },
      success: function (data) {
        console.log(data);
        if (departName == "" || locationid == "") {
          $("#message-error").html("*Please fill all required field.");
        } else {
          loadTable();
          $("#message-success").html("*Data successfully inserted. ");

          $("#adddepartmentForm").trigger("reset");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });

  //edit records

  $("#editBtn").on("click", function () {
    $("#editModal").show();
  });

  //Table =>location
  // show all location on bootstrap cards
  function loadLocation() {
    $.ajax({
      type: "GET",
      url: "php/getAllLocations.php",
      dataType: "json",
      success: function (output) {
        console.log(output);

        for (var i = 0; i < output.data.length; i++) {
          var location = output.data[i].id;
          var locationName = output.data[i].name;
          $(".card").append(`<h4 class="card-title">${location}</h4>
          <h4 class="card-title">${locationName}</h4>`);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  }
  loadLocation();

  // insert location
  $("#add_location_btn").on("click", () => {
    $("#submit").on("click", () => {
      var input = $("#location_name").val();
      if (input != "") {
        $.ajax({
          url: "php/insertLocation.php",
          type: "GET",
          dataType: "json",
          data: {
            name: input,
          },
          success: function (data) {
            console.log(data);
            // $("#addLocationModal").modal("show");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      } else {
        alert("Data insertion failed");
      }
    });
  });
});
