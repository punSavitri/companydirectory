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
              "</td><td><a href='' data-role='update' data-id=" +
              result.data[i].id +
              " id='editPersonnel' class='line-dark' title='Edit/Update Data' data-bs-toggle='tooltip'><i class='fa-solid fa-pen-to-square  fs-5 me-3'  style='color:orange'></i></a><a href='' id='deletePersonnel' class='line-dark' title='Delete Data' data-bs-toggle='tooltip'><i class='fa-solid fa-trash fs-5'style='color:red'></i></a> </td></tr>"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  }
  loadPersonnelTable();

  //insert/add personnel
  $("#btnadd").click(function (event) {
    event.preventDefault();
    //get input value from user
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var jobtitle = $("#jobtitle").val();
    var emailid = $("#emailid").val();
    var departmentid = $("#departmentid").val();

    //check form validation
    if (firstname == "") {
      alert("First name is required.");
    } else if (lastname == "") {
      alert("Last name is required.");
    } else if (jobtitle == "") {
      alert("Job title is required.");
    } else if (emailid == "") {
      alert("Email id is required.");
    } else if (departmentid == "") {
      alert("Department id is required.");
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
          //display added data on table
          loadPersonnelTable();
          $("#messageSuccess").html("*Data successfully inserted.");
          $("#addpersonnelForm").trigger("reset");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.textStatus);
        },
      });
    }
  });

  // update personnel details

  //delete data by id
  $("#deletePersonnel").click(function () {
    $.ajax({
      url: "php/deletePersonnelByID.php",
      type: "POST",
      data: {
        id: $("#personnelId").val(),
      },

      success: function (data) {
        console.log(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
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
  //display all department on website as page load
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
              "</td><td><a href='#' id='editdepartmentModal'class='line-dark' title='Edit/Update Data' data-bs-toggle='tooltip'><i class='fa-solid fa-pen-to-square  fs-5 me-3'  style='color:orange'></i></a><a href='#' id='deleteDepartmentBtn'class='line-dark' title='Delete Data' data-bs-toggle='tooltip'><i class='fa-solid fa-trash fs-5'style='color:red'></i></a> </td></tr>"
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

  //insert/add department on database
  $("#add").on("click", function (e) {
    e.preventDefault();

    var departName = $("#depart_name").val();
    var locationid = $("#location_id").val();
    if (departName == "") {
      alert("Department name is required.");
    } else if (locationid == "") {
      alert("Location ID is required.");
    } else {
      $.ajax({
        url: "php/insertDepartment.php",
        type: "POST",
        data: {
          name: departName,
          locationID: locationid,
        },
        success: function (data) {
          console.log(data);
          loadTable();
          $("#message-success").html("*Data successfully inserted. ");
          $("#form").trigger("reset");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.textStatus);
        },
      });
    }
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

  // insert/add location in database
  $("#add_location_btn").on("click", (event) => {
    event.preventDefault();
    var locationName = $("#location_name").val();
    if (locationName == "") {
      alert("Location name is required.");
    } else {
      $.ajax({
        url: "php/insertLocation.php",
        type: "GET",
        dataType: "json",
        data: {
          name: locationName,
        },
        success: function (data) {
          console.log(data);
          //display on website
          loadLocation();
          $("#msg-success").html("Data successfully inserted.");
          $("#locationForm").trigger("reset");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.textStatus);
        },
      });
    }
  });
});
