const express = require('express');
const bodyParser = require('body-parser');
const libxmljs = require('libxmljs');

const app = express();
app.use(bodyParser.text({ type: 'application/xml' }));

// 🧨 XXE Vulnerability using libxmljs
app.post('/xml', (req, res) => {
  try {
    const xml = req.body;

    // Parse the XML with external entity support (XXE vulnerable)
    const xmlDoc = libxmljs.parseXml(xml, { noent: true }); // ⚠️ `noent: true` expands entities

    const root = xmlDoc.root();
    const responseText = root ? root.text() : 'No root element';

    res.send(`Parsed XML: ${responseText}`);
  } catch (err) {
    res.status(500).send('Error parsing XML');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
