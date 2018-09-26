const menuShow = document.getElementById("menu-toggle")
const menuClose = document.getElementById("menu-close")

const handleMenuToggle = () => {
    const drawer = document.getElementById("menu-drawer");
    const classes = drawer.className.split(" ")

    if (classes.indexOf("menu-drawer-hidden") !== -1) {
        drawer.className = classes.filter(c => c !== "menu-drawer-hidden").join(" ");
        document.body.className += "non-scrollable";
    } else {
        drawer.className = classes.concat("menu-drawer-hidden").join(" ");
        document.body.className = "";
    }
}

menuShow.addEventListener("click", handleMenuToggle);
menuClose.addEventListener("click", handleMenuToggle);
