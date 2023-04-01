$(document).ready(function () {
    function loadData() {
        $('#table_data').html("");
        $.get("http://localhost/PHP-PRACTICAL/PHP-REST-API/fetchAll.php",
            function (response) {
                var html = "";
                if (response.Status == false) {
                    html = "<tr><td colspan='6'><h5 class='text-danger text-center'>" + response.Message + "</h5></td></tr>";
                    $('#table_data').html(html);
                } else {
                    $.each(response, function (key, value) {
                        html += "<tr>"
                            + "<td>" + value.id + "</td>" +
                            "<td>" + value.name + "</td>" +
                            "<td>" + value.age + "</td>" +
                            "<td>" + value.city + "</td>" +
                            "<td><button class='btn btn-info btn-sm edit_btn' data-eid='" + value.id + "'>Edit</button</td>" +
                            "<td><button class='btn btn-danger btn-sm delete_btn' data-eid='" + value.id + "'>Delete</button</td>" +
                            "</tr>";
                        $('#table_data').html(html);
                    });
                }
            }
        );
    }
    loadData();

        // Custom Functions
    function jsonData(targetForm) {
        var arr = $(targetForm).serializeArray();
        // console.log(arr);
        var obj = {};
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value == "") {
                return false;
            }
            obj[arr[i].name] = arr[i].value;
        }
        // console.log(obj);
        var myJson = JSON.stringify(obj);
        // console.log(myJson);
        return myJson;
    }

    function Messages(message,status) {
        if(status == true){
            $('#successbox').html(message).slideDown();
            $('#errorbox').slideUp();
            setTimeout(() => {
                $('#successbox').slideUp();
            }, 4000);
        }else{
            $('#errorbox').html(message).slideDown();
            $('#successbox').slideUp();
            setTimeout(() => {
                $('#errorbox').slideUp();;
            }, 4000);
        }
    }

        // Add Data
    $('#add_btn').on("click", function (e) {
        e.preventDefault();
        var jsonObj = jsonData('#addForm')
        
        if (jsonObj == false) {
            
            Messages("All Fields are required", false);
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost/PHP-PRACTICAL/PHP-REST-API/insert.php",
                data: jsonObj,
                success: function (response) {
                    $('#addForm').trigger('reset');
                    if (response.Status == true) {
                        $('#add_Modal').modal('hide');
                        loadData();
                        Messages(response.Message, true);
                    }
                }
            });
        }
    })

        // Edit Data
    $(document).on("click", '.edit_btn', function () {
        $('#edit_Modal').modal('show');
        var id = $(this).data('eid');
        var obj = { sid: id };
        var myJson = JSON.stringify(obj);

        $.ajax({
            type: "POST",
            url: "http://localhost/PHP-PRACTICAL/PHP-REST-API/fetchSingle.php",
            data: myJson,
            success: function (response) {
                $('#edit-id').val(response[0].id)
                $('#edit_name').val(response[0].name);
                $('#edit_age').val(response[0].age);
                $('#edit_city').val(response[0].city);
                // console.log(response);
            }
        });
    });

    $('#edit_btn').on("click", function (e) {
        e.preventDefault();
        var jsonObj = jsonData('#editForm')
        if (jsonObj == false) {
            alert("All feild required!");
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost/PHP-PRACTICAL/PHP-REST-API/update.php",
                data: jsonObj,
                success: function (response) {
                    if (response.Status == true) {
                        $('#edit_Modal').modal('hide');
                        Messages(response.Message, true);
                        loadData();
                    }
                }
            });
        }
    })

        // Delete Data
    $(document).on("click", '.delete_btn', function () {
        if (confirm("Are you Sure you want to delete this record ?")) {
            var id = $(this).data('eid');
            var obj = { sid: id };
            var myJson = JSON.stringify(obj);
            var row = this;
            $.ajax({
                type: "POST",
                url: "http://localhost/PHP-PRACTICAL/PHP-REST-API/delete.php",
                data: myJson,
                success: function (response) {
                    if (response.Status == true) {
                        $(row).closest('tr').fadeOut();
                        Messages(response.Message, true);
                    }
                }
            });
        }
    });

        // Search Data
    $('#search').on("keyup", function(){
        var search = $(this).val();
        $.ajax({
            type: "GET",
            url: "http://localhost/PHP-PRACTICAL/PHP-REST-API/search.php?search=" + search,
            success: function (response) {
                var html = "";
                if (response.Status == false) {
                    html = "<tr><td colspan='6'><h5 class='text-danger text-center'>" + response.Message + "</h5></td></tr>";
                    $('#table_data').html(html);
                } else {
                    $.each(response, function (key, value) {
                        html += "<tr>"
                            + "<td>" + value.id + "</td>" +
                            "<td>" + value.name + "</td>" +
                            "<td>" + value.age + "</td>" +
                            "<td>" + value.city + "</td>" +
                            "<td><button class='btn btn-info btn-sm edit_btn' data-eid='" + value.id + "'>Edit</button</td>" +
                            "<td><button class='btn btn-danger btn-sm delete_btn' data-eid='" + value.id + "'>Delete</button</td>" +
                            "</tr>";
                        $('#table_data').html(html);
                    });
                }
            }
        });
    })
});