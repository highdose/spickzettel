Title: Heparin-Bolus und -Perfusor
Slug: heparin
Authors: Johannes Ammon
status: hidden
Tags: TBD
Sorting: 900

{% macro button(text, param, zahl, default=False) -%}
<button class="calcbutton{% if default %} current{% endif %}"
        data-{{ param }}="{{ zahl }}">
    {{ text }}
</button>
{%- endmacro %}

## Körpergewicht

{{ button("50 kg", "weight", 50) }}
{{ button("60 kg", "weight", 60) }}
{{ button("70 kg", "weight", 70) }}
{{ button("80 kg", "weight", 80, default=True) }}
{{ button("90 kg", "weight", 90) }}
{{ button("100 kg", "weight", 100) }}

## Heparin-Perfusor

{{ button("15.000 IE / 50 ml", "dosing", 300) }}
{{ button("20.000 IE / 50 ml", "dosing", 400) }}
{{ button("25.000 IE / 50 ml", "dosing", 500, default=True) }}

## Dosierung

- Bolusgabe **<span class="big_bolus">?</span> IE**, Laufrate **<span
      class="rate">?</span> ml/h**
- PTT-Kontrolle nach 6 Stunden

<table class="heparin_table bg-amber-50 border border-separate rounded-lg p-2">
    <tr>
        <td>PTT < 35''</td>
        <td>
            Bolusgabe <strong><span class="big_bolus">?</span> IE</strong>,<br>
            Laufrate um <strong><span class="step4">?</span> ml/h</strong>
            erhöhen.
        </td>
    </tr>
    <tr>
        <td>PTT 35–45''</td>
        <td>
            Bolusgabe <strong><span class="small_bolus">?</span>
                IE</strong>,<br>
            Laufrate um <strong><span class="step2">?</span> ml/h</strong>
            erhöhen.
        </td>
    </tr>
    <tr>
        <td>PTT 46–70''</td>
        <td>
            Keine Veränderung.
        </td>
    </tr>
    <tr>
        <td>PTT 76–90''</td>
        <td>
            Laufrate um <strong><span class="step2">?</span> ml/h</strong>
            reduzieren.
        </td>
    </tr>
    <tr>
        <td>PTT >90''</td>
        <td>
            Pause für 1 Stunde,<br>
            Laufrate um <strong><span class="step3">?</span> ml/h</strong>
            reduzieren.
        </td>
    </tr>
</table>
- Nächste Kontrolle nach weiteren 6 Stunden
- Wenn zwei Kontrollen im Zielbereich lagen, nächste Kontrolle nach
24&nbsp;Stunden

<script>
    let choice = {};
    const buttons = [...document.getElementsByClassName('calcbutton')];

    [...document.getElementsByClassName('calcbutton current')].forEach(get_data)
    calc_data()

    function get_data(button) {
        let data = button.dataset;
        if (data.weight) choice.weight = parseInt(data.weight);
        if (data.dosing) choice.dosing = parseInt(data.dosing);
    }

    function button_clicked(event) {
        get_data(event.target);

        // Select the right buttons
        for (const button of buttons) {
            // If the data doesn't fit, it is not current
            button.classList.add("current");
            for (const [key, value] of Object.entries(button.dataset)) {
                if (choice[key] != value) {
                    button.classList.remove("current");
                }
            }
        };
        calc_data();
    }

    function calc_data() {
        if (choice.weight && choice.dosing) {
            let dose_unit = 10 * choice.weight / choice.dosing;
            function rate(factor) {
                return Math.round(factor * dose_unit) / 10;
            }
            for (const [id, content] of [
                ["big_bolus", 80 * choice.weight],
                ["small_bolus", 40 * choice.weight],
                ["rate", rate(18)],
                ["step2", rate(2)],
                ["step3", rate(3)],
                ["step4", rate(4)],
            ]) {
                [...document.getElementsByClassName(id)]
                    .forEach((el) => { el.innerHTML = content; })
            }
        }
    }

    buttons.forEach(el => {
        el.addEventListener("click", button_clicked);
    });
</script>