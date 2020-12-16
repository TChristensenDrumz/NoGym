$(document).ready(function() {
    const routine = $("#virtualgym");
    const timerSent = $("#timerSent");

    $.get("/api/user_data").then(function(data) {
        virtualGym(data);
    });

    async function virtualGym(data) {
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
        }).then(async function(res) {
            const results = res.results;
    
            for(let i = 0; i < results.length; i++) {
                const workout = await generateHTML(results, i);
                routine.append(workout);
                for(let j = 0; j < 3; j++) {
                    const set = await workoutSet();
                    if(j < 2) {
                        const rest = await workoutRest();
                    }
                }
                routine.text("");
            }
        })
    }
    
    function generateHTML(data, i) {
        const name = data[i].name;
        const description = data[i].description;
        const category = data[i].category;
    
        const div = $("<div>")
    
        const divName = $("<div>").text(name)
        const divDescription = $("<p>").html(description)
        const divCategory = $("<div>").text(category)
    
        div.append(divName);
        div.append(divDescription);
        div.append(divCategory);
    
        return div;
    }
    
    function workoutSet() {
        let timer = 20;
        const timerInterval = setInterval(function() {
            timer--;
            timerSent.text("Workout " + timer + " seconds left");
            if (timer <= 0) {
                clearInterval(timerInterval);
                return;
            }
        }, 1000);
    }
    
    function workoutRest() {
        let timer = 10;
        const timerInterval = setInterval(function() {
            timer--;
            timerSent.text("Rest " + timer + " seconds left");
            if (timer <= 0) {
                clearInterval(timerInterval);
                return;
            }
        }, 1000);
    }   
});