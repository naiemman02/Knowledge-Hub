
// Search Function
function searchContent() {

    let input = document
        .getElementById("searchInput")
        .value.toLowerCase().trim();

    let cards = document.querySelectorAll(".category-card");

    let found = false;

    cards.forEach(card => {

        let text = (
            card.innerText + " " +
            card.dataset.search
        ).toLowerCase();

        if (text.includes(input)) {
            card.style.display = "block";
            found = true;
        } else {
            card.style.display = "none";
        }

    });

    let message = document.getElementById("searchMessage");

    if (input === "") {
        cards.forEach(card => card.style.display = "block");
        message.innerText = "";
        return;
    }

    message.innerText = found
        ? "আপনার অনুসন্ধানের ফলাফল দেখানো হয়েছে।"
        : "দুঃখিত! কোনো বিভাগ পাওয়া যায়নি।";

}

// Daily Learning Data
const learningData = [

    {
        title: "কম্পিউটার কী?",
        text: "কম্পিউটার একটি ইলেকট্রনিক যন্ত্র, যা তথ্য গ্রহণ করে, প্রক্রিয়াকরণ করে এবং ফলাফল প্রদান করে।"
    },

    {
        title: "ইন্টারনেট কী?",
        text: "ইন্টারনেট হলো বিশ্বব্যাপী সংযুক্ত অসংখ্য কম্পিউটার নেটওয়ার্কের একটি বিশাল ব্যবস্থা।"
    },

    {
        title: "সময় ব্যবস্থাপনা",
        text: "সময়কে সঠিকভাবে কাজে লাগানোর মাধ্যমে দৈনন্দিন কাজ আরও সুন্দরভাবে সম্পন্ন করা যায়।"
    },

    {
        title: "ইংরেজি Vocabulary",
        text: "Knowledge শব্দের বাংলা অর্থ জ্ঞান। প্রতিদিন নতুন শব্দ শেখা ভাষার দক্ষতা বাড়াতে সাহায্য করে।"
    },

    {
        title: "বই পড়ার গুরুত্ব",
        text: "বই পড়ার মাধ্যমে মানুষের চিন্তাশক্তি, কল্পনাশক্তি এবং জ্ঞান বৃদ্ধি পায়।"
    }

];

// Show Daily Learning
function newLearning() {

    let random = Math.floor(
        Math.random() * learningData.length
    );

    document.getElementById("dailyTitle").innerText =
        learningData[random].title;

    document.getElementById("dailyText").innerText =
        learningData[random].text;

}

// Load first learning
newLearning();
