const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');

const shortUrlGenerator = require("../middlewares/urlCode.middlewares");
const UrlAccessor = require('../models/url.model');


router.get('/:urlCode', async (req, res) => {
    const urlCode = req.params.urlCode;
    return UrlAccessor.getUrlByCode(urlCode)
        .then((response) => {
            if (response) {
                res.redirect(301, response.originalUrl)
            } else {
                res.status(404).send("Error 404: Specified url ending does not exist")
            }
        },
            (error) => res.status(404).send(`Error finding url. ${error}`))
});

router.get('/:urlCode/edit', (req, res) => {
    res.redirect(301,"https://mern-url-app.herokuapp.com/edit?urlCode=" + req.params.urlCode)
});

router.patch('/:urlCode', async (req, res) => {
    let urlItem = await UrlAccessor.getUrlByCode(req.params.urlCode);
    if (urlItem) {
        const modifiedAt = new Date();
        return UrlAccessor.updateUrlByCode(req.params.urlCode, {
            originalUrl: req.body.originalUrl,
            modifiedAt: modifiedAt
        }).then(() => res.status(200).send(urlItem),
            () => res.status(404).send('Error updating url.'))
    }
    return res.status(404).send("Could not update url code.")
});

router.post('/:urlCode/edit', async (req, res) => {
    let urlItem = await UrlAccessor.getUrlByCode(req.params.urlCode);
    if (urlItem) {
        const modifiedAt = new Date();
        return UrlAccessor.updateUrlByCode(req.params.urlCode, {
            originalUrl: req.body.originalUrl,
            modifiedAt: modifiedAt
        }).then(() => res.status(200).send(urlItem),
            () => res.status(404).send('Error updating url.'))
    }
    return res.status(404).send("Could not update url code.")
});

router.delete('/:urlCode', (req, res) => {
    UrlAccessor.deleteUrlByCode(req.params.urlCode);
    return res.status(200).send("Success!");
});

router.post('/', async (req, res) => {
    const {originalUrl, baseUrl, isBranded} = req.body;

    let urlCode;
    if (!validUrl.isUri(baseUrl)) {
        return res.status(404).send("Invalid base Url.")
    }

    if (isBranded) {
        urlCode = req.body.urlCode;
        let exists = await UrlAccessor.getUrlByCode(urlCode);
        if(exists) {
            return res.status(400).send("Branded term cannot be used.")
        }
    } else {
        urlCode = shortUrlGenerator.generate();
    }

    const completeShortenedUrl = baseUrl + "/" + urlCode;
    const currentTime = new Date();

    const urlItem = {
        originalUrl: originalUrl,
        urlCode: urlCode,
        baseUrl: baseUrl,
        shortUrl: completeShortenedUrl,
        createdAt: currentTime,
        modifiedAt: currentTime,
        isBranded: isBranded
    };

    return UrlAccessor.insertUrl(urlItem)
        .then((response) => res.status(200).send(response),
            error => res.status(`error creating item ${error}`))
});


module.exports = router;