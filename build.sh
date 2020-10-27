#!/bin/bash

npx standard --fix js/main.js
npx browserify js/main.js > dist/bundle.js
