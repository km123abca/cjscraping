const axios = require("axios");
const cheerio = require("cheerio");

const pageUrl =
  "https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States";
async function getUsStates() {
  const { data } = await axios.get(pageUrl);
  // console.log(data);
  const $ = cheerio.load(data);
  const table = $(
    'caption:contains("States of the United States of America")'
  ).parent();
  // console.log(table);
  const states = [];
  table
    .find("tbody tr")
    .slice(2)
    .each((i, element) => {
      const row = $(element);
      // console.log(row.text());
      const state = {};
      // state.name=$(row.find('th a')[0]).text().trim();
      state.name = row.find("th a").first().text().trim();
      const labels = [
        "code",
        "capital",
        "largest",
        "ratification",
        "population",
        "total_area_miles",
        "total_area_km",
        "land_area_miles",
        "land_area_km",
        "water_area_miles",
        "water_area_km",
        "number_of_reps",
      ];
      const colLen = row.find("td").length;
      // console.log(colLen);
      // const columns = row.find("td");
      // console.log(columns.length);
      // console.log(state);
      let offset = 0;
      row.find("td").each((i, element) => {
        // if (i == 2 && colLen == 12)  //stop exec
        const $col = $(element);

        let value = $col.text().trim();
        let numValue = Number(value.replace(/,/g, ""));
        if (!isNaN(numValue)) {
          value = numValue;
        }
        if (i == 1 && $col.attr("colspan") == "2") {
          const label = labels[i];
          state[label] = value;
          offset = 1;
        }
        const label = labels[i + offset];
        state[label] = value;
      });
      states.push(state);
    });
  // console.log(states);
  return states;
}

module.exports = getUsStates;
