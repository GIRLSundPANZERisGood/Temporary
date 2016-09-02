'use strict';

const qs = require ("querystring");
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var sys = require('sys');

var mainWindow = null;

const pdfURL = "http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
    },
  });

  const url = 'file://' + __dirname + '/pdfjs/web/viewer.html?file=' + pdfURL
  const param = qs.stringify({url: url})
  mainWindow.loadURL('file://' + __dirname + '/index.html?' + param);
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

