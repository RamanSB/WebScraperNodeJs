const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

/**
Web scraping is used to extract data from a website via its' URL - the data
collected requires study of the HTML rendered by the site, particularly the
CSS Selector path - as this is what is passed to cheerio when querying the HTML
to identify elements of interest.

This js script is responsible for scraping an IMDB title URL and extracting the character names
played by the cast members and storing this information in a file.
*/

let hyperlinkClass = "sc-link-dark.sc-type-light.playableTile__mainHeading.audibleTile__mainHeading.playableTile__heading.playableTile__audibleHeading.audibleTile__audibleHeading.sc-truncate.sc-font-light"
let harryPotterExample = 'https://www.imdb.com/title/tt0241527/?ref_=fn_al_tt_1';
let batmanUrl = "https://www.imdb.com/title/tt1877830/?ref_=nv_sr_srsg_0";

async function makeRequest(imdbMovieUrl){
  let characters = [];

  try {
    const httpResponse = await axios.get(imdbMovieUrl);
    let $ = cheerio.load(httpResponse.data);
    let titleElem = $('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper');
    let movieTitle = titleElem
      .find('h1')
      .text();
      fs.writeFileSync("./scraped-data.txt", movieTitle+"\n"+"---Cast---\n");
    let urlElems = $('#titleCast > table > tbody > tr > td.character');//cheerio takes the CSS selector patha as an argument
    let elemIndex = Object.keys(urlElems).filter(x => !isNaN(x));

    for(let i=0; i<elemIndex.length; i++){
      let characterName = $(urlElems[i]).find('a').text();
      characters.push(characterName);
    }

    console.log(characters.join('\n'));
    fs.appendFileSync("./scraped-data.txt", characters.join('\n'));
  } catch (err) {
      console.error(`We are within the catch block as an error occurred`);
  }
}


makeRequest(batmanUrl);
