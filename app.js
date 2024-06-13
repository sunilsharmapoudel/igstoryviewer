const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;
const path = require("path");
const favicon = require("favicons");
const axios = require('axios');


const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static('public'));

app.get("/", async( req, res) => {
    res.render("index", {
      username :null,
      fullname :"",
      followerscount :"",
      followingcount :"",
      avatar : "",
      category: "",
      stories: "",
      bio:"",
  })
});

app.get("/privacy-policy", (req, res)=> {
  console.log("privacy")
  res.render("privacypolicy");
})

app.get("/contact-us", (req, res)=> {
  console.log("contact")

  res.render("contact");
})

app.post("/", async(req, res) => {
    const username = req.body.username;
    const storiesOptions = { 
      method: 'GET',
      url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/stories',
      params: {
        username_or_id_or_url: `${username}`
      },
      headers: {
        'x-rapidapi-key': `${process.env.api_key}`,
        'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
      }
    };

    const infoOptions = {
      method: 'GET',
      url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/info',
      params: {
        username_or_id_or_url: `${username}`
      },
      headers: {
        'x-rapidapi-key': `${process.env.api_key}`,
        'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
      }
    };
    
    try {
        const infoResponse = await axios.request(infoOptions);
        const infoData = infoResponse.data.data;
        const bio = infoData.biography;
        const userName = infoData.username;
        const fullName = infoData.full_name.toUpperCase();
        const followersCount = infoData.follower_count;
        const followingCount = infoData.following_count;
        const profilePic = encodeURIComponent(infoData.profile_pic_url_hd);
        const userCategory = infoData.category;
        const storiesResponse = await axios.request(storiesOptions);
        console.log(storiesResponse); 
        const storiesCount = storiesResponse.data.data.count;
        const stories = storiesResponse.data.data.items;

        res.render("index", {
          username :userName,
          fullname :fullName, 
          followerscount :followersCount,
          followingcount :followingCount,
          bio:bio,
          avatar : `https://phosphor.utils.elfsightcdn.com/?url=${profilePic}`,
          category: userCategory,
          stories: stories,
      })

    } catch (error) {
        console.error(error.response.data.detail);
    }
})


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})