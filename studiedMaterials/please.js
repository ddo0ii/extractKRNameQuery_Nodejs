'use strict';

class Scraper {
	constructor(){
		this.pages = [
			'https://www.nature.com/subjects/health-sciences/ncomms?searchType=journalSearch&sort=PubDate&page=1',
			'https://www.nature.com/subjects/health-sciences/ncomms?searchType=journalSearch&sort=PubDate&page=2',
			'https://www.nature.com/subjects/health-sciences/ncomms?searchType=journalSearch&sort=PubDate&page=3'
		];
	}	

	scrapeSites(){
		return Promise.all(pages.map(this.scrapeUrl.bind(this)));	
	}

	scrapeUrl(url){
		return request({
			url: url
		})
		.then(body => {
			const data = {};

			// use cheerio to parse html here
			data.headline = $('text-gray').text();
			
			return data;
		});
	}
}


Scraper.scrapeSites()
	.then(console.log);