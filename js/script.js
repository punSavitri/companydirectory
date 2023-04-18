$(document).ready(function () {
  //Personnel Table

  //function show personnel database as page load
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
              "</td><td><button class='btn btn-success' id='btn_edit' data-id=" +
              result.data[i].id +
              "><i class='fa-solid fa-pen-to-square'></i></button></td><td><button class='btn btn-danger' id='btn_delete' data-id1=" +
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
  loadPersonnelTable();

  //Get particular record by ID
  function get_record() {
    $(document).on("click", "#btn_edit", function () {
      //get particular id
      var id = $(this).attr("data-id");
      console.log(id);
      $.ajax({
        url: "php/getPersonnelByID.php",
        method: "POST",
        dataType: "json",
        data: {
          id: id,
        },
        success: function (data) {
          console.log(data);
          $("#personnelId").val(data.data.personnel[0]["id"]);
          $("#fname").val(data.data.personnel[0]["firstName"]);
          $("#lname").val(data.data.personnel[0]["lastName"]);
          $("#jobTitle").val(data.data.personnel[0]["jobTitle"]);
          $("#email_id").val(data.data.personnel[0]["email"]);
          $("#department_ID").val(data.data.personnel[0]["departmentID"]);
          $("#update_personnel_Modal").modal("show");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.textStatus);
        },
      });
    });
  }
  get_record();

  // Edit/Update record function
  function updateRecord() {
    $(document).on("click", "#update_button", function () {
      var update_id = $("#personnelId").val();
      var update_firstname = $("#fname").val();
      var update_lastname = $("#lname").val();
      var update_jobtitle = $("#jobTitle").val();
      var update_emailid = $("#email_id").val();
      var update_departmentid = $("#department_ID").val();
      console.log(
        update_id,
        update_firstname,
        update_lastname,
        update_jobtitle,
        update_emailid,
        update_departmentid
      );

      //check form validation
      if (
        update_firstname == "" &&
        update_lastname == "" &&
        update_jobtitle == "" &&
        update_emailid == "" &&
        update_departmentid == ""
      ) {
        $("#update_error_message").html("Please fill the required field.");
        $("#update_personnel_Modal").modal("show");
      } else {
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
            $("#update_success_message").html(
              "You have successfully update the data."
            );
            $("#update_personnel_Modal").modal("show");
            loadPersonnelTable();
          },
        });
      }
    });
  }
  updateRecord();

  //*******delete record function*****//
  function deleteRecord() {
    $(document).on("click", "#btn_delete", function () {
      console.log("testing btn");

      var delete_id = $(this).attr("data-id1");
      console.log(delete_id);
      $("#deleteModal").modal("show");

      $(document).on("click", "#delete_button", function () {
        $.ajax({
          url: "php/deletePersonnelByID.php",
          method: "POST",
          dataType: "json",
          data: {
            id: delete_id,
          },
          success: function (data) {
            $("#delete_success_message").html(
              "Selected data successfully deleted."
            );
          },
        });
      });
    });
  }
  deleteRecord();
  //*******delete record function end*****//

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

          $("#messageSuccess").html("*Data successfully inserted.");
          $("#addpersonnelForm").trigger("reset");
          loadPersonnelTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.textStatus);
        },
      });
    }
  });

  //search personnel details by ID number
  $(document).on("keyup", "#search", function () {
    var UserId = $(this).val();
    console.log(UserId);
    $(document).on("click", "#searchBtn", function () {
      $("#personnelModal").modal("show");
      //get user id from input field
      if (UserId == "") {
        alert("Employee ID number is required.");
      } else {
        $.ajax({
          url: "php/getPersonnelByID.php",
          method: "POST",
          dataType: "json",
          data: {
            id: UserId,
          },
          success: function (data) {
            console.log(data);
            $("#id").append(data.data.personnel[0].id);
            $("#fullName").append(
              data.data.personnel[0].firstName +
                "&nbsp;" +
                data.data.personnel[0].lastName
            );

            $("#job_title").append(data.data.personnel[0].jobTitle);
            $("#emailId").append(data.data.personnel[0].email);
            $("#departmentId").append(data.data.personnel[0].departmentID);
            $("#search").val("");
            $("#searchForm").trigger("reset");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      }
    });
  });
  //********************End of contact page******************************************//

  ////////////////////// Department page start /////////////////////////////////////////

  //display all department in table as page load
  //function loadTable
  function loadDepartmentTable() {
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
              "</td><td><button class='btn btn-success' id='editDepartmentBtn' data_depart_id=" +
              result.data[i].id +
              "><i class='fa-solid fa-pen-to-square'></i></button></td><td><button class='btn btn-danger' id='deleteDepartmentBtn' data_depart_id1=" +
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
  //display table as the page load
  loadDepartmentTable();

  //Insert/Add Department on database
  $("#add").on("click", function (e) {
    e.preventDefault();

    //get input value from user
    var departName = $("#depart_name").val();
    var locationid = $("#location_id").val();

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
          loadTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.textStatus);
        },
      });
    }
  });

  //Get particular department ID and update ones click on update button
  function getDepartmentByID() {
    $(document).on("click", "#editDepartmentBtn", function () {
      //get particular department id from user
      var department_id = $(this).attr("data_depart_id");
      console.log(department_id);

      //form validation if any field is empty
      if (department_id == "") {
        alert("Please fill the required field.");
      } else {
        $.ajax({
          url: "php/getDepartmentByID.php",
          method: "POST",
          dataType: "json",
          data: {
            id: department_id,
          },
          success: function (data) {
            console.log(data);
            $("#update_id").val(data.data[0]["id"]);
            $("#update_depart_name").val(data.data[0]["name"]);
            $("#update_location_ID").val(data.data[0]["locationID"]);
            $("#editdepartmentModal").modal("show");
            loadDepartmentTable();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      }
    });
  }
  getDepartmentByID();

  //Update Department by id
  function updateDepartmentById() {
    $(document).on("click", "#update_btn", function () {
      var updateId = $("#update_id").val();
      var updateDepartmentName = $("#update_depart_name").val();
      var updateLocationID = $("#update_location_ID").val();
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
            id: updateId,
            name: updateDepartmentName,
            locationID: updateLocationID,
          },
          success: function (data) {
            console.log(data);
            $("#message").html("Data has successfully updated.");
            $("#editdepartmentModal").modal("show");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      }
    });
  }
  updateDepartmentById();

  //Delete Record by ID from database
  function deleteDepartmentRecord() {
    $(document).on("click", "#deleteDepartmentBtn", function () {
      console.log("Testing delete button working or not!!!");
      //get data id attribute
      var dataID = $(this).attr("data_depart_id1");
      console.log(dataID);
      $("#deleteDepartmentModal").modal("show");
      $(document).on("click", "#deleteButton", function () {
        $.ajax({
          url: "php/deleteDepartmentByID.php",
          method: "POST",
          dataType: "json",
          data: {
            id: dataID,
          },
          success: function (data) {
            console.log(data);
            $("#deleteSuccessMessage").html("Selected data deleted.");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      });
    });
  }
  deleteDepartmentRecord();

  /////////////////////////// End of department page here  ///////////////////////////////

  //////////////////////////  Location page start from here///////////////////////////////
  //function to display location on cards
  function displayLocation() {
    $.ajax({
      type: "POST",
      url: "php/getAllLocations.php",
      dataType: "json",
      success: function (data) {
        console.log(data);
        for (var i = 0; i < data.data.length; i++) {
          $("#row").append(
            "<div class='col-md-3'><div class='card text-center border-light'  id='card'><div class='card-body bg-light' id='card-body'><h5 class='card-title text-center' id='card-title'>Location ID :&nbsp;" +
              data.data[i].id +
              "</h5><p class='card-text text-center' id='card-text'>Location :&nbsp;" +
              data.data[i].name +
              "</p></div><div class='card-footer'><button class='btn btn-success me-3' id='btnedit' data_location_id=" +
              data.data[i].id +
              "><i class='fa-solid fa-pen-to-square'></i></button></td><td><button class='btn btn-danger' id='btndelete' data_location_id1=" +
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
  displayLocation();

  // insert/add location in database and display on webpage
  $("#add_location_btn").on("click", (event) => {
    event.preventDefault();
    $("#addLocationModal").modal("show");
    //get input field value from user
    var locationName = $("#location_name").val();
    // check form validation
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
          displayLocation();
          $("#msg-success").html("You have successfully inserted data.");
          $("#locationForm").trigger("reset");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.textStatus);
        },
      });
    }
    $("#btnClose").click(function () {
      $("#locationForm").trigger("reset");
      $("#msg-success").html("");
    });
  });

  //get particular location id and view details
  function getLocationId() {
    $(document).on("click", "#btnedit", function () {
      var location_id = $(this).attr("data_location_id");
      // console.log(location_id);
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
  }
  getLocationId();

  //function UPDATE RECORD///////
  function updateLocationID() {
    $(document).on("click", "#updateBtn", function () {
      console.log("testing update button!!!");
      var idLocation = $("#updateLocation").val();
      var nameLocation = $("#locationname").val();

      //check form validation if any field is empty
      if (nameLocation == "") {
        alert("Location name is required.");
      } else {
        $.ajax({
          url: "php/editLocation.php",
          method: "POST",
          dataType: "json",
          data: {
            id: idLocation,
            name: nameLocation,
          },
          success: function (data) {
            console.log(data);
            $("#msg").html("Data has successfully updated.");
            $("#editLocationModal").modal("show");
          },
        });
      }
    });
  }
  updateLocationID();

  //DELETE RECORD FROM LOCATION DATABASE
  function delete_location() {
    $(document).on("click", "#btndelete", function () {
      console.log("Testing location delete button working or not!");
      //get the data attribute value
      var data_id1 = $(this).attr("data_location_id1");
      console.log(data_id1);
      $("#deleteLocationModal").modal("show");
      $(document).on("click", "#delete", function () {
        $.ajax({
          url: "php/deleteLocationByID.php",
          method: "POST",
          dataType: "json",
          data: {
            id: data_id1,
          },
          success: function (data) {
            console.log(data);
            $("#deleteMessage").html("Selected data deleted");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.textStatus);
          },
        });
      });
    });
  }
  delete_location();

  //document ready()callback function end
});
