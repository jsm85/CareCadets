cd UI
npm install
gulp deploy

cd ..

rm /Web/* -fr
cp UI/* ../Web/ -r

cd server
npm install
nohup node app/index.js
exit