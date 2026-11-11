// here we state global variables

const articles = Array.from(document.getElementsByClassName("carouselArt"));
const btnLeft = document.getElementById("carouselBtnLeft");
const btnRight = document.getElementById("carouselBtnRight");
const themeToggle = document.getElementById("themeToggle");

const updateThemeToggle = () => {
  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDarkMode ? "☀️ Light mode" : "🌙 Dark mode";
  themeToggle.setAttribute("aria-pressed", isDarkMode);
  themeToggle.setAttribute("aria-label", `Switch to ${isDarkMode ? "light" : "dark"} mode`);
};

document.body.classList.toggle("dark-mode", localStorage.getItem("theme") === "dark");
updateThemeToggle();

themeToggle.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  updateThemeToggle();
});

let artInFocus;

const featureArt = (i) => {
  artInFocus = String(i);
  articles.forEach((art) => {
    const isInFocus = art.dataset.artid === artInFocus;
    art.classList.toggle("inFocusArt", isInFocus);
    art.classList.toggle("outOfFocusArt", !isInFocus);
    art.querySelector(".carouselHeading").setAttribute("aria-pressed", isInFocus);
  });

  btnLeft.disabled = artInFocus === "1";
  btnLeft.classList.toggle("btnDisabled", btnLeft.disabled);
  btnRight.disabled = artInFocus === String(articles.length);
  btnRight.classList.toggle("btnDisabled", btnRight.disabled);
};

const moveCarousel = (direction) => {
  const nextArticle = Number(artInFocus) + (direction === "next" ? 1 : -1);
  featureArt(nextArticle);
};

// only pages that have a carousel get the buttons wired up
if (btnLeft && btnRight) {
  articles.forEach((art) => {
    const headingButton = art.querySelector(".carouselHeading");
    headingButton.addEventListener("click", () => featureArt(art.dataset.artid));
  });

  btnLeft.addEventListener("click", () => moveCarousel("prev"));
  btnRight.addEventListener("click", () => moveCarousel("next"));
  featureArt(articles.find((art) => art.classList.contains("inFocusArt")).dataset.artid);
}
