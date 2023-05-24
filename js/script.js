

//global variables
var getdepartmentId; // used in edit department code

var location_id; //used for editing location

var deptid; //used in department delete record
var locid;
var idpersonnel;
var delete_id;


$(document).ready(function () {

  //View  personnel database table
  function loadPersonnelTable() {
    $.ajax({
      url: "php/getAllPersonnel.php",
      type: "POST",
      dataType: "json",
      success: function (result) {
        console.log(result);

        for (var i = 0; i < result.data.length; i++) {
          $("#output").append(
            "<tr><td>" +
            result.data[i].lastName +
            "</td><td>" +
            result.data[i].firstName +
            "</td><td class='d-none d-sm-none d-md-inline' style='width: 50%'>" +
            result.data[i].jobTitle +
            "</td><td class='d-none d-sm-none d-md-inline' style='width: 50%'>" +
            result.data[i].email +
            "</td><td class='d-none d-sm-none d-md-inline' style='width: 50%'>" + result.data[i].department + "</td><td><button type='button' class='btn btn-secondary btn-sm btn_edit' id='btn_edit' data-bs-toggle='modal' data-bs-target='#update_personnel_Modal' title='edit' data-id=" +
            result.data[i].id +
            "><i class='fa-solid fa-pen-to-square'></i></button></td><td><button type='button' class='btn btn-secondary btn-sm btn_delete' data-bs-toggle='modal' data-bs-target='#areYouSureDeletePersonnelModal'    title='delete' id='btn_delete' data-id1=" +
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


  //Add new employee record

  $("#addpersonnelForm").on('submit', function (e) {
    e.preventDefault();

    //get input value from user
    var firstname = $("#firstname").val();
    console.log(firstname);
    var lastname = $("#lastname").val();
    console.log(lastname);
    var jobtitle = $("#jobtitle").val();
    console.log(jobtitle);
    var emailid = $("#emailid").val();
    console.log(emailid);
    var department = $("#select_department").val();
    console.log(department);

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
        $("#msgSuccess").html("Data successfully inserted.");
        $("#output").html("");
        loadPersonnelTable();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });

  });


  $("#addpersonnelModal").on('shown.bs.modal', function (e) {
    $("#firstname").focus();
  })

  $("#addpersonnelModal").on('hidden.bs.modal', function () {
    $("#addpersonnelForm")[0].reset();
    $("#msgSuccess").html("");
  })


  // // adding event to prevent automactically submit form
  $("#addpersonnelForm").on("keyup keypress", function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  });

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


  //Edit personnel record by id
  $("#update_personnel_Modal").on('show.bs.modal', function (e) {

    $.ajax({
      url: "php/getPersonnelByID.php",
      method: "POST",
      dataType: "json",
      data: {
        id: $(e.relatedTarget).attr('data-id'),
      },
      success: function (result) {
        console.log(result);
        var resultCode = result.status.code;

        if (resultCode == 200) {
          $("#personnelId").val(result.data.personnel[0].id);
          $("#fname").val(result.data.personnel[0].firstName);
          $("#lname").val(result.data.personnel[0].lastName);
          $("#jobTitle").val(result.data.personnel[0].jobTitle);
          $("#email_id").val(result.data.personnel[0].email);

          $(".update_select_department").val(
            result.data.personnel[0].departmentID
          );

        } else {
          $("#update_personnel_Modal .modal-title").replaceWith("Error retrieving data");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#update_personnel_Modal .modal-title').replaceWith("Error retrieving data");
      },
    })
  });

  $("#update_personnel_Modal").on('shown.bs.modal', function (e) {
    $('#fname').focus();
  })

  //// Executes when the form button with type="submit" is clicked
  // Edit Employee Record

  $("#updateForm").on("submit", function (e) {
    e.preventDefault();
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
        $("#output").html("");
        loadPersonnelTable();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });

  });


  $('#update_personnel_Modal').on('hidden.bs.modal', function () {

    $('#updateForm')[0].reset();
    $("#update_message").html("");

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



  //*******Delete Personnel record function*****//

  $("#areYouSureDeletePersonnelModal").on("show.bs.modal", function (e) {

    $.ajax({
      url: "php/getPersonnelByID.php",
      method: "POST",
      dataType: "json",
      data: {
        id: $(e.relatedTarget).attr('data-id1'),
      },
      success: function (result) {
        console.log(result);
        $("#areYouSurePersonnelName").text(result.data.personnel[0].lastName + ", " + result.data.personnel[0].firstName);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    })

  })


  $(".deleteEmpBtn").click(function (e) {
    $.ajax({
      url: "php/deletePersonnelByID.php",
      method: "POST",
      dataType: "json",
      data: {
        id: $(this).attr('data-id1'),
      },
      success: function (result) {
        console.log(result);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      }

    })
  });


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
            "<table class='table  table-hover table-striped table-bordered '><thead><tr><th>First Name</th><th >Last Name</th><th >Job Title</th><th >Email</th><th>Department</th><th >Location</th></tr></thead><tbody><tr><td>" +
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
            "</td></tr></tbody></table>"
          );
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
          console.log(jqXHR.textStatus);
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
      url: "php/getAllDepartments.php",
      type: "POST",
      dataType: "json",
      success: function (result) {
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
          $("#load-data").append(
            "<tr><td>" +
            result.data[i].name +
            "</td><td><button type='button' class='btn btn-secondary btn-sm edit_depart_button'  title='edit'  data-bs-toggle='modal' data-bs-target='#editdepartmentModal' data-depart_id=" +
            result.data[i].id +
            "><i class='fa-solid fa-pen-to-square'></i></button></td><td><button type='button' class='btn btn-secondary btn-sm delete_depart_button' id='delete_depart_button' title='delete' data-depart_id1=" +
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
        $("#locationName").append(
          `<option value="${data.data[i].id}">${data.data[i].name}</option>`
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.textStatus);
    },
  });

  //Add Department on database

  $("#addDeptForm").on("submit", function (e) {
    e.preventDefault();

    //get input value from user

    var departName = $("#Department").val();
    var locationid = $("#locationName").val();

    $.ajax({
      url: "php/insertDepartment.php",
      type: "POST",
      data: {
        name: departName,
        locationID: locationid,
      },
      success: function (data) {
        console.log(data);
        $("#message-success").html("Data successfully inserted.");
        $("#load-data").html("");
        loadDeptTable();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });

  $("#adddepartmentModal").on('shown.bs.modal', function (e) {
    $("#Department").focus();
  })

  $("#adddepartmentModal").on('hidden.bs.modal', function (e) {
    $("#addDeptForm")[0].reset();
    $("#message-success").html(" ");
  })

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
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });

  //adding event to edit button to update details

  $("#update_btn").click(function () {
    var updateDepartmentName = $("#deptName").val();
    var updateLocationID = $(".update_location_ID").val();

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

  $(document).on("click", ".delete_depart_button", function () {
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

          $("#cantDeleteDepartmentModal").modal("show");
        } else {
          // adding event to delete record if there is no department in the location
          $("#areYouSureDeleteDepartmentModal").modal("show");
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
    $("#Message").html("");
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

          $("#loadlocation").append(
            "<tr><td>" + data.data[i].name + "</td><td><button type='button' class='btn btn-secondary btn-sm btnedit' id='btnedit' data-bs-toggle='modal' data-bs-target='#editLocationModal' title='edit' data-location-id=" +
            data.data[i].id +
            "><i class='fa-solid fa-pen-to-square'></i></button><td><button type='button' class='btn btn-secondary btn-sm btndelete' id='btndelete' title='delete' data-location-id1=" +
            data.data[i].id +
            "><i class='fa-solid fa-trash'></i></button></td></tr>");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  }
  loadLocation();

  // Add location name in database and display on webpage

  $("#locationForm").on("submit", function (event) {
    event.preventDefault();

    //Get input field value from user
    var locationName = $("#location_name").val();


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
        $("#msg-success").html("Data has been successfully inserted.");
        $("#row").html("");
        loadLocation();
        $("#locationForm").trigger("reset");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
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
        $("#selectLocation").val(data.data.location[0]["name"]);
        $("#editLocationModal").modal("show");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });
  //prepopulate select location name
  $.ajax({
    url: "php/getAllLocations.php",
    method: "POST",
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
  $(".editlocbtn").click(function () {
    var location = $("#updateLocation").val();
    console.log(location);

    var nameLocation = $("#selectLocation").val();
    console.log(nameLocation);

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

        $("#msg").html("Data has been successfully updated.");
        $("#row").html("");
        loadLocation();
        $("#locationform").trigger("reset");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });

  // // adding event to prevent automactically submit form
  $("#locationform").on("keyup keypress", function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  });

  //adding event to close edit form
  $("#Close_Button").click(function () {
    $("#locationform").trigger("reset");
    $("#msg").html("");
  });

  //........DELETE location RECORD ......./// 

  //adding event to get location id from delete button on page

  $(document).on("click", ".btndelete", function () {
    // get the location id ones click on delete button/icon
    locid = $(this).data("location-id1");
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
          $("#delete2Message").html("Data cannot be deleted.");
          $("#cantDeleteLocationModal").modal("show");

        } else {
          $("#areYouSureDeleteLocationModal").modal("show");
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
                $("#row").html("");
                loadLocation();

                $("#deletelocForm").trigger("reset");
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.textStatus);
              },
            });
          })
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.textStatus);
      },
    });
  });

  $("#closelocation").click(function () {
    $("#deletelocForm").trigger("reset");
    $("#deleteMessage").html("");
  });

  ///////////////////////////////////////
  //document ready()callback function end
});

