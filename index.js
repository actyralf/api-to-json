import fetch from "node-fetch";
import fs from "fs";

async function readPage(page) {
  const response = await fetch(
    "https://www.balldontlie.io/api/v1/players/?per_page=100&page=" + page
  );
  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
}

async function getTotalPages() {
  const response = await fetch(
    "https://www.balldontlie.io/api/v1/players/?per_page=100"
  );
  if (response.ok) {
    const data = await response.json();
    return data.meta.total_pages;
  }
}

const wait = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));

const allPlayers = [];

const totalPages = await getTotalPages();
console.log({ totalPages });
console.log("before wait");
await wait(10);
console.log("after wait");

for (let page = 1; page <= totalPages; page++) {
  const pageData = await readPage(page);
  allPlayers.push(...pageData);
}
fs.writeFileSync("players.json", JSON.stringify(allPlayers));
console.log("done");
