import axios from "axios";
import _ from "lodash";

export async function fetchNews() {
  const res = await axios.get(`https://api.collectapi.com/corona/coronaNews`, {
    headers: {
      Authorization: "apikey 3znWg3cEN5rL2yjD275NtP:7gOqMLMOCyrdbAszyX6RlP",
      "Content-Type": "application/json"
    }
  });

  let selam = res.data;
  return selam;
}
