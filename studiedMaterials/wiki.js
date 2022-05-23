const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');

const url = "https://www.nature.com/subjects/health-sciences/ncomms?searchType=journalSearch&sort=PubDate&page=2";

request(url, function (error, response, body) {
  if (!error) {
    const $ = cheerio.load(body)

    const $courseList = $(".cleared");


    let courses = [];

    $courseList.each((idx, node) => {
        courses.push({
            headline: $(node).find(".text-gray:eq(0)").text().replace(/\s+/, "").replace(/\s+$/g, "").replace(/\n/g, "").replace(/\r/g, ""),
        })
    });

    console.log(courses);
  }
  else {
    console.log("We’ve encountered an error: " + error);
  }
});



// The function below is kind-of pseudo code so don't try to copy/paste it :) 
const dispatchRequest = (page) => {
    const response = axios({url: `https://www.nature.com/subjects/health-sciences/ncomms?searchType=journalSearch&sort=PubDate&page=${page}`});
    // Ex: You can parse the response here with Cheerio and check if pagination is not disable
    request(url, function (error, response, body) {
        if (!error) {
          const $ = cheerio.load(body)
      
          const $courseList = $(".cleared");
      
      
          let courses = [];
      
          $courseList.each((idx, node) => {
              courses.push({
                  headline: $(node).find(".text-gray:eq(0)").text().replace(/\s+/, "").replace(/\s+$/g, "").replace(/\n/g, "").replace(/\r/g, ""),
              })
          });
      
          console.log(courses);
        }
        else {
          console.log("We’ve encountered an error: " + error);
        }
      });

}