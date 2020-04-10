
  

  

# DEV SETUP - Ubuntu
Documentation about setting up the live server.

## ~ Setup Software ~
These are the software needed. Please install it in sequence.

### 1. [GIT](https://git-scm.com/) - Our version control software
Git is already installed on Ubuntu by default.

### 2. [Node.js](https://nodejs.org/) - Our main programming platform
We are using version 10.x.x at the time of this writing. 
 
Update Ubuntu: `sudo apt-get update`

Add source: `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`

And finally install node: `sudo apt-get install -y nodejs`

Note: `-y` means to answer "yes" to prompts

To confirm if node was installed do: `npm -v && node -v`

### 3. [MongoDB](https://docs.mongodb.com/v4.2/tutorial/install-mongodb-on-ubuntu/) - This is our database server

Follow the instructions at: [https://docs.mongodb.com/v4.2/tutorial/install-mongodb-on-ubuntu/](https://docs.mongodb.com/v4.2/tutorial/install-mongodb-on-ubuntu/)

Check if service is running

`sudo systemctl status mongod`

Finally, autostart mongo when system restarts

`sudo systemctl enable mongod`

## ~ Setup Projects ~
### Pulling the Source Codes

 1. Go to user dir: `cd ~` 
 2. Pull the source code:  `git clone https://github.com/kosinix/open-barcode-initiative.git`


### Install NPM packages

 1. Go to *open-barcode-initiative* directory by typing `cd ~/open-barcode-initiative`.
 2. In the Terminal type `npm install`. Note: This may take some time.
  
## ~ Setup Database ~

Allow External DB Access

Security Warning! You must add firewall rules when exposing a DB outside to only allow your own IP address.

`sudo nano /etc/mongod.conf`

Add the **Private IP** address of our EC2 instance to bindId

    net:
        port: 27017
        bindIp: 127.0.0.1,172.31.22.87

NOTE:

Service Can be found in `/etc/systemd/system/multi-user.target.wants/mongod.service`

### Security
Start mongod service with auth

`sudo nano /etc/mongod.conf`

	security:
		authorization: enabled

`sudo systemctl restart mongod`

### Add DB Users

Create admin user

    db.createUser(
        {
            user: "uAdmin",
            pwd: "{get password from credentials.json}",
            roles: [
                {
                    role: "userAdminAnyDatabase",
                    db: "admin"
                },
                "readWriteAnyDatabase"
            ]
        }
    )

Login as admin

    db.auth("uAdmin", "{get password from credentials.json}" )

Create regular user used by app

    db.createUser(
        {
            user: "uBarcode",
            pwd: "FcMBUNLUa9sM22g8Mk6DqqisyGrrXBEM",
            roles: [ 
                { 
                role: "readWrite", 
                db: "barcode" 
                }
            ]
        }
    )

## Run the App

Type:

`node .`

To stop hit `CTRL + C` in the SSH terminal

## Run the App in Production Mode

Add a systemd file:

`sudo nano /etc/systemd/system/barcode.service`

Put this content:

    # SystemD Service for LIVE
    # location: /etc/systemd/system/
    # file: /etc/systemd/system/barcode.service
    # update systemd: sudo systemctl daemon-reload
    # restart: sudo systemctl restart barcode
    # status: sudo systemctl status barcode
    # start-on-boot: sudo systemctl enable barcode

    [Unit]
    Description=Node.js Server for App

    [Service]
    ExecStart=/usr/bin/node /home/ubuntu/open-barcode-initiative/index.js
    # Required on some systems
    #WorkingDirectory=/opt/nodeserver
    # Restart service after 10 seconds if node service crashes
    Restart=always
    RestartSec=10
    # Output to syslog
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=nodejs-barcode
    #User=<alternate user>
    #Group=<alternate group>
    Environment=NODE_ENV=live PORT=8091

    [Install]
    WantedBy=multi-user.target


Update:

`sudo systemctl daemon-reload`

Status:

`sudo systemctl status barcode`

Start:

`sudo systemctl start barcode`

Start on boot:

`sudo systemctl enable barcode`


## Nginx - Install Nginx as Reverse Proxy for Node

Update packages

`sudo apt-get update`

Install server

`sudo apt-get install nginx -y`

Remove default site config

`sudo rm /etc/nginx/sites-enabled/default`

  
#### Virtual Hosts

Allows multiple domains in one Nginx server


* barcode.kosinix.com - A node process running on `http://localhost:8091`

Create site config in `/etc/nginx/sites-available/`
Name it `barcode.kosinix.com`

* `sudo nano /etc/nginx/sites-available/barcode.kosinix.com`


Then inside `barcode.kosinix.com`

    server {
        listen 80;
        listen [::]:80;

        server_name barcode.kosinix.com;

        root /home/ubuntu/open-barcode-initiative;

        index index.html;

        location / {
            proxy_pass http://localhost:8091;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 600s;
        }
    }

Then enable the site in Nginx by symlinking into sites-enabled dir:


`sudo ln -s /etc/nginx/sites-available/barcode.kosinix.com /etc/nginx/sites-enabled/`

Restart Nginx for changes to take effect

`sudo systemctl restart nginx`


## Certbot - Install https

Uses certbot from Lets Encrypt to install an SSL cert

    sudo apt-get update
    sudo apt-get install software-properties-common
    sudo add-apt-repository universe
    sudo add-apt-repository ppa:certbot/certbot
    sudo apt-get update
    sudo apt-get install certbot python-certbot-nginx
    sudo certbot --nginx

If you're feeling more conservative and would like to make the changes to your Nginx configuration by hand, you can use the certonly subcommand:

    sudo certbot --nginx certonly

Test renewal 

    sudo certbot renew --dry-run
    
    
    

### More info:
[https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-with-lamp-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-with-lamp-on-ubuntu-16-04)

[https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04)


## Good luck have fun!

* prep by Nico Amarilla, April 2020