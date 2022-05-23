var client = require('cheerio-httpcli');
var officegen = require('officegen');
var xlsx = officegen('xlsx');
var fs = require('fs');
 
var url = "https://search.naver.com/search.naver?where=post&sm=tab_pge&query=%EC%84%B1%ED%98%95%EC%99%B8%EA%B3%BC&st=sim&date_option=0&date_from=&date_to=&dup_remove=1&post_blogurl=&post_blogurl_without=&srchby=all&nso=&ie=utf8&start=1";
var param = {};
 
client.fetch(url, param, function(err, $, res){
  if(err){console.log("error:", err); return;}
 
  var body = $.html();
 
  var re = /성형/g;
  var found = body.match(re);
  //console.log(body);
  //console.log(found);
  console.log(found.length);
 
});
 
 
client.fetch(url, param, function(err, $, res){
  if(err){console.log("error:", err); return;}
 
  var body = $.html();
  var list_dl = $(".sh_blog_passage");
  //console.log(list_dl);
  var list = [];
  for (var i = 0 ; i < list_dl.length ;i++){
    var value = $(list_dl[i]).html();
    console.log(value);
    list.push(value);
 
  }
  exportToExcel(list);
});
 
 
function exportToExcel(list){
  var sheet = xlsx.makeNewSheet();
  sheet.name = "test";
 
  for (var i = 0 ; i < list.length ;i++){
 
    var value = list[i];
    console.log(value);
    sheet.setCell('a' + i+1, value);
  }
 
  var strm = fs.createWriteStream('C:/Users/owner/Desktop/crawling/download/test.xlsx');
  xlsx.generate(strm);
 
}