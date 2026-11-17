document.addEventListener("DOMContentLoaded", () => {


    const { PRODUCTS, STORE_CONFIG } = window.SSF;


    const params = new URLSearchParams(location.search);

    const product = PRODUCTS.find(p =>
        p.id === params.get("id")
    ) || PRODUCTS[0];


    let selectedSize = "";

    let qty = 1;


    const $ = id => document.getElementById(id);


    const lang = () =>
        localStorage.getItem("ssf-lang") || "ar";



    /* PRODUCT INFORMATION */

    function updateText() {

        document.title =
            `${lang() === "ar" ? product.nameAr : product.name} — SSF`;


        $("productName").textContent =
            lang() === "ar" ? product.nameAr : product.name;


        $("productCategory").textContent =
            lang() === "ar" ? product.categoryAr : product.category;


        $("productDescription").textContent =
            lang() === "ar"
                ? product.descriptionAr
                : product.description;


        $("productPrice").textContent =
            money(product.price);


        $("mainProductImage").style.backgroundImage =
            `url("${product.image}")`;


        renderSizes();

        updateSummary();

    }



    /* SIZE OPTIONS */

    function renderSizes() {

        $("sizeOptions").innerHTML = product.sizes.map(size => `

            <button
                type="button"
                class="size-btn ${selectedSize === size ? "active" : ""}"
                data-size="${size}">

                ${size}

            </button>

        `).join("");


        document.querySelectorAll(".size-btn").forEach(button => {

            button.addEventListener("click", () => {

                selectedSize = button.dataset.size;

                $("selectedSize").value = selectedSize;

                renderSizes();

            });

        });

    }



    /* SHIPPING AND TOTAL */

    function updateSummary() {

        const shipping =
            STORE_CONFIG.shipping[$("governorate").value] || 0;


        const subtotal = product.price * qty;


        $("summaryProduct").textContent =
            money(subtotal);


        $("summaryShipping").textContent =
            shipping
                ? money(shipping)
                : (lang() === "ar"
                    ? "يحدد بعد اختيار المحافظة"
                    : "Choose governorate");


        $("summaryTotal").textContent =
            money(subtotal + shipping);

    }



    /* GOVERNORATES */

    Object.entries(STORE_CONFIG.shipping).forEach(([name, price]) => {

        const option = document.createElement("option");

        option.value = name;

        option.textContent =
            `${name} — ${money(price)}`;

        $("governorate").appendChild(option);

    });



    $("governorate").addEventListener(
        "change",
        updateSummary
    );



    /* QUANTITY */

    $("qtyMinus").addEventListener("click", () => {

        qty = Math.max(1, qty - 1);

        $("quantity").value = qty;

        updateSummary();

    });


    $("qtyPlus").addEventListener("click", () => {

        qty = Math.min(10, qty + 1);

        $("quantity").value = qty;

        updateSummary();

    });



    /* WHATSAPP ORDER */

    $("orderForm").addEventListener("submit", event => {

        event.preventDefault();


        if (!selectedSize) {

            alert(
                lang() === "ar"
                    ? "من فضلك اختار المقاس أولاً"
                    : "Please select a size first."
            );

            return;

        }


        const name =
            $("customerName").value.trim();


        const phone =
            $("customerPhone").value.trim();


        const governorate =
            $("governorate").value;


        const address =
            $("address").value.trim();


        const notes =
            $("notes").value.trim();


        if (!governorate) {

            alert(
                lang() === "ar"
                    ? "من فضلك اختار المحافظة"
                    : "Please select a governorate."
            );

            return;

        }


        const shipping =
            STORE_CONFIG.shipping[governorate] || 0;


        const subtotal =
            product.price * qty;


        const total =
            subtotal + shipping;



        let message;


        if (lang() === "ar") {

            message = `

طلب جديد من متجر SSF

----------------------

المنتج: ${product.nameAr}

المقاس: ${selectedSize}

الكمية: ${qty}

سعر المنتج: ${money(subtotal)}

المحافظة: ${governorate}

الشحن: ${money(shipping)}

الإجمالي: ${money(total)}

----------------------

الاسم: ${name}

رقم الموبايل: ${phone}

العنوان: ${address}

ملاحظات: ${notes || "لا يوجد"}

            `;

        } else {

            message = `

NEW ORDER — SSF STORE

----------------------

Product: ${product.name}

Size: ${selectedSize}

Quantity: ${qty}

Product Total: ${money(subtotal)}

Governorate: ${governorate}

Delivery: ${money(shipping)}

TOTAL: ${money(total)}

----------------------

Name: ${name}

Phone: ${phone}

Address: ${address}

Notes: ${notes || "None"}

            `;

        }



        const whatsappURL =
            `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;


        window.open(whatsappURL, "_blank");

    });



    /* INITIALIZE */

    updateText();



    /* LANGUAGE SWITCH */

    $("languageToggle")?.addEventListener("click", () => {

        const next =
            lang() === "ar" ? "en" : "ar";


        localStorage.setItem("ssf-lang", next);


        document.documentElement.lang = next;

        document.documentElement.dir =
            next === "ar" ? "rtl" : "ltr";


        document.querySelectorAll("[data-ar][data-en]").forEach(el => {

            el.innerHTML = el.dataset[next];

        });


        $("languageToggle").textContent =
            next === "ar" ? "EN" : "عربي";


        updateText();

    });

});