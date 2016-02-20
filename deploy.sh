# npm install
# gulp main

cd UI
npm install
gulp deploy

cd ..

rm /Web/* -fr
cp UI/* ../Web/ -r

cd server
nohup node app/index.js
exit