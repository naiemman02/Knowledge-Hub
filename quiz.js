
const quizForm = document.getElementById("quizForm");

quizForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const answers = {
        q1: "a",
        q2: "b",
        q3: "c"
    };

    let score = 0;

    for (let question in answers) {

        const selected = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (selected && selected.value === answers[question]) {
            score++;
        }
    }

    document.getElementById("result").innerText =
        "Your Score: " + score + " / 3";

});
