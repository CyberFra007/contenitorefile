# Archivio Documenti — Guida Completa all'Attivazione

Questo repository è pronto per essere pubblicato come sito statico gratuito su GitHub Pages,
con lo scopo di conservare PDF/DOCX in cartelle, visualizzabili inline e liberamente crawlabili
dai bot AI (GPTBot, ClaudeBot, ecc.) perché nessun robots.txt li blocca.

Video di riferimento consigliato: **"How to Use GitHub Pages in 2026! (Beginner's Guide)"**
(canale YouTube *The Common Coder*) — copre la parte base (creazione repo, attivazione Pages).
Questa guida copre invece TUTTO il resto (cartelle dinamiche, viewer, mobile).

---

## PASSO 1 — Crea l'account e il repository

1. Vai su [github.com](https://github.com) e crea un account gratuito (se non lo hai già).
2. Clicca sul "+" in alto a destra → **New repository**.
3. Nome repository: scegline uno a tuo piacere, es. `miei-documenti`.
   - Se vuoi l'URL più semplice possibile (`https://TUOUSERNAME.github.io/`),
     chiamalo esattamente `TUOUSERNAME.github.io` (sostituendo il tuo username reale).
   - Altrimenti l'URL sarà `https://TUOUSERNAME.github.io/miei-documenti/`.
4. Seleziona **Public** (deve essere pubblico perché i crawler possano leggerlo e perché
   GitHub Pages gratuito richiede repo pubblici).
5. Spunta "Add a README file" oppure no, è indifferente: lo sostituirai con questo.
6. Clicca **Create repository**.

## PASSO 2 — Carica tutti questi file nel repository

Devi caricare **l'intera struttura di cartelle e file** che ti ho preparato:

```
/
├── index.html
├── viewer.html
├── robots.txt
├── _config.yml
├── README.md
├── assets/
│   ├── css/style.css
│   └── js/file-list.js
└── documenti/
    ├── esempio-cartella-1/   (qui dentro ci metterai i tuoi PDF/DOCX)
    └── esempio-cartella-2/
```

### Da PC (più semplice)
1. Entra nel repository su github.com.
2. Clicca **Add file → Upload files**.
3. Trascina dentro tutti i file e le cartelle che hai scaricato da questa chat
   (mantenendo la struttura: se il tuo browser non supporta il trascinamento di cartelle,
   carica prima i file nella root, poi entra/crea ogni sottocartella e carica il resto lì).
4. In fondo alla pagina scrivi un messaggio di commit (es. "Setup iniziale sito") e clicca
   **Commit changes**.

### Da Mobile
GitHub non permette ancora di caricare intere cartelle comodamente dall'app mobile ufficiale.
Due strade, scegli quella che preferisci:

**Opzione A — Browser in modalità Desktop (nessuna app aggiuntiva)**
1. Apri Chrome/Safari sul telefono e vai su github.com, fai login.
2. Attiva la visualizzazione "Richiedi sito desktop" (menu del browser).
3. Entra nel repository → i tre puntini `...` vicino a "Add file" → **Upload files**.
4. Seleziona i file dalla memoria del telefono (puoi scegliere più file alla volta,
   ma non intere cartelle: per le sottocartelle di `documenti/` dovrai entrare
   prima in quella cartella su GitHub e poi caricare i file lì dentro).
5. Scorri in basso, scrivi un messaggio di commit, conferma.

**Opzione B — App dedicata (più comoda per upload frequenti)**
- iOS: **Working Copy** (gratuita per operazioni base, client Git completo).
- Android: **Zip2Git** o qualunque client Git come **MGit**.
- Configuri una sola volta il collegamento al repository (serve un Personal Access Token,
  vedi PASSO 5), poi carichi file/cartelle in pochi tap.

## PASSO 3 — Attiva GitHub Pages

1. Nel repository, vai su **Settings** (in alto) → **Pages** (menu laterale sinistro).
2. In "Build and deployment" → **Source**, seleziona **Deploy from a branch**.
3. In "Branch", seleziona `main` (o `master`) e cartella `/ (root)`. Clicca **Save**.
4. Attendi 1-2 minuti: in cima alla stessa pagina apparirà il link del tuo sito pubblicato
   (es. `https://TUOUSERNAME.github.io/miei-documenti/`).

## PASSO 4 — Configura i due nomi nel codice (OBBLIGATORIO)

Il file `assets/js/file-list.js` deve sapere qual è il tuo username e il nome del repository,
per poter leggere l'elenco delle cartelle in automatico.

1. Apri (su GitHub stesso, con la matita "Edit" ✏️) il file `assets/js/file-list.js`.
2. Modifica queste due righe in cima:
   ```js
   const GITHUB_USERNAME = "TUO-USERNAME";   // <-- scrivi il tuo username GitHub reale
   const GITHUB_REPO     = "TUO-REPO";       // <-- scrivi il nome esatto del repository
   ```
3. Fai lo stesso nel file `robots.txt`, sostituendo `TUO-USERNAME` e `TUO-REPO` nell'ultima riga
   (Sitemap) — oppure cancella semplicemente quella riga, è opzionale.
4. Salva (commit) direttamente dall'editor di GitHub.

## PASSO 5 (solo se usi un'app mobile Git come Working Copy/Zip2Git) — Crea un Token

1. Su github.com → clicca sulla tua foto profilo → **Settings**.
2. In fondo al menu laterale: **Developer settings → Personal access tokens → Tokens (classic)**.
3. **Generate new token (classic)** → dai un nome, spunta il permesso **repo**, scadenza a piacere.
4. Copia il token (mostrato una sola volta) e incollalo nell'app mobile quando richiesto
   al posto della password.

## COME USARLO OGNI GIORNO

- **Creare una nuova cartella**: dentro `documenti/`, su GitHub clicca "Add file → Create new file",
  scrivi `documenti/nome-nuova-cartella/.gitkeep` come percorso/nome file (la cartella si crea da sola).
  Poi carica i file veri dentro.
- **Rinominare una cartella**: apri la cartella, rinomina ogni file singolarmente trascinandolo
  nella nuova posizione, oppure (più comodo da PC) usa GitHub Desktop o Git in locale.
  Da mobile/web puro, il modo più semplice è: crea la cartella nuova, carica di nuovo i file,
  elimina la vecchia cartella.
- **Aggiornare un file**: caricane uno con lo stesso nome nella stessa cartella: GitHub chiede
  se vuoi sovrascriverlo.
- **Eliminare**: apri il file o la cartella su GitHub, icona del cestino 🗑️ → conferma.
- **Nessun passaggio aggiuntivo serve per l'elenco**: `index.html` si aggiorna da solo leggendo
  il repository in tempo reale tramite l'API di GitHub.

## Perché risponde a tutti i tuoi parametri originali

- **Gratuito**: GitHub Pages è gratuito per repository pubblici, nessun costo nascosto.
- **Crawlabile senza blocchi**: `robots.txt` include `Allow: /` esplicito per tutti i crawler,
  compresi GPTBot, ClaudeBot, ChatGPT-User, Google-Extended, PerplexityBot.
- **Cartelle gestibili a piacere**: create/rinominate/aggiornate/eliminate direttamente
  dall'interfaccia web di GitHub, senza strumenti esterni.
- **Mobile + PC**: upload possibile da entrambi (vedi Passo 2).
- **Visualizzazione senza download forzato**: i PDF si aprono inline in un iframe nel browser;
  i DOCX vengono mostrati tramite Microsoft Office Online Viewer, anch'esso inline.
- **Capacità**: GitHub consiglia repository sotto 1 GB per prestazioni ottimali, con limite
  tecnico più alto (soft cap ~5 GB) — sufficiente per molte decine di PDF/DOCX tipici.
  Se in futuro superi questa soglia, si può migrare lo storage dei soli file a un bucket
  Cloudflare R2 (10 GB gratis) mantenendo identica la struttura del sito.
