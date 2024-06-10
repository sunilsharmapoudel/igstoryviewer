const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;
const path = require("path");
const favicon = require("favicons");
const axios = require('axios');
const cors_proxy = require('cors-anywhere');


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
  })
});

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
        const userName = infoData.username;
        const fullName = infoData.full_name;
        const followersCount = infoData.follower_count;
        const followingCount = infoData.following_count;
        const profilePic = encodeURIComponent(infoData.profile_pic_url_hd);
        console.log(profilePic);
        const userCategory = infoData.category;
        const storiesResponse = await axios.request(storiesOptions);
        // const profilPic = encodeURIComponent(userInfo.profile_pic_url);
        res.render("index", {
          username :userName,
          fullname :fullName,
          followerscount :followersCount,
          followingcount :followingCount,
          avatar : `https://phosphor.utils.elfsightcdn.com/?url=${profilePic}`,
          category: userCategory,
      })

    } catch (error) {
        console.error(error);
    }
})


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})