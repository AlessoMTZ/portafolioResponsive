document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const darkModeIcon = document.getElementById("darkModeIcon");
    const body = document.body;

    // Verificar si el modo oscuro está activado en localStorage
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeIcon.classList.replace("fa-moon", "fa-sun"); // Cambia el icono a sol
    }

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Cambiar el ícono según el estado del modo oscuro
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            darkModeIcon.classList.replace("fa-moon", "fa-sun"); // Cambia a sol ☀️
        } else {
            localStorage.setItem("dark-mode", "disabled");
            darkModeIcon.classList.replace("fa-sun", "fa-moon"); // Cambia a luna 🌙
        }
    });
});
