$(document).ready(function() {
    const timerSent = $("#timerSent");
    const vgPicture = $("#vgPicture");
    const vgDesc = $("#vgDesc");
    const vgName = $("#vgName");
    let workout = 0;
    let set = 0;
    let rest = 0;


    const warmup = [];
    const routine = [];

    $.when(
        $.getJSON('/api/get_warmup')
    ).done(function(json) {
        warmup.push(json);
        console.log(warmup);
    });

    function virtualGym() {
        if (warmup.length === 0) {
            setTimeout(virtualGym, 1000);
        } else {
            for (let i = 0; i < 4; i++) {
                const random = Math.floor(Math.random() * warmup[0].length);
                routine.push(warmup[0][random]);
                warmup[0].splice(random, random + 1);
            }

            console.log(routine);

            $.get("/api/user_data").then(function(data) {
                getRoutine(data);
            });

            async function getRoutine(data) {
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

                let results = res.results;

                for (let i = 0; i < 8; i++) {
                    const random = Math.floor(Math.random() * results.length);
                    routine.push(results[random]);
                    results = results.filter(element => element.id !== results[random].id);
                }

                generateHTML(routine, workout);

                function generateHTML(data, i) {
                    if (workout < data.length) {
                        vgDesc.attr("class", "hide");

                        const divName = $("<div>")
                        const divPicture = $("<div>");
                        const divDesc = $("<div>");

                        const name = data[i].name;

                        const divNameAPI = $("<div>").text(name);
                        divName.append(divNameAPI);
                        vgName.append(divName)

                        if (data[i].description) {
                            vgDesc.removeClass("hide");
                            const description = data[i].description;
                            const divDescription = $("<p>").html(description);
                            divDesc.append(divDescription);
                            vgDesc.append(divDesc);
                        }

                        const nameNoSpaces = name.trim().split(" ").join("");
                        const img = $("<img>").attr('src', "./images/gif/" + nameNoSpaces + ".gif").attr('width', "500px");
                        divPicture.append(img);
                        vgPicture.append(divPicture);

                        workoutSet();
                    }
                }

                function workoutSet() {
                    let timer = 21;
                    const timerInterval = setInterval(function() {
                        timer--;
                        timerSent.text("TRAIN:" + timer + " Seconds Left!");
                        if (timer <= 0) {
                            clearInterval(timerInterval);
                            if (set < 3) {
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
                        timerSent.text("REST: " + timer + " Seconds Left!");
                        if (timer <= 0) {
                            clearInterval(timerInterval);
                            if (rest < 2) {
                                rest++;
                                workoutSet();
                            } else {
                                set = 0;
                                rest = 0;
                                workout++;
                                timerSent.text("");
                                vgPicture.text("");
                                vgDesc.text("");
                                vgName.text("");
                                generateHTML(routine, workout);
                            }
                        }
                    }, 1000);
                }
            }
        }
    }

    virtualGym();
});