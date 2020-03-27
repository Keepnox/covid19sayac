import axios from "axios";
import _ from "lodash";

const RE_CHART = /\s*series: \[{\s*name: \'(.*)\',\s+.*$\s+.*$\s+data:(.*),/gm;

function extractVariable(str, re) {
  const match = str.match(re);
  return match && match.length > 1 ? match[1] : null;
}

export async function fetchCountry(req) {
  const country = req.params.country.toLowerCase();
  const res = await axios.get(
    `https://www.worldometers.info/coronavirus/country/${country}`
  );

  const matches = res.data.match(RE_CHART);

  if (!matches) {
    return null;
  }

  const data = matches
    .map(match => match.trim())
    .map(content => {
      return {
        name: extractVariable(content, /name: '(.*)'/),
        data: extractVariable(content, /data:\s+(\[[0-9,]+\])/)
      };
    })
    .map(c => ({
      name: c.name,
      data: JSON.parse(c.data)
    }))
    .filter(c => c.data)
    .reduce((acc, c) => ({ ...acc, [_.camelCase(c.name)]: c.data.slice(0, 10) }), {});

  return data;
}
