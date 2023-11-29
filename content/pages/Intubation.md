Title: Intubation von kritisch Kranken
Slug: intubation
Authors: Florian Kroschel, Johannes Ammon
Tags: TBD
Status: published
Sorting: 500

{% set ns = namespace(input_nr = 0) %}

{% macro check(label) -%}
{% set ns.input_nr = ns.input_nr + 1 %}
<div>
    <input type="checkbox" id="input{{ ns.input_nr }}">
    <label for="input{{ ns.input_nr }}">{{ label }}</label>
</div>
{%- endmacro %}

<div class="cards">
    <div class="card">
        <h2>Patient/in</h2>
        <h3>Präoxygenierung</h3>

        {{ check("FiO<sub>2</sub>&nbsp;100% (z.B. O<sub>2</sub>-Maske mit
        Reservoir) oder NIV/CPAP")
        }}

        <h3>Monitoring</h3>

        {{ check("EKG,") }}
        {{ check("Blutdruck (invasiv oder NBD/Auto 2&nbsp;min)") }}
        {{ check("SaO<sub>2</sub> mit Ton") }}
        {{ check("Kapnographie (funktioniert?)") }}

        <h3>Allgemeinsituation optimieren</h3>

        {{ check("bei Hypotonie Volumengabe? Noradrenalinperfusor?") }}
        {{ check("Azidose puffern?") }}
        {{ check("Oxygenierung verbessern? NIV mit PEEP?") }}

        <h3>Position</h3>

        {{ check("Präoxygenierung in aufrechter Position") }}
        {{ check("Verbesserte Jacksonposition zur Intubation") }}
    </div>

    <div class="card">
        <h2>Material</h2>

        {{ check("Beatmungsbeutel mit Reservoir bzw. Demandventil") }}
        {{ check("funktionierende Absaugeinheit mit Katheter/Yankauer") }}
        {{ check("Tubus geeigneter Größe und eine Nummer kleiner") }}
        {{ check("Führungsstab") }}
        {{ check("Bougie/S-Guide") }}
        {{ check("Blockerspritze") }}
        {{ check("Tubusfixierung") }}
        {{ check("Stethoskop") }}
        {{ check("Videolaryngoskop mit passendem Spatel (Akku geladen?)") }}
        {{ check("Adrenalin 10&nbsp;µg/ml") }}
    </div>

    <div class="card">
        <h2>Team und Plan-B</h2>

        <h3>Aufgabenverteilung</h3>

        {{ check("Intubierende/r") }}
        {{ check("evtl. alternativ Intubierende/r") }}
        {{ check("Assistent/in Atemweg") }}
        {{ check("Assistent/in Medikamente & Kreislauf") }}

        <h3>Plan A</h3>

        {{ check("RSI / DSI / Wachintubation?") }}

        <h3>Plan B</h3>

        {{ check("Wer ruft Hilfe?") }}
        {{ check("Wer wird gerufen?") }}
        {{ check("Wie kann die Hilfe erreicht werden?") }}
        {{ check("Alternatives Atemwegsmanagement formuliert") }}
        {{ check("Plan B bereitgestellt") }}

    </div>

    <div class="card">
        <h2>Schwieriger Atemweg</h2>

        {{ check("Hilfe rufen! Plan B!") }}

        <h3>Beutel-Masken-Beatmung</h3>

        {{ check("Guedeltubus?") }}
        {{ check("Doppelter C-Griff?") }}

        <h3>Videolaryngoskop</h3>

        {{ check("D-Blade?") }}
        {{ check("S-Guide / Bougie?") }}

        <h3>Supraglottischer Atemweg</h3>

        {{ check("≤ 2&nbsp;Versuche") }}

        <h3>Aufwachversuch??</h3>

        <h3>Notfallkoniotomie</h3>

    </div>

    <div class="card span2">
        <h2>Narkose-"Rezepte"</h2>

        <div class="kasten">
            <h3>S-Ketamin / Rocuronium</h3>
            <p>Standardnarkose bei kritisch Kranken</p>
            <ul>
                <li>S-Ketamin 0,5–1&nbsp;mg/kg KG langsam i.v.</li>
                <li>Rocuronium 1–2&nbsp;mg/kg KG i.v.</li>
            </ul>
        </div>
        <div class="kasten">
            <h3>Propofol / Rocuronium</h3>
            <p>RRsys &gt; 180&nbsp;mmHg oder Myokardischämie</p>
            <ul>
                <li>Sufentanil 25–50&nbsp;µg i.v.</li>
                <li>Propofol 2–3&nbsp;mg/kg KG langsam i.v.</li>
                <li>Rocuronium 1&nbsp;mg/kg KG i.v.</li>
            </ul>
        </div>
        <div class="kasten">
            <h3>Etomidate / Rocuronium</h3>
            <p>Hypotone Patienten mit (V.a.) Myokardischämie</p>
            <ul>
                <li>Sufentanil 25–50&nbsp;µg i.v.</li>
                <li>Etomidate 0,2–0,6&nbsp;mg/kg KG langsam i.v.</li>
                <li>Rocuronium 1–2&nbsp;mg/kg KG i.v.</li>
            </ul>
        </div>

    </div>
</div>

---

## Erst stabilisieren, dann intubieren

- Sorge für eine angemessene Präoxygenierung, z.B. durch NIV mit FiO<sub>2</sub> 100%, CPAP/ASB, PEEP 5&nbsp;mbar, ASB 5–7&nbsp;mbar.
- Großkalibriger peripherer Zugang.
- Bei Hypotonie zuerst Abklärung und Behandlung der Ursachen ([RUSH-Untersuchung](Hypotonie.html#RUSH)). Bei Narkoseeinleitung wird sich die Hypotonie i.d.R. akut verschlechtern. Deshalb – wenn der Zustand des Patienten es erlaubt – noch vor der Intubation Volumendefizit ausgleichen, Blutprodukte geben,
- Wenn möglich Pneumothorax entlasten, Pleura- oder Perikarderguss drainieren. Diese Patienten können sich durch die Überdruckbeatmung akut verschlechtern.

## Auf hämodynamische Verschlechterung gefasst sein

- Ggf. Noradrenalin-Perfusor schon vor Intubation anlaufen lassen, systol. Blutdruck um 130–150&nbsp;mmHg anstreben.
- Bei Blutdruckabfall Gabe von 20–50&nbsp;µg Adrenalin (2–5&nbsp;ml aus 100&nbsp;ml NaCl mit 1&nbsp;mg Adrenalin = 10&nbsp;µg/ml).
- Überdruckbeatmung erhöht den intrathorakalen Druck und reduziert den venösen Rückstrom.

## Narkose

- Bei hypotonen Patienten sind geringere Dosierungen der Sedativa notwendig. Das Muskelrelaxans andererseits braucht eine höhere Dosierung, auch um eine kurze Anschlagszeit zu gewährleisten.
- Wenn eine Zwischenbeatmung erforderlich ist, mit niedrigem Tidalvolumen und einer Frequenz von 6–8/min beatmen. Mit Kapnographie die Effektivität der Beatmung überwachen.

Weiter mit [Post-Intubations-Checkliste](post-intubation.html)
