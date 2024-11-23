<h1><b>Etapele dezvoltarii proiectului</b></h1>
1. Template Pagini Web *Home Page*. Creare si testare functionalitati de logare si sesiuni
  - Creearea bazei de date in MySQL cu tabelele necesare (vezi https://github.com/TRBogdann/Aplicatie-Notite/blob/main/schemaBazeiDeDate.jpeg)
  - Creearea obiectelor in JS
  - Creearea paginii HTML
  - Creearea elemetelor CSS de baza
  - Crearea legaturii dintre BackEnd(BD) si FrontEnd (pag web) folosind REST API
  - Implementare functionalitate Login folosind legatura REST si testarea ei
2. Intrumente de parsare format md (testarea implementarii acestora in pagina)
  - Adaugarea Atasamentelor
  - Adaugare componente iframe pe baza notitelor
3. Pagina editare,stergere,creare notite
  - Creaarea in FrontEnd a Obiectului Pagina
  - Pagina este un obiect public, unde au acces toti cei care au link la ea
  - Implementarea instrumentelor de md realizate in pasul anterior
  - Crearea functiilor de <b>Creare</b>, <b>Editare</b> si <b>Stergere</b> folosind butoane specifice si conexiunea la BD
  - Adaugarea unor sectiuni specifice pentru introducerea materiilor, etichetelor (tag) si a cuvintelor cuvinte cheie
  - Adaugarea datei preluate din sistem ca mod extra de filtrare
4. Creearea si filtrarea colectiilor in *Home Page* bazat pe filtrere create anterior prin intermediul unor drop down lists
5. Functionalitate Partajare
  - Partajarea se va face folosind distribuirea unui link la pagina
  - In BackEnd recipientul este marcat ca un owner
  - Toti Ownerii pot edita paginile, indiferent de creator, astfel colegii pot corecta sau imbogatii notitele creatorilor de notite
  - Notitele se vor actualiza in timp real trimitand un mesaj la FrontEnd sa se actualizeze la ficare modificare adusa paginii
6. Implementarea grupurilor
  - Creearea unui grup de oameni
  - Adaugarea la grup se va face folosind un search bar conectat la BD unde se va scrie UserName-ul utilizatorului cautat, si se va finaliza procesul de invitare prin apasarea unui Button
  - In cazul in care este gasit, User-ul nou va fi adaugat in membrii grupului si va avea acces la mesajele/documentele aferente acestuia
  - Altfel, cel care a invitat v-a primi un mesaj de eroare ca User-ul cautat nu exista
  - Implementarea functiei de partajare in grup se va face printr-un button care va deschide un pop-up pentru a selecta Obiectul de tip Pagina de partajat din lista de Pagini ale Userului
  - Paginile partajate vor fi adaugate in colectia de pagini ale grupului, unde vor avea acces toti membri, fara a avea ownership asupra paginii efective, ownership-ul fiind al Obiectului grup
  - Ca si inainte, toate paginile vor fi editabile de mebri si se vor actualiza in timp real 
