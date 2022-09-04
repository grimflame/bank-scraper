const axios = require("axios");
const cheerio = require("cheerio");
const cheerioselect = require("cheerio-select");
const fs = require("fs");

const floridaUrl = "https://www.creditunionsonline.com/credit-unions-in-altamonte-springs-fl.html";

async function unionInfo(city)
{
    try
    {
        const { data } = await axios.get(`https://www.creditunionsonline.com/credit-unions-in-${city}-fl.html`);
        
        const $ = cheerio.load(data);
    }
    catch (Exception)
    {
        console.error(Exception);
    }
}
async function cityUnions(city, state)
{
    try 
    {
        const { data } = await axios.get(`https://www.creditunionsonline.com/credit-unions-in-${city}-${state}.html`)
        
        const $ = cheerio.load(data);

        //get all the cities first
        const names = $(".pSec");
        const addresses = $(".hoursRow").children().contents().filter(function() 
        {
            return this.nodeType === 3;
        });
        const unions = [];

        names.each((idx, el) => 
        {
            let union = $(el).text();
            unions.push(union);
            addresses.each((x, y) => 
            {
                if ($(y).parent().parent().parent().parent().parent().first().text().substring(0, union.toString().length) == union.toString())
                {
                    let address = $(y).text();
                    unions.push(address);
                }
            })
        })

        console.dir(unions);
    }
    catch (Exception)
    {
        console.error(Exception);
    }
}

cityUnions("orlando", "fl");