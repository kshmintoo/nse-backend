const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("NSE option chain API running");
});

app.get("/api/option-chain", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          "Referer": "https://www.nseindia.com/"
        },
        timeout: 5000
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: "Fetch failed",
      message: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
