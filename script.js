document.addEventListener("DOMContentLoaded", function () {
    const RSS_URL = "https://trends.google.com/trending/rss?geo=US";
    const rssFeedElement = document.getElementById("rss-feed");

    async function fetchRSS() {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`);
            if (!response.ok) throw new Error("Gagal mengambil RSS Feed");

            const data = await response.json();
            const parser = new DOMParser();
            const xml = parser.parseFromString(data.contents, "application/xml");
            const items = xml.querySelectorAll("item");

            rssFeedElement.innerHTML = "";
            items.forEach((item) => {
                const titleElement = item.querySelector("ht\\:news_item_title, news_item_title");
                const imageElement = item.querySelector("ht\\:news_item_picture, news_item_picture");

                const title = titleElement ? titleElement.textContent : "No Title";
                const imageUrl = imageElement ? imageElement.textContent : "";

                const listItem = document.createElement("li");
                list
