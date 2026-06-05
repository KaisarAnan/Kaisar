document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // ELEMENT
    // =========================================

    const appName = document.getElementById("appName");
    const appBannerImage = document.getElementById("appBannerImage");

    const packageContainer = document.getElementById("packageContainer");

    const quantityInput = document.getElementById("quantityInput");

    const summaryApp = document.getElementById("summaryApp");
    const summaryPackage = document.getElementById("summaryPackage");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryPrice = document.getElementById("summaryPrice");

    const buyButton = document.getElementById("buyButton");

    const toastContainer = document.getElementById("toastContainer");

    // =========================================
    // DATA APK
    // =========================================

    const selectedApk =
        localStorage.getItem("selectedApk") ||
        "Alight Motion";

    // =========================================
    // PRODUCT DATA
    // =========================================

    const productData = {

        "Alight Motion": {
            image: "edit.png",
            products: [
                {
                    name: "Alight Motion 1 Tahun Email Seller",
                    duration: "1 Tahun",
                    price: 5000,
                    bestSeller: true
                },
                {
                    name: "Alight Motion 1 Tahun Email Customer",
                    duration: "1 Tahun",
                    price: 8000,
                    bestSeller: false
                }
            ]
        },

        "WINK": {
            image: "wink.png",
            products: [
                {
                    name: "WINK Premium 1 Bulan",
                    duration: "1 Bulan",
                    price: 10000,
                    bestSeller: true
                },
                {
                    name: "WINK Premium 7 Hari",
                    duration: "7 Hari",
                    price: 8000,
                    bestSeller: false
                }
            ]
        }

    };

    // =========================================
    // STATE
    // =========================================

    let selectedProduct = null;
    let selectedPrice = 0;
    let selectedPayment = "QRIS";

    // =========================================
    // FORMAT RUPIAH
    // =========================================

    function formatRupiah(number) {

        return "Rp" +
            Number(number).toLocaleString("id-ID");

    }

    // =========================================
    // TOAST
    // =========================================

    function showToast(message) {

        const toast = document.createElement("div");

        toast.className = "toast";
        toast.textContent = message;

        toastContainer.appendChild(toast);

        setTimeout(() => {

            toast.style.opacity = "0";

            setTimeout(() => {
                toast.remove();
            }, 300);

        }, 2500);

    }

    // =========================================
    // LOAD APP DATA
    // =========================================

    function loadAppData() {

        const data = productData[selectedApk];

        if (!data) return;

        appName.textContent = selectedApk;

        appBannerImage.src = data.image;

        appBannerImage.alt = selectedApk;

    }

    // =========================================
    // RENDER PACKAGE
    // =========================================

    function renderPackages() {

        packageContainer.innerHTML = "";

        const products =
            productData[selectedApk].products;

        products.forEach((product, index) => {

            const card =
                document.createElement("article");

            card.className = "package-card";

            card.dataset.package =
                product.name;

            card.dataset.price =
                product.price;

            if (product.bestSeller) {

                const badge =
                    document.createElement("span");

                badge.className =
                    "best-seller-badge";

                badge.textContent =
                    "BEST SELLER";

                card.appendChild(badge);

            }

            const title =
                document.createElement("h3");

            title.textContent =
                product.name;

            const duration =
                document.createElement("p");

            duration.textContent =
                `Durasi ${product.duration}`;

            const price =
                document.createElement("strong");

            price.textContent =
                formatRupiah(product.price);

            card.appendChild(title);
            card.appendChild(duration);
            card.appendChild(price);

            card.addEventListener("click", () => {

                document
                    .querySelectorAll(".package-card")
                    .forEach(item => {
                        item.classList.remove("active");
                    });

                card.classList.add("active");

                selectedProduct =
                    product.name;

                selectedPrice =
                    product.price;

                updateSummary();

            });

            packageContainer.appendChild(card);

            if (index === 0) {

                card.classList.add("active");

                selectedProduct =
                    product.name;

                selectedPrice =
                    product.price;

            }

        });

    }

    // =========================================
    // PAYMENT
    // =========================================

    document
        .querySelectorAll(".payment-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                document
                    .querySelectorAll(".payment-card")
                    .forEach(item => {
                        item.classList.remove("active");
                    });

                card.classList.add("active");

                selectedPayment =
                    card.dataset.payment;

                updateSummary();

            });

        });

    // =========================================
    // UPDATE SUMMARY
    // =========================================

function updateSummary() {

    let quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
    }

    const total = selectedPrice * quantity;

    summaryApp.textContent =
        selectedApk || "-";

    summaryPackage.textContent =
        selectedProduct || "-";

    summaryQuantity.textContent =
        quantity;

    summaryPrice.textContent =
        formatRupiah(total);

    generateWhatsappLink();

}

// =========================================
// QUANTITY
// =========================================

if (quantityInput) {

    quantityInput.value = 1;

    quantityInput.addEventListener("input", function () {

        let quantity = parseInt(this.value);

        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }

        const total = selectedPrice * quantity;

        summaryQuantity.textContent = quantity;
        summaryPrice.textContent = formatRupiah(total);

        generateWhatsappLink();

    });

}

    // =========================================
    // WHATSAPP
    // =========================================

function generateWhatsappLink() {

    let quantity =
        parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
    }

    const total =
        selectedPrice * quantity;

    const message =
`Halo Admin,

Saya ingin melakukan pemesanan Apk Premium.

Aplikasi : ${selectedApk}
Paket : ${selectedProduct}
Jumlah : ${quantity}
Pembayaran : ${selectedPayment}
Total : ${formatRupiah(total)}

Mohon diproses. Terima kasih.`;

    buyButton.href =
        `https://wa.me/6285828936369?text=${encodeURIComponent(message)}`;

}

    // =========================================
    // VALIDASI BELI
    // =========================================

    buyButton.addEventListener("click", (event) => {

        if (!selectedProduct) {

            event.preventDefault();

            showToast(
                "Silakan pilih paket terlebih dahulu."
            );

            return;
        }

    });

    // =========================================
    // INIT
    // =========================================

    loadAppData();
    renderPackages();
    updateSummary();

});
