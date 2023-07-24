const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 9090;

//Set temp engine
app.set("view engine", "ejs");

//passing JSON and urleconded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Serve static assets
app.use(express.static("public"));

//Render homepage
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//Convert route
app.post("/api/convert", async (req, res) => {
  //get the url
  const url = req.body.url;
  if (!url) {
    return res.redirect("/?error=invalid URL");
  }
  try {
    //Lunch browser instance
    const browser = await puppeteer.launch();
    //open a new page
    const page = await browser.newPage();
    //Go to the URL
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    //Generate the pdf
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    //close the browser
    await browser.close();
    //set the response
    res.contentType("application/pdf");
    //send the response
    res.send(pdf);
  } catch (error) {
    return res.redirect("/?error=Error generating");
  }
});

//start the server
app.listen(PORT, console.log("Server is running"));
