const {nanoid} = require('nanoid');
const URL = require('../models/url');

async function generateNewShortURL(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: "URL is required"});
    }
    const shortId = nanoid(8);

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });

    return res.json({id:shortId});
}

async function redirectToShorternUrl(req,res){
   const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate({shortId},{
       $push: {
        visitHistory : {
            timestamps : Date.now()
        }
       },
   });
   if(!entry) return res.status(404).json({error: "URL not found"});
   res.redirect(entry.redirectUrl);
}

async function getUrlStats(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId});
    if(!entry) return res.status(404).json({error: "URL not found"});
    res.json({
        totalClicks: entry.visitHistory.length,
        lastVisited: entry.visitHistory[entry.visitHistory.length - 1].timestamps
    });
}
module.exports = {generateNewShortURL, redirectToShorternUrl, getUrlStats};