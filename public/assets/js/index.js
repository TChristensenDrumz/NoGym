$(document).ready(function() {
    const owner = $("#owner").val();
    const group = $("#group").val();
    const submit = $("#submit");


    submit.on("click", function(event) {
        event.preventDefault();
        // $.post(" ")
        console.log(owner);
        console.log(group);

        // create group handler to enter the group info 


    })
});