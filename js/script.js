//global variable
var getdepartmentId;
var idpersonnel;
var delete_id;

$(document).ready(function () {
  //Personnel Table

  //Insert/Add personnel record

  function insertRecord() {
    $("#btnadd").click(function (event) {
      event.preventDefault();

      //get input value from user
      var firstname = $("#firstname").val();
      var lastname = $("#lastname").val();
      var jobtitle = $("#jobtitle").val();
      var emailid = $("#emailid").val();

      var department = $("#select_department").val();

      //email validation
      // var emailid = "";
      // var email_error = "";
      // //email validation
      // if (!filter_var(emailid, FILTER_VALIDATE_EMAIL)) {
      //   emailid = $("#emailid").val();
      //   email_error = "This is an invalid email.";
      // } else {
      //   email_error = "This is valid email";
      // }

      //check form validation
      if (firstname == "") {
        $("#validation_error").append("First name is required.");
        $("#errorModal").modal("show");
      } else if (lastname == "") {
        $("#validation_error").append("last name is required.");
        $("#errorModal").modal("show");
      } else if (jobtitle == "") {
        $("#validation_error").append("Job title is required.");
        $("#errorModal").modal("show");
      } else if (emailid == "") {
        $("#validation_error").append("Email is required.");
        $("#errorModal").modal("show");
      } else if (department == "") {
        $("#validation_error").append("Select Department Name");
        $("#errorModal").modal("show");
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
            departmentID: department,
          },
          success: function (data) {
            console.log(data);
            //display added data on table

            $("#msgSuccess").append("*Data successfully inserted.");
            $("#addpersonnelForm").trigger("reset");
            $("#output").html("");
            loadPersonnelTable();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      }
    });
    $("#button_close").click(function () {
      $("#addpersonnelForm").trigger("reset");
      $("#msgSuccess").append("");
    });
  }
  insertRecord();

  // Department dropdown list for Add Employee
  $.ajax({
    type: "POST",
    url: "php/getAllDepartments.php",
    dataType: "json",
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        $("#select_department").append(
          `<option value="${data.data[i].id}">${data.data[i].name}</option>`
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.textStatus);
    },
  });

  //View record personnel database table
  function loadPersonnelTable() {
    $.ajax({
      type: "POST",
      url: "php/getAllPersonnel.php",
      dataType: "json",
      success: function (result) {
        console.log(result);

        for (var i = 0; i < result.data.length; i++) {
          $("#output").append(
            "<tr><td>" +
              result.data[i].firstName +
              "</td><td>" +
              result.data[i].lastName +
              "</td><td>" +
              result.data[i].jobTitle +
              "</td><td>" +
              result.data[i].email +
              "</td><td>" +
              result.data[i].departmentID +
              "</td><td><button class='btn btn-success btn_edit' id='btn_edit' data-bs-toggle='modal' data-bs-target='#update_personnel_Modal' title='Edit/Update Record' data-id=" +
              result.data[i].id +
              "><i class='fa-solid fa-pen-to-square'></i></button></td><td><button class='btn btn-danger btn_delete' data-bs-toggle='modal' data-bs-target='#deleteModal'    title='Delete Record' id='btn_delete' data-id1=" +
              result.data[i].id +
              "><i class='fa-solid fa-trash'></i></button></td></tr></tbody></table></div></div></div>"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  }
  loadPersonnelTable();

  //Read particualr  record by ID

  $(document).on("click", ".btn_edit", function () {
    //Get id attribute
    idpersonnel = $(this).attr("data-id");
    console.log(idpersonnel);
    $.ajax({
      url: "php/getPersonnelByID.php",
      method: "POST",
      dataType: "json",
      data: {
        id: idpersonnel,
      },
      success: function (data) {
        console.log(data);
        $("#personnelId").val(data.data.personnel[0]["id"]);
        $("#fname").val(data.data.personnel[0]["firstName"]);
        $("#lname").val(data.data.personnel[0]["lastName"]);
        $("#jobTitle").val(data.data.personnel[0]["jobTitle"]);
        $("#email_id").val(data.data.personnel[0]["email"]);
        $(".update_select_department").val(
          data.data.personnel[0]["departmentID"]
        );
        $("#update_personnel_Modal").modal("show");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });

  // Department dropdown list for Edit  personnel
  $.ajax({
    type: "POST",
    url: "php/getAllDepartments.php",
    dataType: "json",
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        $(".update_select_department").append(
          `<option value="${data.data[i].id}">${data.data[i].name}</option>`
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.textStatus);
    },
  });

  // Edit/Update record function
  function updateRecord() {
    $(document).on("click", "#update_button", function () {
      var update_id = $("#personnelId").val();
      var update_firstname = $("#fname").val();
      var update_lastname = $("#lname").val();
      var update_jobtitle = $("#jobTitle").val();
      var update_emailid = $("#email_id").val();
      var update_departmentid = $(".update_select_department").val();
      console.log(
        update_id,
        update_firstname,
        update_lastname,
        update_jobtitle,
        update_emailid,
        update_departmentid
      );

      //Check form validation
      if (
        update_firstname != "" ||
        update_lastname != "" ||
        update_jobtitle != "" ||
        update_emailid != "" ||
        update_departmentid != " "
      ) {
        $.ajax({
          url: "php/editPersonnel.php",
          method: "POST",
          dataType: "JSON",
          data: {
            id: update_id,
            firstName: update_firstname,
            lastName: update_lastname,
            jobTitle: update_jobtitle,
            email: update_emailid,
            departmentID: update_departmentid,
          },
          success: function (data) {
            console.log(data);
            $("#update_message").html("Data has been successfully updated.");

            $("#update_personnel_Modal").modal("show");
            $("#output").html("");
            loadPersonnelTable();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      }
    });
    $("#update_close_btn").click(function () {
      $("#updateForm").trigger("reset");
      $("#update_message").append("");
    });
  }
  updateRecord();

  //*******Delete Personnel record function*****//

  //getting personnel id from delete button
  $(document).on("click", "#btn_delete", function () {
    console.log("testing btn");

    delete_id = $(this).attr("data-id1");
    console.log(delete_id);
  });

  $("#delete_button").click(function () {
    var id = delete_id;
    console.log(id);

    $.ajax({
      url: "php/deletePersonnelByID.php",
      method: "POST",
      dataType: "json",
      data: {
        id: id,
      },
      success: function (data) {
        $("#delete_success_message").html("Data deleted.");
        $("#deleteModal").modal("show");
        $("#output").html("");
        loadPersonnelTable();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });
  $("#closebtn").click(function () {
    $("#delete_success_message").html("");
  });

  //*******delete record function end*****//

  //Search personnel details by firstname and lastname from search box

  $("#live_search").keyup(function () {
    var searchTerm = $(this).val();
    console.log(searchTerm);

    if (searchTerm != "") {
      $.ajax({
        url: "php/getAll.php",
        method: "POST",
        dataType: "json",
        data: {
          search_term: searchTerm,
        },
        success: function (data) {
          console.log(data);

          $("#search_term_output").html(
            "<div class='container'><div class='row g-2'>   <div class='col-md-6 col-lg-12'><table class='table table-responsive-md table-hover table-striped table-bordered text-center'><thead><tr><th class='th-sm'>First Name</th><th class='th-sm'>Last Name</th><th class='th-sm'>Job Title</th><th class='th-sm'>Email</th><th  class='th-sm'>Department</th><th class='th-sm'>Location</th></tr></thead><tbody><tr><td>" +
              data.data[0].firstName +
              "</td><td>" +
              data.data[0].lastName +
              "</td><td>" +
              data.data[0].jobTitle +
              "</td><td>" +
              data.data[0].email +
              "</td><td>" +
              data.data[0].department +
              "</td><td>" +
              data.data[0].location +
              "</td></tr></tbody></table></div></div></div>"
          );
        },
      });
    } else {
      $("#search_term_output").html("");
    }
  });

  //********************End of contact page******************************************//

  ////////////////////// Department page start /////////////////////////////////////////

  //View all department in table as page load
  function loadDeptTable() {
    $.ajax({
      type: "POST",
      url: "php/getAllDepartments.php",
      dataType: "json",
      success: function (result) {
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
          $("#load-data").append(
            "<tr><td>" +
              result.data[i].name +
              "</td><td>" +
              result.data[i].locationID +
              "</td><td><button class='btn btn-success edit_depart_button'  title='Edit/Update Record'  data-bs-toggle='modal' data-bs-target='#editdepartmentModal' data-depart_id=" +
              result.data[i].id +
              "><i class='fa-solid fa-pen-to-square'></i></button></td><td><button class='btn btn-danger' id='delete_depart_button' data-bs-toggle='modal' data-bs-target='#deleteDepartmentModal' title='Delete Record' data-depart_id1=" +
              result.data[i].id +
              "><i class='fa-solid fa-trash'></i></button></td></tr>"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  }
  loadDeptTable();
  // ..............................Add Department Code Start.............................//

  // Location dropdown list select option

  $.ajax({
    type: "POST",
    url: "php/getAllLocations.php",
    dataType: "json",
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        $(".locationName").append(
          `<option value="${data.data[i].id}">${data.data[i].name}</option>`
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.textStatus);
    },
  });
  //Insert/Add Department on database
  function insert_department() {
    $("#add").on("click", function (e) {
      e.preventDefault();

      //get input value from user

      var departName = $("#Department").val();
      var locationid = $(".locationName").val();

      //check form validation
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
            $("#message-success").append("*Data successfully inserted. ");
            $("#form").trigger("reset");
            $("#load-data").html("");
            loadDeptTable();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      }
    });

    $("#depart_Close_btn").click(function () {
      $("#form").trigger("reset");
      $("#message-success").append("");
    });
  }
  insert_department();

  // ..pre-populate select department dropdown.......//

  $.ajax({
    url: "php/getAllDepartments.php",
    method: "POST",
    dataType: "json",
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        $(".edit_depart_name").append(
          `<option value="${data.data[i].id}">${data.data[i].name}</option>`
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.textStatus);
    },
  });

  // adding click event to Edit button/icon on page

  $(document).on("click", ".edit_depart_button", function () {
    getdepartmentId = $(this).data("depart_id");
    console.log(getdepartmentId);

    // get department detail by id and show on modal

    $.ajax({
      url: "php/getDepartmentByID.php",
      method: "POST",
      dataType: "json",
      data: {
        id: getdepartmentId,
      },
      success: function (data) {
        console.log(data);
        $("#update_id").val(data.data[0]["id"]);
        $("#deptName").val(data.data[0]["name"]); //
        $(".update_location_ID").val(data.data[0]["locationID"]);
        $("#editdepartmentModal").modal("show");
      },
    });
  });

  //adding event to edit button to update details

  $("#update_btn").click(function () {
    var updateDepartmentName = $("#deptName").val();
    var updateLocationID = $(".update_location_ID").val();

    // check form validation if any field is empty
    if (updateDepartmentName == "") {
      alert("Department name is required.");
    } else if (updateLocationID == "") {
      alert("Location ID is required.");
    } else {
      $.ajax({
        url: "php/editDepartment.php",
        method: "POST",
        dataType: "json",
        data: {
          id: getdepartmentId,
          name: updateDepartmentName,
          locationID: updateLocationID,
        },
        success: function (data) {
          console.log(data);

          $("#message").html("Data has been successfully updated.");
          $("#update_form").trigger("reset");
          $("#load-data").html("");
          loadDeptTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.textStatus);
        },
      });
    }
  });
  $("#update_closeBtn").click(function () {
    $("#update_form").trigger("reset");
    $("#message").html("");
  });

  // update department dropdown select location id option

  $.ajax({
    method: "POST",
    url: "php/getAllLocations.php",
    dataType: "json",
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        $(".update_location_ID").append(
          `<option value="${data.data[i].id}">${data.data[i].name}</option>`
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.textStatus);
    },
  });

  //...................................Delete  Department Record........................//

  // adding event to delete button/icon on page to get dept id

  $(document).on("click", "#delete_depart_button", function () {
    //deptId global variable
    deptid = $(this).data("depart_id1");
    console.log(deptid);

    //checking number of employees in the department before to delete department
    $.ajax({
      url: "php/countEmployeeInDepartment.php",
      type: "POST",
      dataType: "json",
      data: {
        id: deptid,
      },
      success: function (data) {
        console.log(data);
        if (data.data > 0) {
          $("#Message").html("Data can not be deleted.");
        } else {
          // adding event to delete record if there is no department in the location

          $("#deleteButton").click(function () {
            $.ajax({
              url: "php/deleteDepartmentByID.php",
              type: "POST",
              dataType: "json",
              data: {
                id: deptid,
              },
              success: function (data) {
                console.log(data);
                $("#Message").html("Data deleted.");
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.textStatus);
              },
            });
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });
  $("#closeBtn").click(function () {
    $("#DeleteDeptForm").trigger("reset");
  });

  //////////////////////////  Location page start from here///////////////////////////////

  //View location database on cards ones page load

  function loadLocation() {
    $.ajax({
      url: "php/getAllLocations.php",
      type: "POST",
      dataType: "json",
      success: function (data) {
        console.log(data);
        for (var i = 0; i < data.data.length; i++) {
          $("#row").append(
            "<div class='col-md-6 col-lg-4'><div class='card text-center border-light'  id='card'><div class='card-body bg-light' id='card-body'><p class='card-text text-center' id='card-text'>Location Name :&nbsp;" +
              data.data[i].name +
              "</p></div><div class='card-footer'><button class='btn btn-success me-3 btnedit' id='btnedit' data-bs-toggle='modal' data-bs-target='#editLocationModal' title='Edit/Update Record' data-location-id=" +
              data.data[i].id +
              "><i class='fa-solid fa-pen-to-square'></i></button></td><td><button class='btn btn-danger btndelete' id='btndelete' data-bs-toggle='modal' data-bs-target='#deleteLocationModal'  title='Delete Record' data-location-id1=" +
              data.data[i].id +
              "><i class='fa-solid fa-trash'></i></button></div></div></div>"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  }
  loadLocation();

  // Add location name in database and display on webpage

  $("#add_location_btn").on("click", (event) => {
    event.preventDefault();
    $("#addLocationModal").modal("show");

    //Get input field value from user
    var locationName = $("#location_name").val();

    // Check form validation
    if (locationName == "") {
      alert("Location name is required.");
    } else {
      $.ajax({
        url: "php/insertLocation.php",
        type: "POST",
        dataType: "json",
        data: {
          name: locationName,
        },
        success: function (data) {
          console.log(data);
          //display on website
          $("#msg-success").html("You have successfully inserted data.");
          $("#locationForm").trigger("reset");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.textStatus);
        },
      });
    }
  });

  $("#btnClose").click(function () {
    $("#locationForm").trigger("reset");
    $("#msg-success").html("");
  });

  // Edit location
  //adding event to get id from edit location button
  $(document).on("click", ".btnedit", function () {
    location_id = $(this).data("location-id");
    console.log(location_id);

    //get location detail by id
    $.ajax({
      url: "php/getLocationByID.php",
      method: "POST",
      dataType: "json",
      data: {
        id: location_id,
      },
      success: function (data) {
        console.log(data);
        $("#updateLocation").val(data.data.location[0]["id"]);
        $("#locationname").val(data.data.location[0]["name"]);
        $("#editLocationModal").modal("show");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });

  $.ajax({
    method: "POST",
    url: "php/getAllLocations.php",
    dataType: "json",
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        $("#selectLocation").append(
          `<option value="${data.data[i].id}">${data.data[i].name}</option>`
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.textStatus);
    },
  });

  //adding event to edit button
  $("#editlocbtn").click(function () {
    var location = $("#updateLocation").val();

    var nameLocation = $("#selectLocation").val();

    // //Check form validation if any field is empty
    if (nameLocation == "") {
      alert("Location name is required.");
    } else {
      $.ajax({
        url: "php/editLocation.php",
        method: "POST",
        dataType: "json",
        data: {
          id: location,
          name: nameLocation,
        },
        success: function (data) {
          console.log(data);
          $("#locationform").trigger("reset");
          $("#msg").html("Data has been successfully updated.");
          $("#editLocationModal").modal("show");
        },
      });
    }
  });
  //adding event to close edit form
  $("#Close_Button").click(function () {
    $("#locationform").trigger("reset");
    $("#msg").html("");
  });

  //........DELETE RECORD .......///

  //adding event to get location id from delete button on page

  $(document).on("click", "#btndelete", function () {
    // get the location id ones click on delete button/icon
    var locid = $(this).data("location-id1");
    console.log(locid);

    // checking number of department in particular location before to delete location
    $.ajax({
      url: "php/countDeptInLocation.php",
      method: "POST",
      dataType: "json",
      data: {
        id: locid,
      },
      success: function (data) {
        console.log(data);
        if (data.data > 0) {
          $("#deleteMessage").html("Data cannot be deleted.");
        } else {
          // adding event to delete location if there is no department in that location
          $("#DeleteLocationBtn").click(function () {
            $.ajax({
              url: "php/deleteLocationByID.php",
              type: "POST",
              dataType: "json",
              data: {
                id: locid,
              },
              success: function (data) {
                console.log(data);
                $("#deleteMessage").html("Data deleted.");
              },
            });
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });

  $("#closelocation").click(function () {
    $("#deleteMessage").html("Data deleted.");
    $("#deletelocForm").trigger("reset");
  });

  //document ready()callback function end
});

//global variables
var getdepartmentId; // used in edit department code

var location_id; //used for editing location

var deptid; //used in department delete record
