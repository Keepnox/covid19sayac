import { Router } from "express";
import LRU from "lru-cache";
import { fetchCountries } from "./countries";
import { fetchCountry } from "./country";

const cache = new LRU({
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
    console.log("checking cache");
    if (!cache.get("countries")) {
      console.log("not found in cache");
      const data = await fetchCountries(req, res);
      cache.set("countries", {data: data, updatedTime: new Date()});
    }

    return cache.get("countries");
  })
);
covid19Router.get("/:country", createRoute(fetchCountry));
