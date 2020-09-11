# gogrello

> A task management app for the Go Green development team. Contact <williamw@plumbersstock.com> for issues or make a pull request.

## Vue/Nuxt, Node, Express, and MongoDB

### Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

### Deploy Setup

``` bash
# install node
$ sudo apt install nodejs
OR
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ node -v  # 12.16.3

# install node
$ sudo apt install npm
$ npm -v # 6.14.4

# Nginx Install
$ apt-get install nginx

# pm2 Install
$ npm install pm2 -g

# cd into gogrello and install dependencies
$ npm i

# build for production and launch server
$ npm run build
$ pm2 start npm -- start
```
## Nginx Config
```bash
#/etc/nginx/sites-available/default
server {
listen 80;
        server_name gogrello;
        location / {
                proxy_pass http://127.0.0.1:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```
```bash
$ service nginx stop
$ service nginx start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Todo
* Multiple boards
* Vuetify styling theme 
* integrate JS date objects in all data, also fix sort by date
* find out why browse table gets messed up on expand
* separate button templates from forms/modals to be more dynamic
* hash passwords
* implement vue-notification package
