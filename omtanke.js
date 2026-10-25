// De seks spørgsmål
// omvendt: true betyder, at NEJ er godt for købet (JA er et argument imod)
const sporgsmaal = [{ tekst: "Kan jeg style den på 3 måder?" }, { tekst: "Har jeg noget lignende?", omvendt: true }, { tekst: "Vil jeg bruge den om et år?" }, { tekst: "Er kvaliteten god?" }, { tekst: "Ville jeg købe den til fuld pris?" }, { tekst: "Har jeg tænkt over købet i en uge?" }];

// Svaret ud fra antal point (højeste først)
const resultater = [
  { min: 5, titel: "Køb den!", tekst: "Du har tænkt dig godt om. Den kommer til at blive brugt." },
  { min: 3, titel: "Vent en uge", tekst: "Måske er det et godt køb. Sov på den, og se om du stadig vil have den." },
  { min: 0, titel: "Spring over", tekst: "Det ligner et impulskøb. Se, om du har noget lignende i din garderobe." },
];

// Find elementerne på siden
const sporgsmaalDel = document.getElementById("sporgsmaal-del");
const resultatDel = document.getElementById("resultat-del");
const nrEl = document.getElementById("nr");
const statusEl = document.getElementById("status");
const tekstEl = document.getElementById("sporgsmaal-tekst");
const titelEl = document.getElementById("resultat-titel");
const resultatTekstEl = document.getElementById("resultat-tekst");
const knapper = document.querySelectorAll("#sporgsmaal-del button");
const igenKnap = document.getElementById("proev-igen");

let nr = 0; // hvilket spørgsmål vi er ved (0 = det første)
let point = 0; // samlede point

function visSporgsmaal() {
  tekstEl.textContent = sporgsmaal[nr].tekst;
  nrEl.textContent = nr + 1;
  statusEl.value = nr + 1;
}

function visResultat() {
  const svar = resultater.find((r) => point >= r.min);
  titelEl.textContent = svar.titel;
  resultatTekstEl.textContent = svar.tekst;
  sporgsmaalDel.hidden = true;
  resultatDel.hidden = false;
}

// Når man trykker på JA, NEJ eller MÅSKE
knapper.forEach((knap) => {
  knap.addEventListener("click", () => {
    let svarPoint = Number(knap.dataset.point);

    // vend pointene om ved spørgsmål hvor JA er dårligt for købet
    if (sporgsmaal[nr].omvendt) {
      svarPoint = 1 - svarPoint;
    }

    point += svarPoint;
    nr++;

    if (nr < sporgsmaal.length) {
      visSporgsmaal();
    } else {
      visResultat();
    }
  });
});

// Prøv igen: start forfra
igenKnap.addEventListener("click", () => {
  nr = 0;
  point = 0;
  visSporgsmaal();
  resultatDel.hidden = true;
  sporgsmaalDel.hidden = false;
});

// PRIS PR. BRUG
const prisSlider = document.getElementById("pris-slider");
const brugSlider = document.getElementById("brug-slider");
const prisOutput = document.getElementById("pris-output");
const brugOutput = document.getElementById("brug-output");
const prisPrBrugEl = document.getElementById("pris-pr-brug");
const vurderingEl = document.getElementById("pris-vurdering");

function opdaterPris() {
  const pris = Number(prisSlider.value);
  const brug = Number(brugSlider.value);
  const prisPrBrug = Math.round(pris / brug);

  prisOutput.textContent = pris;
  brugOutput.textContent = brug;
  prisPrBrugEl.textContent = prisPrBrug;

  // skift teksten alt efter hvor dyr den er pr. gang
  if (prisPrBrug <= 20) {
    vurderingEl.textContent = "Godt køb - du får meget ud af den";
  } else if (prisPrBrug <= 50) {
    vurderingEl.textContent = "Okay køb - overvej om du bruger den nok";
  } else {
    vurderingEl.textContent = "Dyrt pr. gang - tænk dig om en ekstra gang";
  }
}

// "input" kører hver gang man trækker i slideren
prisSlider.addEventListener("input", opdaterPris);
brugSlider.addEventListener("input", opdaterPris);

opdaterPris(); // kør én gang, så tallene passer fra start
