import axios from "axios";
import _ from "lodash";
import { format } from "date-fns";

const RE_CHART = /\s*series: \[{\s*name: \'(.*)\',\s+.*$\s+.*$\s+data:(.*),/gm;

function extractVariable(str, re) {
  const match = str.match(re);
  return match && match.length > 1 ? match[1] : null;
}

export async function fetchCountry(req) {
  const country = req.params.country.toLowerCase();
  const res = await axios.get(`http://covid19.soficoop.com/country/${country}`);
  const data = _.chain(res.data.snapshots)
    .map(data => {
      const timestamp = new Date(data.timestamp);
      const date = format(timestamp, "dd.MM.yyyy");

      return { ...data, timestamp, date };
    })
    .groupBy(data => data.date)
    .map(groupItems => _.maxBy(groupItems, item => item.timestamp))
    .map(item => {
      return {
        totalCase: item.cases,
        death: item.deaths,
        todayDeath: item.todayDeaths,
        today: item.todayCases,
        recovered: item.recovered,
        todayCase: item.todayCases,
        date: format(new Date(item.timestamp), "dd.MM.yyyy")
      };
    })
    .value();

  return data;
}
