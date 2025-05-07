#!/bin/bash

cd ui/admin 
node ../../node/apps/api/app.mjs & 
node ../store/app.mjs &
npm run dev &&fg