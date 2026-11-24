/*
 * Questo script legge in automatico il contenuto della cartella "documenti/"
 * direttamente dall'API pubblica di GitHub e genera l'elenco di cartelle e file.
 * NON devi mai modificare questo file quando aggiungi/rimuovi/rinomini cartelle:
 * basta cambiare i file nel repository e la pagina si aggiorna da sola.
 *
 * CONFIGURAZIONE RICHIESTA: sostituisci USERNAME e REPO qui sotto con i tuoi.
 */
const GITHUB_USERNAME = "CyberFra007";   // <-- cambia qui
const GITHUB_REPO     = "contenitorefile";       // <-- cambia qui
const ROOT_FOLDER      = "documenti";      // cartella radice dei documenti

const API_BASE = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents`;

async function fetchFolder(path) {
  const res = await fetch(`${API_BASE}/${path}`);
  if (!res.ok) throw new Error(`Impossibile leggere ${path}`);
  return res.json();
}

function iconFor(name) {
  if (name.toLowerCase().endsWith(".pdf")) return "📄";
  if (name.toLowerCase().endsWith(".docx") || name.toLowerCase().endsWith(".doc")) return "📝";
  return "📁";
}

function viewerLinkFor(item) {
  const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/main/${item.path}`;
  const ext = item.name.split(".").pop().toLowerCase();
  if (ext === "pdf") {
    return `viewer.html?type=pdf&file=${encodeURIComponent(rawUrl)}&name=${encodeURIComponent(item.name)}`;
  }
  if (ext === "docx" || ext === "doc") {
    return `viewer.html?type=office&file=${encodeURIComponent(rawUrl)}&name=${encodeURIComponent(item.name)}`;
  }
  return item.html_url;
}

async function renderFolder(path, container) {
  const items = await fetchFolder(path);
  const ul = document.createElement("ul");
  ul.className = "file-list";

  // Cartelle prima, poi file, entrambi in ordine alfabetico
  const folders = items.filter(i => i.type === "dir").sort((a,b) => a.name.localeCompare(b.name));
  const files = items.filter(i => i.type === "file").sort((a,b) => a.name.localeCompare(b.name));

  for (const folder of folders) {
    const li = document.createElement("li");
    li.className = "folder-item";
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = `📁 ${folder.name}`;
    details.appendChild(summary);
    const subContainer = document.createElement("div");
    subContainer.className = "subfolder";
    details.appendChild(subContainer);
    li.appendChild(details);
    ul.appendChild(li);

    details.addEventListener("toggle", async function onToggle() {
      if (details.open && subContainer.childElementCount === 0) {
        subContainer.textContent = "Caricamento…";
        try {
          await renderFolder(folder.path, subContainer);
          subContainer.textContent = "";
          await renderFolder(folder.path, subContainer);
        } catch (e) {
          subContainer.textContent = "Errore nel caricamento.";
        }
      }
    }, { once: false });
  }

  for (const file of files) {
    const li = document.createElement("li");
    li.className = "file-item";
    const a = document.createElement("a");
    a.href = viewerLinkFor(file);
    a.textContent = `${iconFor(file.name)} ${file.name}`;
    li.appendChild(a);
    ul.appendChild(li);
  }

  if (folders.length === 0 && files.length === 0) {
    const li = document.createElement("li");
    li.textContent = "(cartella vuota)";
    ul.appendChild(li);
  }

  container.appendChild(ul);
}

(async () => {
  const container = document.getElementById("file-browser");
  try {
    container.innerHTML = "";
    await renderFolder(ROOT_FOLDER, container);
  } catch (e) {
    container.innerHTML = `<p>Errore nel caricamento dell'elenco file: ${e.message}</p>
      <p>Verifica di aver impostato correttamente GITHUB_USERNAME e GITHUB_REPO in assets/js/file-list.js</p>`;
  }
})();
