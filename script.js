/* ===================================
   SSF STORE SETTINGS
=================================== */

const STORE_CONFIG = {

    // ضع رقم واتساب البراند هنا
    // مثال: 201012345678
    // بدون علامة +

    whatsappNumber: "201023713311",
    instagram: "https://www.instagram.com/super_strength_fit?cplk=aGhpa283b3ZjbWp2",

    currency: "EGP",


    // أسعار الشحن التجريبية

    shipping: {

        "القاهرة": 45,
        "الجيزة": 45,
        "الإسكندرية": 65,
        "القليوبية": 40,
        "الشرقية": 55,

        "الدقهلية": 60,
        "الغربية": 55,
        "المنوفية": 50,
        "البحيرة": 60,
        "كفر الشيخ": 65,

        "دمياط": 65,
        "بورسعيد": 65,
        "الإسماعيلية": 60,
        "السويس": 60,

        "الفيوم": 65,
        "بني سويف": 70,
        "المنيا": 75,
        "أسيوط": 80,
        "سوهاج": 85,

        "قنا": 90,
        "الأقصر": 95,
        "أسوان": 100,

        "البحر الأحمر": 100,
        "مطروح": 110,
        "شمال سيناء": 110,
        "جنوب سيناء": 120,
        "الوادي الجديد": 130

    }

};



/* ===================================
   PRODUCTS
=================================== */

const PRODUCTS = [

    {

        id: "tee-black",

        name: "SSF Oversized Tee — Black",

        category: "OVERSIZED T-SHIRT",

        price: 450,

        description:
            "A relaxed oversized essential built for everyday movement. Soft-touch feel with a confident silhouette.",

        descriptionAr:
            "تيشيرت أوفر سايز بقصة مريحة مناسب للحركة والاستخدام اليومي. قطعة أساسية بتصميم قوي وخامة مريحة.",

        image:
            "image/ChatGPT Image Nov 17, 2026, 08_50_59 PM.png",

        tag: "BEST SELLER",

        sizes: ["S", "M", "L", "XL", "XXL"]

    },


    {

        id: "tee-white",

        name: "SSF Oversized Tee — White",

        nameAr: "تيشيرت SSF أوفر سايز — أبيض",

        category: "OVERSIZED T-SHIRT",

        categoryAr: "تيشيرت أوفر سايز",

        price: 450,

        description:
            "Clean lines, relaxed fit and easy everyday comfort. Your new go-to tee.",

        descriptionAr:
            "تصميم بسيط وقصة أوفر سايز مريحة. التيشيرت الأساسي اللي هتعتمد عليه كل يوم.",

        image:
           "image/ChatGPT Image Nov 17, 2026, 08_51_03 PM.png",

        tag: "NEW DROP",

        sizes: ["S", "M", "L", "XL", "XXL"]

    },


    {

        id: "melton-black",

        name: "SSF Melton Pants — Black",

        nameAr: "بنطلون ميلتون SSF — أسود",

        category: "MELTON PANTS",

        categoryAr: "بنطلون ميلتون",

        price: 650,

        description:
            "Relaxed everyday pants with a clean streetwear shape and comfortable feel.",

        descriptionAr:
            "بنطلون ميلتون بقصة مريحة وستايل ستريت وير عملي يناسب يومك والتمرين.",

        image:
            "image/ChatGPT Image Nov 17, 2026, 08_50_48 PM.png",

        tag: "CORE",

        sizes: ["S", "M", "L", "XL", "XXL"]

    },


    {

        id: "melton-grey",

        name: "SSF Melton Pants — Grey",

        nameAr: "بنطلون ميلتون SSF — رمادي",

        category: "MELTON PANTS",

        categoryAr: "بنطلون ميلتون",

        price: 650,

        description:
            "A versatile relaxed fit designed to pair with your everyday essentials.",

        descriptionAr:
            "قصة مريحة ولون سهل التنسيق مع قطعك الأساسية في كل يوم.",

        image:
        "image/ChatGPT Image Nov 17, 2026, 08_51_07 PM.png",

        tag: "LIMITED",

        sizes: ["S", "M", "L", "XL", "XXL"]

    }

];



/* ===================================
   GLOBAL ACCESS
=================================== */

window.SSF = {

    STORE_CONFIG,
    PRODUCTS

};



/* ===================================
   LANGUAGE
=================================== */

function currentLang() {

    return localStorage.getItem("ssf-lang") || "ar";

}


function applyLanguage(lang) {

    localStorage.setItem("ssf-lang", lang);

    document.documentElement.lang = lang;

    document.documentElement.dir =
        lang === "ar" ? "rtl" : "ltr";


    document.querySelectorAll("[data-ar][data-en]").forEach(el => {

        const value = el.dataset[lang];

        if (value !== undefined) {

            el.innerHTML = value;

        }

    });


    const toggle = document.getElementById("languageToggle");

    if (toggle) {

        toggle.textContent = lang === "ar" ? "EN" : "عربي";

    }

}



/* ===================================
   CURRENCY
=================================== */

function money(amount) {

    return `${Number(amount).toLocaleString(
        currentLang() === "ar" ? "ar-EG" : "en-US"
    )} ${currentLang() === "ar" ? "ج.م" : "EGP"}`;

}



/* ===================================
   RENDER PRODUCTS
=================================== */

function renderProducts() {

    const grid = document.getElementById("productGrid");

    if (!grid) return;


    grid.innerHTML = PRODUCTS.map(product => `

        <a class="product-card reveal"
           href="product.html?id=${encodeURIComponent(product.id)}">

            <div class="product-visual">

                <img
                    src="${product.image}"
                    alt="${product.nameAr}"
                    loading="lazy"
                >

                <span class="product-tag">
                    ${product.tag}
                </span>

                <div class="quick-view">

                    <span>
                        ${currentLang() === "ar"
                            ? "عرض التفاصيل"
                            : "VIEW DETAILS"}
                    </span>

                    <b>↗</b>

                </div>

            </div>


            <div class="product-meta">

                <div>

                    <h3>
                        ${currentLang() === "ar"
                            ? product.nameAr
                            : product.name}
                    </h3>

                    <p>
                        ${currentLang() === "ar"
                            ? product.categoryAr
                            : product.category}
                    </p>

                </div>

                <strong>
                    ${money(product.price)}
                </strong>

            </div>

        </a>

    `).join("");


    document.getElementById("productCount").textContent =
        `0${PRODUCTS.length} PRODUCTS`;


    observeReveals();

}



/* ===================================
   SCROLL ANIMATION
=================================== */

function observeReveals() {

    const items = document.querySelectorAll(
        ".reveal:not(.visible)"
    );


    if (!("IntersectionObserver" in window)) {

        items.forEach(item => item.classList.add("visible"));

        return;

    }


    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.12

    });


    items.forEach(item => observer.observe(item));

}



/* ===================================
   INITIALIZATION
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    applyLanguage(currentLang());

    renderProducts();

    observeReveals();


    const languageButton =
        document.getElementById("languageToggle");


    if (languageButton) {

        languageButton.addEventListener("click", () => {

            const newLanguage =
                currentLang() === "ar" ? "en" : "ar";

            applyLanguage(newLanguage);

            renderProducts();

        });

    }


    const whatsappLink =
        document.getElementById("footerWhatsapp");


    if (whatsappLink) {

        whatsappLink.href =
            `https://wa.me/${STORE_CONFIG.whatsappNumber}`;

    }

});