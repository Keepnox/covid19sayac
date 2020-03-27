import { Router } from "express";
import LRU from "lru-cache";
import { fetchCountries } from "./countries";
import { fetchCountry } from "./country";
import { fetchNews } from "./news";

const worldCache = new LRU({
  maxAge: 1000 * 60 * 5
});

const newsCache = new LRU({
  maxAge: 1000 * 60 * 60
});

const turkeyCache = new LRU({
  maxAge: 1000
});

const covid19Router = Router();
export default covid19Router;

const createRoute = fn => async (req, res) => {
  try {
    const data = await fn(req, res);
    res.json({ error: null, data });
  } catch (err) {
    res.json({ error: err.message, data: null });
  }
};

covid19Router.get(
  "/",
  createRoute(async (req, res) => {
    console.log("checking countries cache");
    if (!worldCache.get("countries")) {
      console.log("fetching countries");
      const data = await fetchCountries(req, res);
      worldCache.set("countries", { data: data, updatedTime: new Date() });
    }

    console.log("fetched countries");
    return worldCache.get("countries");
  })
);

covid19Router.get(
  "/:country",
  createRoute(async (req, res) => {
    console.log("checking turkey cache");
    if (!turkeyCache.get("turkey")) {
      console.log("fetching turkey");
      const data = await fetchCountry(req, res);
      turkeyCache.set("turkey", { data: data });
    }
    console.log("fetched turkey");
    return turkeyCache.get("turkey");
  })
);

covid19Router.get(
  "/news/tr",
  createRoute(async (req, res) => {
    console.log("checking news cache");
    if (!newsCache.get("news")) {
      console.log("fetching news");
      const data = await fetchNews(req, res);
      newsCache.set("news", { data: data });
    }

    console.log("fetched news");

    return newsCache.get("news");
  })
);
// covid19Router.get("/news/tr", createRoute(fetchNews));
