$(document).ready(function() {
    const routine = $("#virtualgym");

    $.get("/api/user_data").then(function(data) {
        getRoutine(data);
    });

    function getRoutine(data) {
        const serial = data.equipment;
        const equipment = serial.split("-").filter(element => element.length > 0);
        let urlParams = "";

        for (let i = 0; i < equipment.length; i++) {
            urlParams += "&equipment=" + equipment[i];
        }

        var queryURL = "https://wger.de/api/v2/exercise/?language=2&limit=50" + urlParams;

        $.ajax({
            url: queryURL,
            method: "GET",
            Authorization: "b848c6ad024b1c40f59e4da17743e3a1c17d613e"
        }).then(function(res) {
            const results = res.results;

            for (let i = 0; i < results.length; i++) {
                let name = results[i].name;
                let description = results[i].description;
                let category = results[i].category;

                let div = $("<div>")

                let divName = $("<div>").text(name)
                let divDescription = $("<p>").html(description)
                let divCategory = $("<div>").text(category)
                startExercise(div, divName, divDescription, divCategory);
            }

            //Add Timer function
            async function startExercise(div, divName, divDescription, divCategory) {
                const timerSent = $("#timerSent")
                displayExercise(div, divName, divDescription, divCategory);
                let timer = 20;
                var timerInterval = setInterval(function() {
                    timer--;
                    timerSent.text(timer + " seconds left");
                    if (timer <= 0) {
                        clearInterval(timerInterval);
                        //Clear current exercise
                        routine.text("");
                    }
                }, 1000);
            }

            //Append
            function displayExercise(div, divName, divDescription, divCategory) {
                div.append(divName)
                div.append(divDescription)
                div.append(divCategory)
                routine.append(div);
            }
        })
    }
});