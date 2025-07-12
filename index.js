import express from 'express';
import sharp from 'sharp';

const app = express();
const port = 8080;

app.get('/', async (req, res) => {
  try {
    const imageUrl = req.query.url;
    const imageHeight = parseInt(req.query.height);
    const imageWidth = parseInt(req.query.width);
    if (!imageUrl) return res.status(400).send("Missing image");
    if (!imageHeight && !imageWidth) return res.status(400).send("Missing image width and height");
    if (!imageHeight) return res.status(400).send("Missing image height");
    if (!imageWidth) return res.status(400).send("Missing image width");
    const imageFetch = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageFetch.arrayBuffer());
    const rawImage = await sharp(imageBuffer)
        .resize(imageWidth, imageHeight, {
            fit: 'fill'
        })
        .ensureAlpha()
        .raw()
        .toBuffer()
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(rawImage);
  } catch (err) {
    console.error(err);
    res.status(500).send('Fail');
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})