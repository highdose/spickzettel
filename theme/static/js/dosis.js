//
const weights = [40, 50, 60, 80, 100, 120];
const perfusoren = {
    "Dobutamin": [
        { "menge": 250, "volumen": 50, "einheit": "mg", "default": true }
    ],
    "Noradrenalin": [
        { "menge": 1, "volumen": 100, "einheit": "mg" },
        { "menge": 3, "volumen": 50, "einheit": "mg" },
        { "menge": 5, "volumen": 50, "einheit": "mg", "default": true }
    ],
    "Adrenalin": [
        { "menge": 1, "volumen": 50, "einheit": "mg" },
        { "menge": 5, "volumen": 50, "einheit": "mg", "default": true }
    ],
    "Levosimendan": [
        { "menge": 12.5, "volumen": 250, "einheit": "mg", "default": true },
        { "menge": 12.5, "volumen": 500, "einheit": "mg" }
    ],
    "Milrinon": [
        { "menge": 10, "volumen": 50, "einheit": "mg", "default": true },
        { "menge": 10, "volumen": 100, "einheit": "mg" }
    ],
    "Enoximon": [
        { "menge": 100, "volumen": 40, "einheit": "mg", "default": true },
        { "menge": 100, "volumen": 100, "einheit": "mg" }
    ],
};
const breakpoints = {
    "sm": 640, "md": 768, "lg": 1024, "xl": 1280, "2xl": 1536
}

function open_dose_dialog(event) {
    const source = event.target;
    if (source.dialog) {
        source.dialog.classList.remove("hidden");
        return void 0;
    }
    // Get and populate dialog
    const dialog = clone_template("dosedialogtemplate");
    source.dialog = dialog;

    const model = {
        "substanz": "",       // - Name des Medikaments
        "rezept": void 0,     // - aus `perfusoren`
        "kg": 80,             // - Gewicht in kg
        "dosierung": 0,       // - <mg oder µg> pro kg pro zeiteinheit
        "dosierung2": 0,      // - für Dosisbereiche
        "faktor": 0.001,          // - Umrechnungsfaktor von Einheit der Dosisrate
        //   auf Einheit des Rezepts 
        "zeiteinheit": "min", // - "min" oder "h"
        "input_einheit": "µg/kg/min",  // - "µg/kg/min" o.ä.
        "output_einheit": "mg",
    };
    const buttons = [];

    Object.assign(model, source.dataset);

    // Close button
    dialog.querySelector(".closedialog").addEventListener("click", event => {
        dialog.classList.add("hidden");
    });
    // Title
    dialog.querySelector(".title").innerHTML = (
        model.dosierung2 ?
            [model.substanz, model.dosierung, "-", model.dosierung2, model.input_einheit] :
            [model.substanz, model.dosierung, model.input_einheit]
    ).join(" ");

    // Buttons
    for (const weight of weights) {
        const button = clone_template("button_template");
        button.textContent = weight + " kg";
        button.data = { "kg": weight };
        button.addEventListener("click", button_clicked);
        dialog.querySelector(".weightbuttons").appendChild(button);
        buttons.push(button);  // well, yeah.
    }
    for (const rezept of perfusoren[model.substanz]) {
        const button = clone_template("button_template");
        button.textContent = rezept.menge + " " + rezept.einheit + " / " +
            rezept.volumen + " ml";
        button.data = { "rezept": rezept };
        button.addEventListener("click", button_clicked);
        dialog.querySelector(".rezeptbuttons").appendChild(button);
        buttons.push(button);
        if (rezept.default && !model.rezept) {
            model.rezept = rezept;
        }
    }
    show_data();
    // Insert before on bigger screens for floating right, else below.
    const placing = window.innerWidth < breakpoints.md ? "afterend" : "beforebegin";
    source.closest("p,ul").insertAdjacentElement(placing, dialog);

    function button_clicked(event) {
        Object.assign(model, event.target.data);
        show_data();
    }

    function show_data() {
        // Select the right buttons
        for (const button of buttons) {
            // If only one of the data doesn't fit, it is not current
            button.classList.add("current");
            for (const [key, value] of Object.entries(button.data)) {
                if (model[key] != value) {
                    button.classList.remove("current");
                }
            }
        };
        // Show results
        if (model.kg) {
            dialog.querySelector(".dosisrate").innerHTML =
                one_or_two_results(dosisrate) + " " + model.output_einheit + "/h";
        }
        if (model.rezept && model.rezept.menge && model.kg) {
            dialog.querySelector(".laufrate").innerHTML =
                one_or_two_results(laufrate) + " ml/h";
        }
    }

    function one_or_two_results(algorithm) {
        return algorithm(model.dosierung) + (
            model.dosierung2 ?
                " - " + algorithm(model.dosierung2) :
                ""
        );
    }
    // Ergebnis: z.B. mg/h
    function dosisrate(dosierung) {
        let res = dosierung * model.kg * model.faktor;
        if (model.zeiteinheit == "min") {
            // return 60 * res;
            // if  res == 0.03 returns 1.7999999999999998 WTF??
            let b = res.toString().split('.');
            return 60 * b[0] + 60 * b[1] / (Math.pow(10, b[1].length));
        }
        return res;
    }
    // Ergebnis: ml/h
    function laufrate(dosierung) {
        let res = dosierung * model.kg * model.rezept.volumen *
            model.faktor / model.rezept.menge;
        if (model.zeiteinheit == "min")
            return 60 * res;
        return res;
    }
}

function clone_template(id) {
    return document.getElementById(id)
        .content.firstElementChild.cloneNode(true);
}



