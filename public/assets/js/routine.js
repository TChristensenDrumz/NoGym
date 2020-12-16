$(document).ready(function() {
    const routine = $("#routine");

    $.get("/api/user_data").then(function(data) {
        getRoutine(data);
    });


    function getRoutine(data) {
        const serial = data.equipment;
        const equipment = serial.split("-");
        let urlParams = "";

        for (let i = 0; i < equipment.length; i++) {
            urlParams += "&equipment=" + equipment[i];
        }

        var queryURL = "https://wger.de/api/v2/exercise/?language=2" + urlParams;

        $.ajax({
            url: queryURL,
            method: "GET",
            Authorization: "b848c6ad024b1c40f59e4da17743e3a1c17d613e"
        }).then(function(res) {
            const results = res.results;
            console.log(res);
            console.log(results.name);
            console.log(results.description);
            console.log(results.category);
            for (let i = 0; i < results.length; i++) {
                const name = results[i].name;
                const description = results[i].description;
                const category = results[i].category;

                const div = $("<div>")

                const divName = $("<div>").text(name)
                const divDescription = $("<div>").text(description)
                const divCategory = $("<div>").text(category)

                div.append(divName)
                div.append(divDescription)
                div.append(divCategory)

                routine.append(div);
            }
        })
    }
});