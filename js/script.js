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
        type: "GET",
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
              "</td><td><a href='' id='editBtn'class='line-dark'><i class='fa-solid fa-pen-to-square  fs-5 me-3'  style='color:orange'></i></a><a href='' class='line-dark'><i class='fa-solid fa-trash fs-5'style='color:red'></i></a> </td></tr>"
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
  // $("#add-button").on("click", function (e) {
  //   e.preventDefault();
  //   var departName = $("#departName").val();
  //   var locationid = $("#locationID").val();

  //   if (departName == "" || locationid == "") {
  //     $("#message-error").html("*Please fill all required field.");
  //   } else {
  //     $.ajax({
  //       url: "php/insertDepartment.php",
  //       type: "POST",
  //       data: {
  //         name: departName,
  //         locationID: locationid,
  //       },
  //       success: function (data) {
  //         console.log(data);
  //         //check form validation
  //         loadTable();
  //         $("#message-success").html("*Data successfully inserted. ");

  //         $("#addForm").trigger("reset");
  //       },
  //       error: function (jqXHR, textStatus, errorThrown) {
  //         console.log(jqXHR.textStatus);
  //       },
  //     });
  // }
  // });

  //edit records

  $("#editBtn").on("click", function () {
    $("#editModal").show();
  });

  //Table =>location
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
});
