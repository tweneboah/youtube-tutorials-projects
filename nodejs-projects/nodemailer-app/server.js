const express = require("express");
const sendEmail = require("./utils/sendEmail");

const app = express();
const PORT = process.env.PORT || 9000;

//set engine
app.set("view engine", "ejs");
//serve static assets
app.use(express.static("public"));
//pass the data from form
app.use(express.urlencoded({ extended: false }));

//route to render email form
app.get("/", (req, res) => {
  res.render("email-form");
});

//route to send the email
app.post("/send-email", async (req, res) => {
  try {
    const { email, message } = req.body;
    console.log(email, message);
    await sendEmail(email, message);
    res.render("email-form", {
      status: "success",
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("email-form", {
      status: "error",
      message: "Error sending email.",
    });
  }
});

//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
