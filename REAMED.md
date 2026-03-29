# Fluxon – Webbasierter Online-Shop
 
> Ein moderner Full-Stack Online-Shop, entwickelt mit ASP.NET Core, MySQL und React.
 
---
 
## Projektbeschreibung
 
Im digitalen Zeitalter gewinnt der Online-Handel zunehmend an Bedeutung. Viele kleine Unternehmen und Start-ups benötigen kostengünstige, flexible und individuell anpassbare Online-Shop-Lösungen.
 
**Fluxon** ist ein webbasierter Online-Shop, der es Benutzern ermöglicht, Produkte online zu durchsuchen, in einen Warenkorb zu legen und Bestellungen durchzuführen.
 
---
 
## Ziel des Projekts
 
Entwicklung eines vollständigen Full-Stack-Systems, das:
 
- eine benutzerfreundliche Oberfläche bietet
- sicher mit Benutzerdaten umgeht
- eine strukturierte Datenbankanbindung besitzt
- Bestellungen zuverlässig speichert und verarbeitet
- auf einer echten Domain veröffentlicht werden kann
 
---
 
## Technologien
 
### Frontend
| Technologie | Verwendung |
|---|---|
| HTML | Struktur der Seiten |
| CSS | Design & responsives Layout |
| JavaScript | Dynamische Funktionen (Warenkorb, Validierung) |
| React | Komponentenbasierte UI |
 
### Backend
| Technologie | Verwendung |
|---|---|
| C# / ASP.NET Core | Server-Logik & REST-API |
| REST-API | Kommunikation zwischen Frontend & Backend |
| JWT | Authentifizierung & Autorisierung |
 
### Datenbank
| Tabelle | Beschreibung |
|---|---|
| `Users` | Benutzerverwaltung |
| `Products` | Produktkatalog |
| `Orders` | Bestellungen |
| `OrderItems` | Bestellpositionen |
| `Categories` | Produktkategorien |
| `Payments` | Zahlungsinformationen |
 
---
 
## Deployment
 
Die fertige Anwendung wird auf einem Webserver veröffentlicht und über eine eigene Domain erreichbar gemacht.
 
- HTTPS wird für sichere Verbindungen verwendet
- Die Anwendung ist vollständig produktionsbereit
 
---
 
## Projektstruktur
 
```
Fluxon/
├── frontend/          # React App
│   ├── src/
│   └── public/
├── backend/           # ASP.NET Core API
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   └── DTOs/
└── README.md
```
 
---
 
## Autor
 
Entwickelt im Rahmen eines projekts LEA.