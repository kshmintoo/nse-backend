const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const url =
  "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY";

const headers = {
  "User-Agent": "Mozilla/5.0",
  "Accept": "application/json",
  "Referer": "https://www.nseindia.com/"
};

let data = null;

async function loadData() {
  try {
    const res = await axios.get(url, { headers });
    data = res.data;
    console.log("NIFTY data updated");
  } catch (e) {
    console.log("NSE blocked, retrying...");
  }
}

setInterval(loadData, 30000);
loadData();

app.get("/", (req, res) => {
  res.send("NSE Backend Running");
});

app.get("/api/option-chain", (req, res) => {
  if (!data) return res.json({ error: "Loading" });
  res.json(data);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log("Server running on", PORT)
);
