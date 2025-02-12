document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const darkModeToggle = document.getElementById("darkModeToggle");
        const darkModeIcon = document.getElementById("darkModeIcon");
        const body = document.body;

        if (localStorage.getItem("dark-mode") === "enabled") {
            body.classList.add("dark-mode");
            darkModeIcon.classList.replace("fa-moon", "fa-sun");
        }

        darkModeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-mode");

            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("dark-mode", "enabled");
                darkModeIcon.classList.replace("fa-moon", "fa-sun");
            } else {
                localStorage.setItem("dark-mode", "disabled");
                darkModeIcon.classList.replace("fa-sun", "fa-moon");
            }
        });
    }, 500);
});
