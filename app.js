const express = require('express');
const { exec } = require('child_process');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { DOMParser } = require('xmldom');
const xpath = require('xpath');

const app = express();
app.use(bodyParser.text({ type: 'application/xml' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🧨 XXE Vulnerability
app.post('/xml', (req, res) => {
  try {
    const xml = req.body;
    const doc = new DOMParser({
      errorHandler: { warning: () => {}, error: () => {}, fatalError: () => {} }
    }).parseFromString(xml);
