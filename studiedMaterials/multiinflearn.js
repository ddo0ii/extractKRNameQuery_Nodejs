const axios = require("axios");

const cheerio = require("cheerio");

const getHTML = async(keyword) => {
    try {
        return await axios.get("https://www.inflearn.com/courses?order=seq&page=" + keyword)
    } catch {
        console.log(err);
    }
}

const parsing = async (keyword) => {
    
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $courseList = $(".course_card_item");

    let courses = [];
    $courseList.each((idx,node) => {
        // const title = $(node).find(".course_title").text();
        courses.push({
            title: $(node).find(".course_title:eq(0)").text(),
            instructor: $(node).find(".instructor").text(),
            price: $(node).find(".price").text(),
            rating: $(node).find(".star_solid").css("width"),
            img: $(node).find(".card-image > figure > img").attr("src"),

        })
    });
    console.log(keyword + "페이지");
    console.log(courses);
}
for(var i=1; i<=10; i++){
    parsing(i);
}