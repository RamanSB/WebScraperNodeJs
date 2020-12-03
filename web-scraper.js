const axios = require('axios');

/**
  360.cn
  fc2.com
  livejasmin.com
  popads.net
  qq.com
  soundcloud.com
  uol.com.br
  cnzz.com
  diply.com
  jd.com
  live.com
  pixnet.net
  sina.com.cn
  sohu.com
  tianya.cn
  vk.com
*/



async function makeRequest(){
  let exampleURL = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';//"https://www.livejasmin.com";
  try {
    const httpResponse = await axios.get(exampleURL);
    console.log(httpResponse.data);
  } catch (err) {
      console.err(`We are within the catch block as an error occurred`);
      console.error(err);
  }
}


makeRequest();
//sendGetRequest();
