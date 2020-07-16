**Projekt Beschreibung**

Connect ist ein Forum mit dem Ziel, eine Community aufzubauen die den Austausch zwischen Studierenden gleicher Studiengänge erleichtert. Dabei werden sie in deren Studiengängen zugewiesen und haben Zugriff auf alle Module deren Studienganges. Somit können studierende entweder Beiträge erstellen um Hilfe zu erhalten oder Kommentare schreiben um anderen zu helfen. Um die Lernkurve möglichst gering zu halten, haben wir versucht eine einfache und intuitive Benutzeroberfläche zu gestalten. 

Erweiterungen dieser Applikation, wie weitere Studiengänge oder neue Module können in Zukunft implementiert werden. Doch für die Präsentation liegt der Fokus nur auf der Perspektive eines Medieninformatik-Studenten an der Beuth Hochschule.

**Installationen**

Folgende Programme müssen installiert werden:

- Node.js: https://nodejs.org/de/download/
- MongoDB Community Server: https://www.mongodb.com/try/download/community

**Wie fange ich an?**

Entweder kann man online die Web-App benutzten unter folgendem Link: https://connect-beuth-app.herokuapp.com/

Oder man lädt sich die Datei lokal über GitLab: https://gitlab.beuth-hochschule.de/connect/connect herunter. Sobald Sie es heruntergeladen und alle benötigten Programme installiert sind, öffnen Sie ein Terminal Ihrer Wahl und geben: 

```
npm install -g @vue/cli 
```

ein. Nachdem die Installation abgeschlossen ist können wir nun den Server starten. Das macht man wie folgt:
Zu erst geht man in das backend Verzeichnis mit:

```
cd connect/backend
```

Danach müssen alle benutzen Abhängigkeiten installiert werden mit:

```
npm install
```

Und zu guter Letzt startet man den Server mit:

```
node app.js
```

Nachdem dies erfolgt ist, sollten Sie folgende Nachricht erhalten:

> Server is listening on port 3000
> Connection to mongodb://localhost:27017/connect_db successful.

Falls das der Fall ist, öffnen Sie ein zweites Terminal und wechseln in das frontend-Verzeichnis mit:

```
cd connect/frontend/connect-app
```

Und auch hier müssen alle Abhängigkeiten installiert werden mit:

```
npm install
```

Und zu guter Letzt:

```
npm run serve
```

Bei einer erfolgreichen Installation sehen Sie folgende Nachricht:

> DONE  Compiled successfully in 8227ms    

Nachdem alles erledigt wurde öffnen Sie einen Browser Ihrer Wahl und geben:

> http://localhost:8080/

ein, und die Applikation ist gestartet.