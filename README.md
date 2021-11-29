

# Kanban Board

<img width="2544" alt="Screenshot 2021-11-28 at 18 32 52" src="https://user-images.githubusercontent.com/22593928/143779173-37158840-9661-4be0-b587-946a0dcfe3e7.png">


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

Ez a fejezet átugorható, ha nem szeretnénk külön szerveren futtatni a kliensoldalt, mivel a ```server/wwwroot``` mappában már található egy kész production build, így elég a szerveroldal konfigurációját elvégezni a futtatáshoz.

Developer módban fordítható és futtatható az alkalmazás az alábbi parancsok kiadásával (a client mappába navigálás után):

```
npm install
```
majd
```
npm start
```
Ekkor meg kell nyílnia egy böngészőablaknak, amiben az alkalmazás fut. Amennyiben nem fut még a szerveroldali alkalmazás mögötte, egy hibaüzenetet kell látnunk

Készíthető production build is az alábbi parancsok kiadásával (a client mappába navigálás után):
```
npm run build
```
Ennek eredményeképpen létrejön egy ```build``` mappa, aminek a tartalmát a webszerverünk statikus fájlokat kiszolgáló könyvtárába kell másolnunk.

### Komponensek
A komponensek rövid ismertetője:
* **App:** 
 
     A komponens-hierarchiában legfelül helyezkedik el. Ő tárolja a kártyák és oszlopok adatait lokálisan a memóriában, amiket REST-es requestek segítségével szinkronizál a szerver-oldallal .
* **Board:**

     Tartalmazza az oszlopokat.
* **Column**:
    
     Megjeleníti az oszlop törléséhez, valamint egy új kártya hozzáadásához szükséges gombokat. Tartalmazza a hozzá tartozó kátyákat.
* **Header**:
    
     Megjeleníti a főcímet és az oszlopok hozzáadásához használható gombot.
* **Task:**

     Egy feladatot reprezentál, megjeleníti a feladathoz tartozó adatokat: név, leírás, állapot, határidő. Illetve a hozzá tartózó felhasználói interakciókat biztosító gombokat: törlés, illetve szerkesztés. Utóbbi egy **EditTask** ablakot jelenít meg.
* Modals
  * **AddCol:** 
  
       Egy modal-módon megjeleníthető ablak, ami egy szöveges inputot és egy gombot tartalmaz, új oszlopot lehet hozzáadni vele.
  * **AddTask:** 
  
       Egy modal-módon megjeleníthető ablak, aminek a segítségével új kártyát tudunk létrehozni.
  * **EditTask:**
      
       Egy modal-módon megjeleníthető ablak, amivel egy kártya adatait tudjuk módosítani. Az inputok alapértelmezetten a kárya jelenlegi adatait tartalmazzák.
       
 ## Szerver-oldal
A repo gyökerében található egy server mappa, ez tartalmazza az ASP.NET-es szerveroldali alkalmazást. ```3.1.41```-es verzójú .NET Core-ra van targetelve.

 ### Adatbázis

Az alkalmazás a **Microsoft SQL Server** adatbáziskezelőt használja. Saját adatbázunkhoz kapcsolatot kell létesíteni, amit egy connection string segítségével tudunk megtenni a következő módon:

A server mappában hozzunk létre egy **appsettings.json** fájlt a következő tartalommal, ahol a **DefaultConnection** mezőnek a saját connection stringünket adjuk értékül:

```
{
	"ConnectionStrings": {
		"DefaultConnection": <Sajat connection string>
	},
	"Logging": {
		"LogLevel": {
			"Default": "Information",
			"Microsoft": "Warning",
			"Microsoft.Hosting.Lifetime": "Information",
			"Microsoft.EntityFrameworkCore.Database.Command": "Information"
		}
	},
	"AllowedHosts": "*"
}
```
Az ```AllowedHosts``` mező a CORS engedélyezéséhez szükséges, ha nem szeretnénk külön szerveren hostolni a kliens-oldalt, akkor elhagyható.
A ```Logging``` mező is elhagyható tetszés szerint.

Ezek után létre kell hoznunk a megfelelő sémát, amit egyszerűen megtehetünk az
[EF Core command-line tools](https://docs.microsoft.com/en-us/ef/core/cli/) segítségével:
 
A ```server``` mappába navigálás után adjuk ki a következő parancsot:
```
dotnet ef database update
```
Ez a ```server/Migrations``` mappában lévő előre legenerált osztályok segítségével létrehozza a szükséges adatbázis sémát.

 ### Build
 
 Miután az adatbázis konfigurálását elvégeztük, fordíthatjuk és futtathatjuk az alkalmazást:
```
dotnet run
```
Ezek után egy böngészővel a ```http://localhost:5000``` címen érhető el a felhasználói felület. 

Production build készítése pedig az alábbi paranccsal lehetséges:

```
dotnet publish
```

Ekkor a ```server/bin/Debug/netcoreapp3.1/publish``` mappába fordul az alkalmazás. Ez egy ún. framework-dependent cross-platform binary, ami nem tartalmazza magát a .net runtime-ot, cserébe platformfüggetlen.

Fontos, hogy a ```publish``` mappába másoljuk be a korábban létrehozott ```appsettings.json``` konfigurációs fájlt.
Ekkor a ```publish``` mappában kiadhatjuk a következő parancsot:

```
dotnet kanbanboard.dll
```
Ezzel elindul az alkalmazás.

 ### Unit test
 
 A ```server/test``` könyvtárban Unit-tesztek is találhatóak. Ezeket a [xUnit.net](https://xunit.net) nyílt forráskódú Unit-tesztelő eszközzel készítettem el.

3 db Unit tesztet megírtam, ezek tesztelik az oszlop és kártya létrehozását valamint a kártya szerkesztését.

 ### Architektúra
 
 A webalkalmazás architektúrája a Repository, valamint Dependency Injection tervezési mintákat igyekszik követni.

![Untitled Diagram](https://user-images.githubusercontent.com/22593928/143851018-ef5d7be8-6ff8-421c-967f-499bbd65440c.png)

A kliens **http-request**-eken keresztül kommunikál megfelelő API endpointtal. Az adat DTO-kban utazik, hogy felesleges adatokat ne helyezzünk ki a hálózatra.

A kontrollerek DI formában megkapják a repository-t, ami az adatokon végezhető műveleteket és lekérdezéseket szolgáltatja. A repository pedig DI-vel megkapja a DbContext-et, aminevel eléri az adatbázist.

A repository Entity Framework ORM-mel éri el az adatbázist és Linq-to-Entities queryket implementál.
