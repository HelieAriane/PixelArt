const tailleGrille = document.getElementById("tailleGrille");
const afficheTailleGrille = document.getElementById("afficheTailleGrille");
const choisirCouleur = document.getElementById("choisirCouleur");
const listeCouleurs = document.getElementById("listeCouleurs");
const effacerPaletteBouton = document.getElementById("effacerPalette");
const conteneurGrille = document.getElementById("grille");

let couleurs = [];

//Créer la grille
function creerGrille(taille) {
  const tailleCarre = 600 / taille;
  conteneurGrille.innerHTML = '';
  conteneurGrille.style.display = "grid";
  conteneurGrille.style.gridTemplateColumns = `repeat(${taille}, ${tailleCarre}px)`;
  conteneurGrille.style.gridTemplateRows = `repeat(${taille}, ${tailleCarre}px)`;

  for (let i = 0; i < taille * taille; i++) {
    const carre = document.createElement("div");
    carre.classList.add("carre");
    carre.addEventListener("mouseover", colorier);
    conteneurGrille.appendChild(carre);
  }
}
//Créer la grille initiale (taille par défaut 16x16)
creerGrille(16);

//Changer la taille de la grille
tailleGrille.addEventListener("input", () => {
  const taille = tailleGrille.value;
  afficheTailleGrille.textContent = `${taille}x${taille}`;
  creerGrille(taille);
});

//Changer la couleur des carré dans la grille
function colorier(event) {
  let element = event.target;
  if (couleurs.length === 0) {
    element.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  } else {
    const couleurAleatoire = couleurs[Math.floor(Math.random() * couleurs.length)];
    element.style.backgroundColor = couleurAleatoire;
  }
}

//Ajouter une couleur à la palette
choisirCouleur.addEventListener("input", () => {
  const couleur = choisirCouleur.value;
  if (!couleurs.includes(couleur)) {
    couleurs.push(couleur);
    mettreAJourListeCouleurs();
  }
});


//Mettre à jour la liste des couleurs choisies avec des carrés
function mettreAJourListeCouleurs() {
  listeCouleurs.innerHTML = '';
  couleurs.forEach(couleur => {
    const carreCouleur = document.createElement("div");
    carreCouleur.classList.add("carreCouleur");
    carreCouleur.style.backgroundColor = couleur;
    listeCouleurs.appendChild(carreCouleur);
  });

  if (couleurs.length > 0) {
    effacerPaletteBouton.style.display = "block";
  } else {
    effacerPaletteBouton.style.display = "none";
  }
}

//Effacer la palette de couleurs
effacerPaletteBouton.addEventListener("click", () => {
  couleurs = [];
  mettreAJourListeCouleurs();
});