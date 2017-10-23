# ELTE IK Vizsgagenerátor (ik.ehog.hu) Angular 4<= UI

## Fontosabb mappák

Kérdések könyvtár: **src/data/a** a válaszokhoz, **src/data/q** a kérdésekhez. **src/data/pdf** mappa a PDF-megoldások helye. A fájlok elnevezése `kerdesId`.png vagy `kerdesId`.pdf
Lásd **mock** mappa.
`kerdesId` egyértelműen azonosítja a kérdést.

## Backend

A projektben **csak mock** adatok állnak rendelkezésre, a valódi PHP backend nem része a projektnek, ezek a **src/php** mappába kerülnek.  Az egyes végpontok az **url.service.ts** fájlban vannak leírva.


## Futtatás lokálisan, Angular CLI segítségével

A repo lehuzása után `npm install` majd `ng s` parancsokkal indítható el.
Bővebb infó: Lásd _@angular/cli_. 

Az alap elérési út ` http://localhost:4200`.
