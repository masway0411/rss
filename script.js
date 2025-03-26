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
                const title = item.querySelector("title").textContent;
                const link = item.querySelector("link").textContent;

                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
                rssFeedElement.appendChild(listItem);
            });
        } catch (error) {
            rssFeedElement.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        }
    }

    fetchRSS();
});
