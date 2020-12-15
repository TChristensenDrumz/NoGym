$(document).ready(function() {
    const routine = $("#routine");

    $.get("/api/user_data").then(function(data) {
        getRoutine(data);
    });

});

function getRoutine(data) {
    const serial = data.equipment;
    const equipment = serial.split("-");
    let urlParams;

    for (let i = 0; i < equipment.length; i++) {
        urlParams += "&equipment=" + equipment[i];
    }

    var queryURL = "https://wger.de/api/v2/exercise/?language=2" + urlParams;

    $.ajax({
        url: queryURL,
        method: "GET",
        Authorization: "b848c6ad024b1c40f59e4da17743e3a1c17d613e"
    }).then(function(res) {
        // console.log(res.name);
        // console.log(res.description);
        // console.log(res.category);
        for (let i = 0; i < res.length; i++) {
            const name = res[i].name;
            const description = res[i].description;
            const category = res[i].category;
        }

    })
}