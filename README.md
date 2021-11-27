
# Kanban Board

## Feladat

A konkrét feladat egy teendőket kezelő webalkalmazás backendjének és frontendjének elkészítése. A teendőket adatbázisban tároljuk és a webes felületen jelenítjük meg, a kiszolgáló pedig REST interfészen keresztül érhető el.
A teendők rendelkeznek címmel, leírással, határidővel és állapottal (függőben, folyamatban, kész, elhalasztva). A határidő helyett a prioritást a teendők sorrendje határozza meg, tehát az előbbi adataik mellett még az egymáshoz képesti sorrendet is tároljuk és megjelenítjük.

## Kliens-oldal
A repo gyökerében található egy client mappa, ez tartalmazza a react-es alkalmazást:
### Felhasznált third-party megoldások

* Általános UI design: [MaterialUI](https://mui.com)

* Kártyák mozgatásához drag and drop: [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

* Dátumkezelés: [date-fns](https://date-fns.org)



### Build
Developer módban fordítható és futtatható az alkalmazás az alábbi parancsok kiadásával (a client mappába navigálás után):

```
npm install
```
majd
```
npm start
```
Ekkor meg kell nyílnia egy böngészőablaknak, amiben az alkalmazás fut. Amennyiben nem fut még a szerveroldali alkalmazás mögötte, egy hibaüzenetet kell látnunk

Production módban fordítható az alkalmazás az alábbi parancsok kiadásával (a client mappába navigálás után):
```
npm run build
```
Ennek eredményeképpen létrejön egy build mappa, aminek a tartalmát a webszerverünk statikus kiszolgáló könyvtárába kell másolnunk.


### `npm start`

### Komponensek
A components mappában lévő komponensek rövid ismertetője:
* **App:** 
 
     A komponens-hierarchiában legfelül helyezkedik el. Ő tárolja a kártyák és oszlopok adatait lokálisan a memóriában, amiket szinkronizál a szerver-oldallal REST-es kérésekkel.
* **Board:**

     Tartalmazza az oszlopokat.
* **Column**:
    
     Megjeleníti az oszlop törléséhez, valamint egy új kártya hozzáadásához szükséges button-okat. Tartalmazza a hozzá tartozó kátyákat.
* **Header**:
    
     Megjeleníti a főcímet és az oszlopok hozzáadásához használható gombot.
* **Task:**

     Egy feladatot reprezentál, megjeleníti a feladathoz tartozó adatokat: név, leírás, állapot, határidő. Illetve a hozzá tartózó felhasználói interakciókat biztosító gombokat: törlés, illetve szerkesztés. Utóbbi egy **EditTask** ablakot jelenít meg.
* Modals
  * **AddCol:** 
  
       Egy modal-módon megjelenő ablak, ami egy szöveges inputot és egy gombot tartalmaz, új oszlopot lehet hozzáadni vele.
  * **AddTask:** 
  
       Egy modal-módon megjelenő ablak, aminek a segítségével új kártyát tudunk létrehozni.
  * **EditTask:**
      
       Egy modal-módon megjelenő ablak, aminek a segítségével egy kártya adatait tudjuk módosítani. Az inputok alapértelmezetten a kárya jelenlegi adatait tartalmazzák.
