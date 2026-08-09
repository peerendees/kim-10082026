# Cursor-Briefing: Umbau der Landing Page

## Ausgangslage

Die Datei `index.html` in diesem Projekt ist eine funktionierende Landing Page zur
Masterclass-Session. Sie wurde auf Basis eines Konzepts gebaut, das inzwischen
ueberholt ist. Struktur, CI, Mechanik und Tonfall bleiben. Der Inhalt wird ersetzt.

Bitte NICHT neu bauen, sondern die bestehende Datei umarbeiten. Das Stylesheet
`assets/css/style.css` bleibt unveraendert, alle benoetigten Klassen existieren
bereits. `assets/js/main.js` bleibt unveraendert.

## Was sich geaendert hat

Die vorherige Session am 27. Juli hat bei allen Teilnehmern eine eigene virtuelle
Infrastruktur aufgebaut: VPS, Coolify als Management-Plattform, GitHub, und ein
deploytes "Hello World" unter eigener Domain. Der technische Durchstich ist gemacht.

Zwei Konsequenzen:

1. Die Teilnehmer legen KEIN neues Projekt mehr an und pruefen KEIN Node. Sie
   arbeiten im etablierten Muster: neuer Ordner, neue Claude-Code-Sitzung, Opus 5
   auf Max, Architektur-Dokumente als Markdown als Einstiegskontext.

2. Es gibt KEIN vorgegebenes Datenbankschema mehr. Jeder Teilnehmer waehlt im Call
   seinen eigenen Anwendungsfall. Die Seite muss deshalb ohne konkretes Schema
   auskommen und stattdessen das Muster vermitteln.

Das ist die wichtigste Aenderung: Die alte Seite gab eine Tabelle `kontakte` mit
sieben Spalten vor. Diese Vorgabe faellt komplett weg. Ueberall dort, wo bisher
konkretes SQL oder konkrete Spaltennamen standen, stehen jetzt Vorlagen mit
Platzhaltern oder Prompt-Muster.

## Was unveraendert bleibt

- BERENT CI vollstaendig, siehe `.cursor/rules`
- Das dreistufige System Basis / Plus (`++`) / Kuer (`+++`), Plus und Kuer in
  `<details>` eingeklappt
- Der Rahmen-Kasten oben: kein Wettbewerb, Basis ist das vollstaendige Lernziel
- Kopierbuttons an jedem Code-Block und jedem Prompt
- Zeitangaben als Dauer in Minuten, niemals Uhrzeiten
- Die Linear-Marker (`.linear`) als schmale Hinweise, kein eigener Abschnitt
- Sieben Abschnitte, durchnummeriert, Aufbau `step-head` / `duration`
- Der Hinweis, dass die Seite nach der Session stehen bleibt

## Neue Abschnittsstruktur

Sieben Abschnitte, Nummerierung 00 bis 06.

### 00 — Vorab, bitte vor der Session (ca. 10 Minuten)

Deutlich schlanker als bisher. Vier Punkte:

1. Claude Code laeuft, eingeloggt, Kontingent geprueft. Wir arbeiten mit Opus 5
   auf Max, das verbraucht spuerbar.
2. Supabase-Konto auf supabase.com anlegen, kostenlos, Anmeldung ueber GitHub.
   Noch kein Projekt anlegen.
3. Linear-Konto auf linear.app, falls noch nicht vorhanden.
4. Die Claude-Code-Sitzung vom 27. Juli wiederfinden, in der VPS, Coolify und
   GitHub eingerichtet wurden. Wir brauchen daraus ein Dokument.

Dazu ein `.warn`-Kasten: Wer die alte Sitzung nicht mehr hat, nicht dabei war oder
kein Kontingent mehr besitzt, findet in Schritt 02 eine Ersatzloesung. Kein Grund
fernzubleiben.

### 01 — Dein Anwendungsfall (ca. 20 Minuten)

Dieser Abschnitt ersetzt den frueheren Schritt "Projekt anlegen" und ist inhaltlich
komplett neu.

Kernaussage: Nicht jede Anwendung braucht eine Datenbank. Sie braucht eine, sobald
Daten laenger leben sollen als ein Seitenaufruf, oder sobald mehr als eine Person
darauf zugreift.

Dann Impulse als `ul.plus`, bewusst breit gestreut, damit sich jeder wiederfindet.
Zum Beispiel: Kontakt- und Netzwerkverwaltung, Angebots- und Leistungskatalog,
Feedback- oder Anmeldeformular mit Auswertung, Wissenssammlung, Projekt- oder
Auftragsuebersicht, Matching zwischen Anbietern und Anfragen, Terminanfragen.
Diese Liste ist Inspiration, keine Auswahl. Wer etwas Eigenes hat, nimmt das.

Danach der wichtigste Teil des Abschnitts: **Kriterien fuer einen Anwendungsfall,
der in zwei Stunden traegt.** Als `ul.plus`:

- Eine Sorte Dinge, nicht drei. Kontakte oder Angebote, nicht Kontakte UND Firmen
  UND Auftraege.
- Fuenf bis sieben Felder, mehr nicht.
- Anlegen und Anzeigen reicht als Funktionsumfang.
- Keine Anmeldung, keine Datei-Uploads, keine Zahlungen, keine KI-Suche. Das sind
  alles eigene Baustellen.

Dazu ein `.warn`-Kasten mit klarer Ansage: Wer heute zu gross denkt, hat am Ende
nichts, das laeuft. Der Anwendungsfall darf klein sein, er soll nur echt sein.
Ausbauen kannst du ab morgen.

Zum Abschluss eine Vorlage zum Ausfuellen, mit Kopierbutton. Sie wird spaeter in
Schritt 03 in den Startprompt eingesetzt:

```
Ich moechte [WAS] verwalten.
Die wichtigsten Angaben dazu sind: [FELD 1], [FELD 2], [FELD 3], ...
Ich moechte neue Eintraege anlegen und alle vorhandenen als Liste sehen.
Das Ziel ist: [WOZU ES DIR NUETZT]
```

Linear-Marker: Projekt anlegen, benannt nach dem eigenen Anwendungsfall. Vier
Issues, eines je Schritt 02 bis 05.

### 02 — Neue Sitzung vorbereiten (ca. 10 Minuten)

Warum eine neue Sitzung und nicht die alte: Die alte Sitzung ist voll mit
Server-Einrichtung. Fuer ein neues Vorhaben braucht es einen frischen Ordner und
einen frischen Kontext, sonst arbeitet Claude Code gegen alten Ballast an.

Schritt eins, in der ALTEN Sitzung, mit Kopierbutton:

```
Fasse die Infrastruktur zusammen, die wir hier aufgebaut haben. Schreibe eine
Datei architektur.md, die beschreibt: welcher VPS bei welchem Anbieter, wie
Coolify konfiguriert ist, wie das GitHub-Repository angebunden ist und wie ein
Deployment ablaeuft. Schreibe sie so, dass eine andere KI-Sitzung damit sofort
arbeiten kann, ohne diesen Chat zu kennen.
```

Schritt zwei: Neuen Ordner anlegen, benannt nach dem Anwendungsfall.
`architektur.md` hineinkopieren.

Schritt drei: Claude Code Desktop, neue Sitzung, diesen Ordner waehlen, Opus 5,
Max.

`.warn`-Kasten als Fallback: Wer die alte Sitzung nicht hat, nimmt die
Template-Datei von der Materialienseite (0.2) und fuellt sie mit seinen eigenen
Angaben, oder arbeitet zunaechst ohne Architekturdokument weiter. Fuer die heutige
Session ist es nicht zwingend, es macht spaeter beim Deployment den Unterschied.

### 03 — Der Startprompt (ca. 10 Minuten)

Die Dreiteilung erklaeren, bevor der Prompt kommt: Anwendungsfall, dann Supabase,
dann Linear, dann die Bitte um Fuehrung.

Vollstaendiger Prompt mit Kopierbutton, mit den Platzhaltern aus Schritt 01:

```
Ich habe eine eigene Infrastruktur aus VPS, Coolify und GitHub, beschrieben in
architektur.md in diesem Ordner. Lies sie zuerst.

Jetzt moechte ich einen naechsten Schritt gehen und zwei Bausteine ergaenzen:
Supabase als Datenbank und Linear als System fuer meinen Backlog.

Mein Anwendungsfall:
[HIER DIE VORLAGE AUS SCHRITT 01 EINSETZEN]

Fuehre mich bitte eins zu eins und sehr konkret durch den Prozess. Ich habe noch
nie selbst Code geschrieben. Erklaere mir bei jedem Schritt kurz, was passiert
und warum, bevor du ihn ausfuehrst.

Fang damit an, mir vorzuschlagen, welche Felder meine Tabelle haben sollte, und
warte auf meine Bestaetigung, bevor du sie anlegst.
```

Danach erklaeren, warum die letzten beiden Absaetze entscheidend sind: Ohne sie
baut Claude Code fuenfzehn Minuten am Stueck, und der Teilnehmer versteht am Ende
nichts. Das ist das eigentliche Lernziel des Abends, nicht das SQL.

Parallel dazu: Supabase-Projekt anlegen, Region Frankfurt, Passwort notieren.
Project Settings, Bereich API, dort stehen Project URL und der `anon public` key.

`.warn`-Kasten zum `service_role key`: steht auf derselben Seite, umgeht alle
Schutzregeln, gehoert nie in eine Anwendung und nie in einen Chat.

### 04 — Die Datenbank entsteht (ca. 30 Minuten)

Der laengste Block, und der am wenigsten vorschreibbare, weil jeder etwas anderes
baut. Die Seite gibt hier keine Schritte vor, sondern Orientierung: Woran erkenne
ich, dass es laeuft, und was mache ich, wenn nicht.

Drei Wegmarken als `ul.plus`, das sind die Punkte, an denen man kurz innehalten
sollte:

- Die Tabelle existiert. Im Table Editor sichtbar, mit den Spalten aus deinem
  Anwendungsfall.
- Die Anwendung zeigt Daten an. Trag vorher zwei Zeilen von Hand im Table Editor
  ein, dann hast du etwas zu sehen.
- Die Anwendung schreibt Daten. Ein Formular, ein Eintrag, eine neue Zeile.

Dann der `.env`-Teil, der fuer alle gleich ist, mit Kopierbutton:

```
VITE_SUPABASE_URL=https://DEINPROJEKT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

Dazu der Hinweis: Datei heisst nur `.env`, liegt neben der `package.json`, keine
Anfuehrungszeichen, keine Leerzeichen ums Gleichheitszeichen. Und: Nach dem
Anlegen muss der Entwicklungsserver neu gestartet werden, Strg+C und `npm run dev`.
Das ist die haeufigste Fehlerquelle des Abends.

Plus (`++`): Ladezustand und Leerzustand sauber behandeln, statt weisser Flaeche.
Prompt mitgeben.

Kuer (`+++`): Eintraege bearbeitbar machen und einzeln loeschen. Prompt mitgeben.
Hinweis, dass der Loeschen-Knopf in Schritt 06 nochmal wichtig wird.

Linear-Marker: Issue auf Done.

### 05 — Zwei Fenster, eine Wahrheit (ca. 10 Minuten, alle gemeinsam)

Kein Plus, keine Kuer. Der gemeinsame Moment.

Teil eins, jeder fuer sich: Zwei Browserfenster nebeneinander. Links die eigene
Anwendung auf `localhost`, rechts der Table Editor in Supabase. Eintrag links
anlegen, rechts neu laden, die Zeile ist da. Dann umgekehrt: rechts von Hand eine
Zeile anlegen, links neu laden, sie erscheint.

Der Punkt, ausformuliert: Deine Anwendung und deine Daten sind zwei getrennte
Dinge. Die Anwendung laeuft auf deinem Rechner. Die Daten liegen in Frankfurt.
Du koenntest die Anwendung morgen loeschen und neu bauen, die Daten waeren noch da.

Teil zwei, gemeinsam: Ein Link zu einem Teilnehmerverzeichnis, das bereits im Netz
steht. Alle tragen sich gleichzeitig ein, erfundene Daten ausdruecklich erwuenscht.
Auf dem geteilten Bildschirm laufen die Eintraege live in den Table Editor.

`.warn`-Kasten: Diese Datenbank ist offen und wird nach der Session geloescht.
Keine echten Daten Dritter eintragen.

Der Link zum Verzeichnis steht als PLATZHALTER_VERZEICHNIS_URL im Markup und wird
vor dem Livegang ersetzt.

### 06 — Rechte, Backlog und was als Naechstes kommt (ca. 15 Minuten)

Drei Teile in einem Abschnitt.

**Rechte.** Row Level Security ist bei neuen Tabellen aktiv. Wenn heute Abend
irgendwann keine Daten kamen, war das mit hoher Wahrscheinlichkeit der Grund, und
Claude Code hat vermutlich vorgeschlagen, den Schutz abzuschalten. Genau so landen
Prototypen offen im Netz.

Universeller SQL-Block mit Kopierbutton, Tabellenname als Platzhalter:

```
alter table DEINE_TABELLE enable row level security;

create policy "lesen"    on DEINE_TABELLE for select using (true);
create policy "anlegen"  on DEINE_TABELLE for insert with check (true);
create policy "aendern"  on DEINE_TABELLE for update using (true);
create policy "loeschen" on DEINE_TABELLE for delete using (true);
```

Erklaerung: Vier getrennte Regeln, nicht ein Schalter. Im Teilnehmerverzeichnis von
eben existieren nur die ersten beiden. Deshalb kann dort niemand loeschen, auch
wenn seine Anwendung einen Loeschen-Knopf haette. Die Regel steht in der Datenbank,
nicht im Programm, und deshalb kann sie niemand umgehen, indem er die Anwendung
veraendert.

Dazu ein `.warn`-Kasten: `using (true)` heisst "jeder darf alles". Das ist fuer
heute richtig und fuer echte Daten falsch. Sobald deine Anwendung im Netz steht und
echte Daten enthaelt, gehoert dort eine Regel hin, die an den angemeldeten Nutzer
gebunden ist.

**Backlog.** Linear-Marker, ausfuehrlicher als die vorherigen: Was heute nicht
fertig wurde, ist kein Versaeumnis, sondern die Arbeitsliste. Konkrete Kandidaten
nennen: Anmeldung, echte Zugriffsregeln, zweite Tabelle mit Beziehung, Suche und
Filter, Deployment auf den eigenen VPS.

**Ausblick.** Die Anwendung laeuft bisher nur lokal. Der Weg ins Netz ueber Coolify
ist bekannt, das Hello World steht ja schon dort. Zwei Dinge sind bei einer
Anwendung mit Datenbank anders: Die `.env` gehoert nicht ins Repository, die Werte
werden in Coolify als Umgebungsvariablen hinterlegt. Und aendert man sie dort,
reicht kein Neustart, die Anwendung muss neu gebaut werden.

Abschliessend der Satz vom Anfang: Wer heute eine Anwendung mit eigener Datenbank
zum Laufen gebracht hat, kann etwas, das er vorher nicht konnte. Alles Weitere ist
Zugabe.

## Hero und Rahmen

Der Hero-Text wird angepasst. Statt "Deine erste eigene Datenbank" etwas, das an
den 27. Juli anschliesst. Vorschlag zur Ueberarbeitung, gerne besser:

- Eyebrow bleibt: KI-Masterclass · KOERTING Institut
- H1: "Deine Infrastruktur bekommt ein Gedaechtnis"
- Lede: Am 27. Juli haben wir deine eigene Infrastruktur aufgebaut, VPS, Coolify,
  GitHub, und ein Hello World ins Netz gestellt. Heute kommt der Baustein dazu,
  der aus einer Seite eine Anwendung macht: eine Datenbank. Und Linear als System
  fuer alles, was danach noch kommt.

Der zweite Rahmen-Kasten "Wo laeuft eigentlich was" bleibt inhaltlich, wird aber
um Coolify und den VPS ergaenzt, damit die drei Orte klar sind: eigener Rechner
(Anwendung im Bau), Supabase in der Cloud (Daten), eigener VPS (Anwendung im Netz).

## Technische Hinweise

- In `data-copy` keine Umlaute und keine typografischen Anfuehrungszeichen. Die
  Inhalte gehen ins Terminal oder in Claude Code.
- Im `<pre>` duerfen Syntax-Spans (`.k`, `.c`) stehen, im `data-copy` niemals.
- Wenn ein Code-Block geaendert wird, muss `data-copy` mitgeaendert werden.
- Keine externen Requests, keine neuen Abhaengigkeiten, kein localStorage.
- Anfuehrungszeichen in SQL-Strings innerhalb von `data-copy` als `&quot;`
  maskieren, siehe bestehende Beispiele in der Datei.

## Abnahme

- `grep -c PLATZHALTER index.html` findet genau die Stellen fuer die
  Verzeichnis-URL, keine Reste aus dem alten Konzept
- Kein Vorkommen mehr von `kontakte`, `npm create vite`, `node -v`
- Jeder Code-Block und jeder Prompt hat einen funktionierenden Kopierbutton
- Alle Plus- und Kuer-Bloecke sind eingeklappt
- Seite laeuft ueber `npx serve .` fehlerfrei, Konsole ohne Meldungen
- Auf 390 Pixel Breite lesbar
