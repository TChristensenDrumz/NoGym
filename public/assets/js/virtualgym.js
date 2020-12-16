$(document).ready(function() {
    const routine = $("#virtualgym");
    const timerSent = $("#timerSent");
    let workout = 0;
    let set = 0;
    let rest = 0;

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

        const res = await $.ajax({
            url: queryURL,
            method: "GET",
            Authorization: "b848c6ad024b1c40f59e4da17743e3a1c17d613e"
        });

        const results = res.results;

        generateHTML(results, workout);

        function generateHTML(data, i) {
            if(workout < data.length){
                const name = data[i].name;
                const description = data[i].description;
                const category = data[i].category;
                const nameNoSpaces = name.trim().split(" ").join("");
                 
                const divName = $("<div>").text(name)
                const divDescription = $("<p>").html(description)
                const divCategory = $("<div>").text(category)

                const img = $("<img>").attr('src', "./images/gif/" + nameNoSpaces + ".gif").attr('width', "250px");
                const imgDiv = $("<div>");

                img.appendTo(imgDiv);

                const div = $("<div>")
            
                div.append(divName);
                div.append(divDescription);
                div.append(img);
                div.append(divCategory);
            
                routine.append(div);
    
                workoutSet();
            }
        }
        
        function workoutSet() {
            let timer = 21;
            const timerInterval = setInterval(function() {
                timer--;
                timerSent.text("Workout " + timer + " seconds left");
                if (timer <= 0) {
                    clearInterval(timerInterval);
                    if(set < 3){
                        set++;
                        workoutRest();
                    }
                }
            }, 1000);
        }
        
        function workoutRest() {
            let timer = 11;
            const timerInterval = setInterval(function() {
                timer--;
                timerSent.text("Rest " + timer + " seconds left");
                if(timer <= 0) {
                    clearInterval(timerInterval);
                    if(rest < 2) {
                        rest++;
                        workoutSet();
                    }
                    else {
                        set = 0;
                        rest = 0;
                        workout++;
                        routine.text("");
                        generateHTML(results, workout);
                    }
                }
            }, 1000);
        } 
    }  
});