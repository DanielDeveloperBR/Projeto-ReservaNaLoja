const nav = document.querySelector("nav")
const hamb = document.getElementById("hamb")
hamb.addEventListener("click", () => {
    if (nav.style.display == "none" || nav.style.display == "") {
        nav.style.display = "block"
    } else {
        nav.style.display = "none"
    }
})

window.addEventListener("resize", () => {
    if (window.innerWidth >= 690) {
        nav.style.display = "block"
    } else {
        nav.style.display = "none"
    }
})