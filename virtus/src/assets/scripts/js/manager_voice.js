
console.log("Cargar artyomJS");
var artyom = new Artyom();
//https://codepen.io/mrtyn/pen/bGNVowB

function startContinuousArtyom() {
    artyom.fatality();
    setTimeout(function () {

        artyom.initialize({
            lang: "es-ES",
            continuous: true, // Artyom will listen forever
            debug: true, // Show what recognizes in the Console
            listen: true, // Start listening after this
            speed: 0.9, // Talk a little bit slow
            mode: "normal" // This parameter is not required as it will be normal by default
        }).then(function () {
            console.log("Ready to work!");
        });

        artyom.addCommands([
            {
                indexes: ["a", "avión", "avion"],
                action: function (i) {
                    console.log("Literla A");
                }
            }, {
                indexes: ["b", "burro", "bicicleta"],
                action: function (i) {
                    console.log("Literla B");
                }
            }, {
                indexes: ["c", "conejo", "caballo"],
                action: function (i) {
                    console.log("Literla c");
                }
            }, {
                indexes: ["d", "dedo", "delfin"],
                action: function (i) {
                    console.log("Literla d");
                }
            }, {
                indexes: ["e", "elefante"],
                action: function (i) {
                    console.log("Literla e");
                }
            }, {
                indexes: ["f", "flor", , "foca"],
                action: function (i) {
                    console.log("Literla f");
                }
            }
        ]);

        // Or the artisan mode to write less

        artyom.on(["Good morning"]).then(function (i) {
            console.log("Triggered");
        });

        artyom.say("Buenos días, indique el literal correcto");

        artyom.say("buenos dias", {
            onStart: function () {
                console.log("Talking ...");
            },
            onEnd: function () {
                console.log("I said all that i knew");
            }
        });
    }, 250);
}

console.log("Fin _ Cargar artyomJS");
startContinuousArtyom();

///////////////////////////////////////////////////////////////////
/*
const artyom = new Artyom();
const recognised = document.getElementById("recognised");

// This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
function startContinuousArtyom() {
    artyom.fatality();
    setTimeout(function () {
        artyom
            .initialize({
                lang: "es-ES",
                continuous: true, // Artyom will listen forever
                listen: true, // Start recognizing
                debug: true, // Show everything in the console
                speed: 1 // talk normally
            })
            .then(function () {
                console.log("Ready to work!");
            });
        artyom.redirectRecognizedTextOutput(function (text, isFinal) {
            recognised.innerText = text;
        });
    }, 250);
}

const thingsToSay = {
    "where am i": "Camp JS",
    "what day is it": "Sunday",
    "who am i": "you tell me"
};

artyom.on("*", true).then((i, wildcard) => {
    recognised.innerText = wildcard;
    var commands = Object.keys(thingsToSay);
    for (let cmd of commands) {
        if (wildcard.toLowerCase().indexOf(cmd) > -1) {
            artyom.say(thingsToSay[wildcard]);
        }
    }
});

startContinuousArtyom();*/
