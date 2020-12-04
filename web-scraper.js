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

Please modify the argument passed in on line 60 with the 3 URLS below or any URL or your
liking from the IMDB title search.
*/

let hyperlinkClass = "sc-link-dark.sc-type-light.playableTile__mainHeading.audibleTile__mainHeading.playableTile__heading.playableTile__audibleHeading.audibleTile__audibleHeading.sc-truncate.sc-font-light"
let harryPotterExample = 'https://www.imdb.com/title/tt0241527/?ref_=fn_al_tt_1';
let batmanUrl = "https://www.imdb.com/title/tt1877830/?ref_=nv_sr_srsg_0";
let queenGambitUrl = 'https://www.imdb.com/title/tt10048342/?ref_=nv_sr_srsg_0';

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

    let castTableElem = $('#titleCast > table > tbody > tr > td.character');
    let castTableElemIdx = Object.keys(castTableElem).filter(x=>!isNaN(x));
    console.log(castTableElemIdx);

    for(let i=0; i<castTableElemIdx.length; i++){
      let characterName;
      if($(castTableElem[i]).find('a').attr('href')=='#'){
        characterName = $($(castTableElem[i]).contents()['0']).text().trim()
      }else if($(castTableElem[i]).find('a').attr('href') != null){
        characterName = $(castTableElem[i]).children().first().text();
      }else{
        console.log('no hyperlinks exist');
        characterName = $(castTableElem[i]).contents().text().trim();
      }
      characters.push(characterName);
    }

     characters = characters.filter(x => x.trim().length > 0);
     console.log(characters.join('\n'));
     fs.appendFileSync("./scraped-data.txt", characters.join('\n'));
  } catch (err) {
      console.error(`We are within the catch block as an error occurred` + err);
  }
}


makeRequest(queenGambitUrl);
