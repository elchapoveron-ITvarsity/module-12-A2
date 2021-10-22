function contact() {
    var contactdetail = {
        "name": document.getElementById("contact-details")[0].value,
        "email": document.getElementById("contact-details")[1].value,
        "mobile": document.getElementById("contact-details")[2].value,
        "landline": document.getElementById("contact-details")[3].value,
        "website": document.getElementById("contact-details")[4].value,
        "address": document.getElementById("contact-details")[5].value
    };

    localStorage.setItem(document.getElementById("contact-details")[1].value, JSON.stringify(contactdetail));
}

function display() {
    for (x in localStorage) {
        var user = JSON.parse(localStorage.getItem(x));
        if (user != null) {
            var parentdiv = document.createElement("div");
            parentdiv.className = "display-all";
            parentdiv.id = user.email;
            $("#head").after(parentdiv);
            var name = $("<h4></h4>").text(user.name);
            var email = $("<p></p>").text(user.email);
            var mobile = $("<p></p>").text(user.mobile);
            $(parentdiv).append(name, email, mobile);
        }
    }
}

function removeElement() {
    $("#display-contact").remove();
    $("#form").hide();
    $(".display-all").css("background-color", "white");
}

function displaycontactdetail(id) {
    var contactDetails = JSON.parse(localStorage.getItem(id));
    removeElement();
    var parentdiv = document.createElement("div");
    parentdiv.className = "display-details";
    parentdiv.id = "display-contact";
    $("#form").after(parentdiv);
    var childdiv = document.createElement("div");
    childdiv.className = "child";
    var deletecontact = document.createElement("div");
    deletecontact.className = "modify-or-delete";
    $(deletecontact).append("<img class='delete' src='../img/delete2.png'/>");
    $(deletecontact).append('<a onclick="deleteContact(\'' + contactDetails.email + '\')">DELETE</a>');
    var editcontact = document.createElement("div");
    editcontact.className = "modify-or-delete";
    $(editcontact).append("<img class='edit' src='../img/edit1.jpg'/>");
    $(editcontact).append('<a onclick="edit(\'' + contactDetails.email + '\')">EDIT</a>');
    $(childdiv).append($("<h4></h4>").text(contactDetails.name), deletecontact, editcontact);
    $(parentdiv).append(childdiv, $("<p></p>").text("Email : " + contactDetails.email),
        $("<p></p>").text("Mobile : " + contactDetails.mobile),
        $("<p></p>").text("Landline : " + contactDetails.landline),
        $("<p></p>").text("Website : " + contactDetails.website),
        $("<p></p>").text("Address : " + contactDetails.address));
}

$(document).ready(function() {
    $(document).on("click", "div.display-all", function() {
        displaycontactdetail(this.id);
        var myElement = document.getElementById(this.id);
        myElement.style.backgroundColor = "#cee7f2";
    });

    $(document).on("click", "#deleteContact", function() {
        deleteContact(this.id);
    });
});

function edit(contactdetail) {
    if (confirm("Do you want to update detail??") == true) {
        $("#form").show();
        $("#display-contact").remove();
        var contactDetails = JSON.parse(localStorage.getItem(contactdetail));
        $("#name").val(contactDetails.name);
        $("#email").val(contactDetails.email);
        $("#mobile").val(contactDetails.mobile);
        $("#landline").val(contactDetails.landline);
        $("#website").val(contactDetails.website);
        $("#address").val(contactDetails.address);
        contact();
        localStorage.removeItem(contactdetail)
    }
}

function deleteContact(id) {
    if (confirm("Do you want to delete this contact detail??") == true) {
        localStorage.removeItem(id);
        location.reload();
    }
}