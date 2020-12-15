$(document).ready(function() {
    const inputs = $("input[type='checkbox']")
    const submit = $("input[type='submit']")
    let equipmentSerialID = "";

    submit.on("submit", function(event) {
        event.preventDefault();

        for (let i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).is(":checked")) {
                equipmentSerialID += $(inputs[i]).val();
            }
        }

        const userData = {
            equipment: equipmentSerialID
        };

        updateUser(userData.equipment);
    });

    function updateUser(equipment) {
        $.ajax({
            url: "/api/user_data",
            data: equipment,
            method: "PUT"
        }).then(() => {
            redirect("/")
        });
    }
});