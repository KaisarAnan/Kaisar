document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const apkCards = document.querySelectorAll(".apk-card");
    const toastContainer = document.getElementById("toastContainer");

    /**
     * Loading Screen Fade Out
     */
    window.addEventListener("load", () => {
        if (!loadingScreen) return;

        loadingScreen.style.transition = "opacity 0.5s ease, visibility 0.5s ease";
        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";

        setTimeout(() => {
            loadingScreen.remove();
        }, 600);
    });

    /**
     * Create Modern Toast
     */
    function showToast(message) {
        if (!toastContainer) return;

        const toast = document.createElement("div");

        toast.className = "toast";
        toast.textContent = message;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            toast.style.opacity = "0";
            toast.style.transform = "translateY(-10px)";

            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 1800);
    }

    /**
     * Page Fade Out Animation
     */
    function fadeOutAndRedirect(url) {
        document.body.style.transition = "opacity 0.35s ease";
        document.body.style.opacity = "0";

        setTimeout(() => {
            window.location.href = url;
        }, 350);
    }

    /**
     * Card Click Handler
     */
    apkCards.forEach((card) => {
        card.addEventListener("click", () => {
            const apkName = card.dataset.apkName;

            if (!apkName) return;

            apkCards.forEach((item) => {
                item.classList.remove("active");
            });

            card.classList.add("active");

            try {
                localStorage.setItem("selectedApk", apkName);
            } catch (error) {
                return;
            }

            showToast(`${apkName} dipilih`);

            setTimeout(() => {
                fadeOutAndRedirect("form.html");
            }, 700);
        });
    });
});