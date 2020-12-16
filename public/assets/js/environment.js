$(document).ready(function() {
    const inputs = $("input[type='checkbox']");
    const submit = $("#submit");

    submit.on("click", function(event) {
        event.preventDefault();

        $.get("/api/user_data").then(function(data) {
            console.log(data);
            let equipmentSerialID = 7;
            for (let i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).is(":checked")) {
                    equipmentSerialID += "-" + $(inputs[i]).val();
                }
            }
            console.log(equipmentSerialID);
            data.equipment = equipmentSerialID;
            updateUser(data);
        });
    });

    function updateUser(request) {
        $.ajax({
            url: "/api/user_data",
            data: request,
            method: "PUT"
        }).then(() => {
            window.location.replace("/home");
        });
    }
});