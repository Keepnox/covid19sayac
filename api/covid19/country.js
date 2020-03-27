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
  const res = await axios.get(
    `http://covid19.soficoop.com/country/${country}`
  );
  let data = res.data.snapshots

  let array = _.uniqBy(data, 'cases')
  array = _.map(array, function (dd) {
    return {
      totalCase: dd.cases,
      death: dd.deaths,
      todayDeath: dd.todayDeaths,
      today: dd.todayCases,
      recovered: dd.recovered,
      todayCase: dd.todayCases,
      date: format(new Date(dd.timestamp), "dd.MM.yyyy")
    }
  })

  return array;
}
