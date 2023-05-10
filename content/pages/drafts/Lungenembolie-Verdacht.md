Title: Verdacht auf Lungenembolie
Slug: lungenembolie-verdacht
Tags: TBD
Sorting: 200

> Bei [hämodynamischer Instabilität](#instabil) weiter mit "[Schwere Lungenembolie](schwere-lungenembolie)"

> [Klinische Wahrscheinlichkeit](#wells-h) einschätzen

## Kriterien der hämodynamischen Instabilität {: #instabil}

- Kreislaufstillstand, Reanimation oder
- obstruktiver Schock (*RR < 90&nbsp;mmHg* systol. oder Notwendigkeit von *Vasopressoren* und Zeichen der *gestörten Endorganperfusion* wie Bewusstseinstrübung, Oligo-/Anurie, marmorierte Haut) oder
- anhaltende Hypotonie

## Wells-Score für klinische Wahrscheinlichkeit {: #wells-h}

{% macro scoreinput(score, text, weight, nr) -%}
    <label for="{{ score }}{{ nr }}" class="block ">
        <input type="checkbox" id="{{ score }}{{ nr }}" class="scoreinput"
            data-weight="{{ weight }}" data-score="{{ score }}">
        {{ text }}
    </label>
{%- endmacro %}
<!-- Doppelte Zahlenwerte, um Floats zu vermeiden -->
<div id="wells">
{% for text, weight in (
    ("Lungenembolie oder tiefe Venenthrombose in der Anamnese", 3),
    ("Herzfrequenz >100/min", 3),
    ("OP oder Immobilisation in den letzten 4 Wochen", 3),
    ("Hämoptysen", 2),
    ("Maligne Erkrankung", 2),
    ("Klinische Zeichen einer tiefen Venenthrombose", 6),
    ("Alternativ-Diagnosen weniger wahrscheinlich als Lungenembolie", 6),
) %}
    {{ scoreinput("wells", text, weight, loop.index) }}
{% endfor %}
</div>
<div id="wells-output" data-result="0">
    <div class="low">
    Geringe Wahrscheinlichkeit für eine Lungenembolie.
    D-Dimere bestimmen.
    Wenn diese negativ sind, ist keine weitere Abklärung einer Lungenembolie notwendig.
    </div>
    <div class="intermediate hidden">
    Mittlere Wahrscheinlichkeit für eine Lungenembolie.
    </div>
    <div class="high hidden">
    Hohe Wahrscheinlichkeit für eine Lungenembolie.
    </div>
</div>

## PESI für den Schweregrad<span id="pesi-h"></span>

<div id="pesi">
    <label for="pesi0" class="block">
        <input type="number" id="pesi0" data-score="pesi"
            class="scoreinput w-14" value="60">
        Alter in Jahren
    </label>
{% for text, weight in (
    ("männliches Geschlecht", 10),
    ("Maligne Erkrankung", 30),
    ("Herzinsuffizienz", 10),
    ("Puls ≥ 110/min", 20),
    ("systolischer Blutdruck < 100&nbsp;mmHg", 30),
    ("Atemfrequenz ≥ 30/min", 20),
    ("Temperatur < 36 °C", 20),
    ("verminderter Bewusstseinszustand", 60),
    ("Sauerstoffsättigung < 90 %", 20),
) %}
    {{ scoreinput("pesi", text, weight, loop.index) }}
{% endfor %}
</div>
<div id="pesi-output" data-result="0">
    <div class="class1">
    Sehr niedriges Risiko (30-Tage-Mortalität 0-1,6%)
    </div>
    <div class="class2 hidden">
    Niedriges Risiko (30-Tage-Mortalität 1,7-3,5%)
    </div>
    <div class="class3 hidden">
    Mittleres Risiko (30-Tage-Mortalität 3,2-7,1%)
    </div>
    <div class="class4 hidden">
    Hohes Risiko (30-Tage-Mortalität 4,0-11,4%)
    </div>
    <div class="class5 hidden">
    Sehr hohes Risiko (30-Tage-Mortalität 10,0-24,5%)
    </div>
</div>

<script src="/theme/js/lae.js"></script>
