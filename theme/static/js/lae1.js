const output = {
    "wells": document.getElementById("wells-output"),
    "rGeneva": document.getElementById("rGeneva-output"),
    "pesi": document.getElementById("pesi-output")
}
const scoreset = {
    "wells": [
        [0, "low"],
        [2, "intermediate"],
        [12, "high"],
    ],
    "rGeneva": [
        [0, "low"],
        [4, "intermediate"],
        [11, "high"],
    ],
    "pesi": [
        [0, "class1"],
        [65, "class2"],
        [85, "class3"],
        [105, "class4"],
        [125, "class5"],
    ],
}
function calc_score(score) {
    const score_div = document.getElementById(score);
    let total = 0;
    let item;
    for (item of score_div.getElementsByClassName("scoreinput")) {
        const input = parseInt(item.dataset.weight || item.value);
        if (item.type == "number" || item.checked)
            total += input;
    }
    let classname;
    for (const definition of scoreset[score]) {
        if (total < definition[0]) break;
        classname = definition[1];
    }
    const score_output = document.getElementsByClassName(score + "-output");
    for (item of score_output) {
        if (item.classList.contains(classname)) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    }
}
for (const element of document.getElementsByClassName("scoreinput")) {
    element.addEventListener("input", event => {
        // special treatment for heart rate at rGeneva
        let target = event.target;
        if (target.id == "rGeneva2" && !target.checked) {
            document.getElementById("rGeneva3").checked = false;
        } else if (target.id == "rGeneva3" && target.checked) {
            document.getElementById("rGeneva2").checked = true;
        }
        calc_score(event.target.dataset.score)
    });
};