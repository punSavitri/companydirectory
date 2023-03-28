<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Company Directory</title>
  <!-- fontawesome -->
  <script src="https://kit.fontawesome.com/062aaa8831.js" crossorigin="anonymous"></script>
  <!-- bootstrap CSS file -->
  <link rel="stylesheet" href="libs/bootstrap/css/bootstrap.min.css" />
</head>

<body>
  <nav class="navbar bg-body-tertiary">
    <div class="container">
      <h2>Company Directory</h2>
      <a class="btn btn-primary" href="/companydirectory/create.php" role="button">&plus;</a>
    </div>
    <div class="container">
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" name="employeeName" placeholder="Search Employee Name" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
  <!-- bootstrap js file -->
  <script src="libs/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
</body>

</html>