# ELTE IK Vizsgagenerátor (ik.ehog.hu) Angular 4<= UI

## Nem része a reponak

* PHP backend (`src/php`)
* Kérdések és válastok képei (`src/data`), lásd lejjebb.
* Adatbázis és az adatmodell leírása.

## Kérdések

* **src/data/a/`kerdesId`_a.png**: Válaszok a kérdésekre (ha van)
* **src/data/q/`kerdesId`_q.png**: Kérdések képei (ha van)
* **src/data/pdf/`kerdesId`_pdf.pdf**: PDF-megoldások (ha van)

`kerdesId` egyértelműen azonosítja a kérdést.

## Glyph betűtípus

A glyph betűtípust a Glyphter segítségével állítom elő (https://glyphter.com), a **raw-glyphs** mappában lévő képeket húzom be.

* **Font name**: szemlelet-sans
* **Class prefix**: szemlelet-

minden más alap.


## Backend

A projektben **csak mock** adatok állnak rendelkezésre, a valódi PHP backend nem része a reponak, ezek a **src/php** mappába kerülnek.  Az egyes végpontok az **url.service.ts** fájlban vannak leírva.


## Futtatás lokálisan, Angular CLI segítségével

A repo lehuzása után `npm install` majd `ng s` parancsokkal indítható el.
Bővebb infó: Lásd _@angular/cli_. 

Az alap elérési út ` http://localhost:4200`.
