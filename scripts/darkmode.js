let darkmode = localStorage.getItem("darkmode");
const theme_switch = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode","active");
}

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
}

if(darkmode === "active") enableDarkmode()

theme_switch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode")
  if (darkmode !== "active") enableDarkmode()
    else disableDarkmode()
})