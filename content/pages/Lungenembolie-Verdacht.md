Title: Verdacht auf Lungenembolie
Slug: lungenembolie-verdacht
Tags: TBD
Status: published
Sorting: 150

Bei hämodynamischer Instabilität (Kreislaufstillstand, Schock, anhaltende Hypotonie) weiter mit "[Schwere Lungenembolie]({filename}Lungenembolie.md)".
{: class="my-6 p-6 font-semibold text-2xl border-solid border-2"}

> [Klinische Wahrscheinlichkeit](#rGeneva-h) einschätzen.

> Geringe Wahrscheinlichkeit: [PERC-Rule](#PERC) anwenden. Wenn keins der Kriterien zutrifft, ist keine weitere Diagnostik nötig.

> Geringe oder mittlere Wahrscheinlichkeit: [D-Dimere](#D-Dimere) bestimmen. Wenn der Wert im Normbereich liegt, ist keine weitere Diagnostik nötig.

> Mittlere oder hohe Wahrscheinlichkeit oder positive D-Dimere: Antikoagulation mit NMH, Fondaparinux oder [Heparin]({filename}Heparin-Perfusor.md)-Bolus geben, erst dann weitere Diagnostik.

> Risikoeinschätzung durch [PESI-Score](#pesi-h), dann ggf. Bestimmung von Troponin und Echokardiographie.

---
Wegen der unspezifischen Symptomatik gehört eine Lungenembolie nicht selten zu den Differentialdiagnosen. Eine übersehene Lungenembolie hätte gravierende Folgen. Eine Überdiagnostik wäre mit unnötiger Strahlenbelastung, Risiken und Kosten verbunden. Deshalb muss sich das Ausmaß der Diagnostik an der klinischen Wahrscheinlichkeit orientieren. Neben dem "klinischen Blick" wird dafür der [Geneva-Score](#rGeneva-h) herangezogen.

Keine weitere Diagnostik ist erforderlich bei

- geringer Wahrscheinlichkeit und fehlenden Risikoindikatoren aus der [PERC-Rule](#PERC) oder
- geringer bis mittlerer Wahrscheinlichkeit und negativem [D-Dimer-Test](#D-Dimere).

In diesen Fällen liegt das Risiko für ein thromboembolisches Ereignis in den nächsten drei Monaten unter 1%.

In den anderen Fällen wird zuerst mit gewichtsadaptierter Heparingabe (Bolus 80 IE/kg KG i.v.) ein eventueller, thromboembolischer Prozess gestoppt. Gleichwertig ist der sofortige Beginn mit gewichtsadaptiertem Niedermolekularem Heparin oder Fondaparinux subkutan und wahrscheinlich auch die orale Gabe von Apixaban oder Rivaroxaban in erhöhter Dosis.

Dann ist i.d.R. die CT-Angiographie des Thorax oder die Ventilations-Perfusions-Szintigraphie der nächste diagnostische Schritt.

Die Intensität der Therapie richtet sich dann nach dem kurzfristigen Letalitätsrisiko. Dies wird abgeschätzt nach dem [Pulmonary Embolism Severity Index](#pesi-h) (PESI) und ggf. zusätzlich der Echokardiographie und der Bestimmung von Troponin.

## Revidierter Geneva-Score für klinische Wahrscheinlichkeit {: #rGeneva-h}

{% macro scoreinput(score, text, weight, nr) -%}
    <label for="{{ score }}{{ nr }}" class="block ">
        <input
            type="checkbox" id="{{ score }}{{ nr }}"
            class="scoreinput"
            data-weight="{{ weight }}" data-score="{{ score }}">
        {{ text }}
    </label>
{%- endmacro %}

<div id="rGeneva">
{% for text, weight in (
    ("Lungenembolie oder tiefe Venenthrombose in der Anamnese", 3),
    ("Herzfrequenz ≥75/min", 3),
    ("Herzfrequenz ≥95/min", 2),
    ("OP oder Fraktur in den letzten 2 Monaten", 2),
    ("Hämoptysen", 2),
    ("Maligne Erkrankung", 2),
    ("Einseitige Beinschmerzen", 3),
    ("Schmerzhafte Palpation der tiefen Beinvenen oder einseitiges Beinödem", 4),
    ("Alter über 65 Jahre", 1),
) %}
    {{ scoreinput("rGeneva", text, weight, loop.index) }}
{% endfor %}
</div>

**Geringe Wahrscheinlichkeit für eine Lungenembolie.** <br>
Wenn keines der PERC-Kriterien zutrifft oder die D-Dimere nicht erhöht sind, ist keine weitere Diagnostik nötig.
{: .low .rGeneva-output .kasten  }

**Mittlere Wahrscheinlichkeit für eine Lungenembolie.** <br>
Wenn die hochsensitive D-Dimer-Bestimmung im Normbereich liegt, kann die Diagnostik beendet werden.
{: .intermediate .rGeneva-output .kasten .hidden }

**Hohe Wahrscheinlichkeit für eine Lungenembolie.** <br>
Weitere Abklärung indiziert, in der Regel mit CT-Angiographie des Thorax oder Ventilations-Perfusions-Szintigraphie. Echokardiographie zur Risikoabschätzung.
{: .high .rGeneva-output .kasten .hidden }

## PERC – Pulmonary Embolism Rule out Criteria {: #PERC}

Wenn die klinische Wahrscheinlichkeit für eine Lungenembolie gering ist und alle der folgenden Kriterien zutreffen, dann ist keine weitere Diagnostik nötig.

- Alter < 50 Jahre
- Puls < 100/min
- SaO<sub>2</sub> > 94%
- keine einseitige Beinschwellung
- keine Hämoptysen
- kein kürzliches Trauma oder OP
- keine Vorgeschichte von TVT
- keine orale Hormontherapie

## D-Dimere {: #D-Dimere}

Die D-Dimer-Bestimmung hat eine hohe Sensitivität für Thromboembolie, d.h. negative D-Dimere machen eine Lungenembolie sehr unwahrscheinlich.

Andererseits gibt es viele andere, mögliche Ursachen für eine D-Dimer-Erhöhung. Der Test ist nicht geeignet, den Verdacht auf eine Lungenembolie zu bestätigen.

Da die D-Dimer-Werte mit dem Alter ansteigen, wird empfohlen, bei Personen über 50 Jahren einen Grenzwert von 10&nbsp;&times; Lebensalter (in µg/L) zu verwenden.

## PESI (Pulmonary Embolism Severity Index) für den Schweregrad {: #pesi-h}

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

**Sehr niedriges Risiko** (30-Tage-Mortalität 0-1,6%)
{: .pesi-output .kasten .class1 }

**Niedriges Risiko** (30-Tage-Mortalität 1,7-3,5%)
{: .pesi-output .kasten .class2 .hidden }

**Mittleres Risiko** (30-Tage-Mortalität 3,2-7,1%).<br>
Stationäre Aufnahme.<br>
Bei Rechts-Herz-Belastung im Echo und Troponinerhöhung weiter mit "<a href="schwere-lungenembolie">Schwere Lungenembolie</a>"
{: .pesi-output .kasten .class3 .hidden }

**Hohes Risiko** (30-Tage-Mortalität 4,0-11,4%). <br>
Stationäre Aufnahme. <br>
Bei Rechts-Herz-Belastung im Echo und Troponinerhöhung weiter mit "<a href="schwere-lungenembolie">Schwere Lungenembolie</a>"
{: .pesi-output .kasten .class4 .hidden }

**Sehr hohes Risiko** (30-Tage-Mortalität 10,0-24,5%). <br>
Stationäre Aufnahme. <br>
Bei Rechts-Herz-Belastung im Echo und Troponinerhöhung weiter mit "<a href="schwere-lungenembolie">Schwere Lungenembolie</a>"
{: .pesi-output .kasten .class5 .hidden }

## Weiterlesen

- [2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism](https://academic.oup.com/eurheartj/article/41/4/543/5556136)

*[NMH]: Niedermolekulares Heparin

<script src="/theme/js/lae1.js"></script>
<script>
    // this is for page reloads with checked boxes
    window.addEventListener("load", () => {
        calc_score("rGeneva");
        calc_score("pesi");
    });
</script>
