# Aplicatie-Notite
Grupa 1101 - Echipa 2AB

#Descriere Backend

Backend ul va contine utilitati ce permit logarea cu mail ul institutional, salvarea documentelor atasat, crearea grupurilor si pentru partajarea notitelor
si implementarea unui de "ownership" pentru acestea.

#Descriere Schema Bazei de Date

Tabelul users: Gestionarea informațiilor despre utilizatori (ID, nume, prenume, email, parola hashată, verificare cont).
Tabelul notes: Conține notițele utilizatorului, inclusiv modul de partajare și hash-ul pentru acces.
Tabelul attachment: Stochează fișiere atașate notițelor (imagini, documente).
Tabelul groups și group_link: Permite organizarea notițelor în grupuri și legătura între utilizatori și grupuri.
Tabelul sessions: Gestionează sesiunile utilizatorilor pentru autentificare și urmărirea activității.
Tabelul requests: Stochează cererile și interacțiunile utilizatorilor (de ex., solicitări de acces la notițe partajate).

#Descriere Frontend

Notitele vor respecta formatul md si vor permite implementarea frame urilor pentru a adauga resurse video sau audio. <br>
Aplicatia va putea parsa documentele MD primite in urma unei cereri catre aplicatia de backend.
Aplicația permite utilizatorilor să creeze, editeze, vizualizeze, șteargă și organizeze notițe asociate activităților academice. Aceasta include suport pentru atașamente (imagini, documente) și integrarea unor funcționalități avansate precum partajarea notițelor între utilizatori și organizarea în grupuri de studiu.
Ne dorim ca aplicatia sa permita actualizarea notitelor in timp real. Astfel schimbarile efectuate asupra unei notite vor fi vizibile si pentru alti utilizatori ce
vizualizeaza aceiasi notita. <br>
Notițele pot fi structurate pe categorii (materii), date, etichete sau cuvinte-cheie, facilitând regăsirea rapidă a informațiilor

Tehnologii Utilizate:
Fontend: ReactJs, Html, Css, Js
Backend: NodeJs, Express, BCrypt, ExpressSessions
Baze de Date: MySql
