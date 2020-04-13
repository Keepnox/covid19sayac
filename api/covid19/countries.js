import axios from "axios";
import cheerio from "cheerio";

function parseNumber(str) {
  return Number(str.replace(/[\+,]/g, ""));
}

export async function fetchCountries() {
  const { data: covidHtmlContent } = await axios.get(
    "https://www.worldometers.info/coronavirus/"
  );

  const $ = cheerio.load(covidHtmlContent);
  const items = $("table#main_table_countries_today > tbody > tr")
    .map((index, element) => {
      const $el = $(element);
      const country = $el.find("td:nth-child(1)").text().trim();
      const confirmed = parseNumber($el.find("td:nth-child(2)").text());
      const confirmedSinceYesterday = parseNumber(
        $el.find("td:nth-child(3)").text()
      );
      const death = parseNumber($el.find("td:nth-child(4)").text());
      const deathSinceYesterday = parseNumber(
        $el.find("td:nth-child(5)").text()
      );
      const recovered = parseNumber($el.find("td:nth-child(6)").text());
      const activeCase = parseNumber($el.find("td:nth-child(7)").text());
      const criticalCase = parseNumber($el.find("td:nth-child(8)").text());
      const casesPer1M = parseNumber($el.find("td:nth-child(9)").text());

      const deathRate = (100 * death) / confirmed;
      const activeRate = (100 * activeCase) / confirmed;
      const recoveredRate = (100 * recovered) / confirmed;

      return {
        country,
        confirmed,
        confirmedSinceYesterday,
        death,
        deathSinceYesterday,
        recovered,
        activeCase,
        criticalCase,
        casesPer1M,
        deathRate,
        activeRate,
        recoveredRate
      };
    })
    
    .toArray();

  return items;
}
