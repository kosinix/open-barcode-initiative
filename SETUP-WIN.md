# Open Barcode Initiative

A Wikipedia for barcodes

## ~ Setup Software ~
These are the software needed for local development on a Windows PC. Please install it in sequence on your local machine.

### 1. [Visual Studio Code](https://code.visualstudio.com/) - Our code editor
### 2. [GIT](https://git-scm.com/) - Our version control software
### 3. [Node.js](https://nodejs.org/) - Our main programming platform
We are using version 10.x.x at the time of this writing. 

Download the [MSI installer](https://nodejs.org/en/download/) and just follow the wizard. 

To check just type in the command line `node -v` and `npm -v`. Both commands will return the version number.
### 4. Nodemon - Automatically restarts the node application when file changes in the directory. 
To install type in the command line: `npm install nodemon -g`.
### 5. [MongoDB](https://docs.mongodb.com/v4.0/tutorial/install-mongodb-on-windows/) - This is our database server

At the time of this writing we are using version 4.x - 64 bit MSI installer. Just follow the wizard. 

Note: Uncheck MongoDB Compass if you dont want to wait for the installer to download it before finishing the install.

### 6. [Robomongo](https://robomongo.org/download) - Database viewer for MongoDB

  
## ~ Setup Projects ~
Choose where to place your projects. Create a folder named `nodejs` in the location of your choice. Examples: `C:/dev/nodejs` or `D:/nodejs`

### Pulling the Source Codes

 1. Pull the source code. Open command line and go to the `nodejs` folder. Type: `git clone https://github.com/kosinix/open-barcode-initiative.git`. 


### Setup Workspace

#### No Workspace Yet:
 1. Open Visual Studio Code.
 2. Go to File > Add Folder to Workspace...
 3. Select the `open-barcode-initiative`.
 4. Go to File > Save Workspace as
 5. Name it `open-barcode-initiative` and save.

#### Existing Workspace
 1. Open Visual Studio Code.
 2. Go to File > Add Folder to Workspace...
 3. Select the `open-barcode-initiative`.

### Install NPM packages

 1. In Visual Studio Code, open the Terminal by hitting `CTRL+backtick`
 2. Or go to Terminal > New Terminal
 3. In the Terminal type `npm install`. This may take some time.
  
## ~ Setup Database ~
Once MongoDB is installed, create the directory where the database will be saved. The default path is `c:\data\db`. Go ahead and create this path if it doesn't exist.

### Start Mongo Without Authentication
Open the command prompt (preferably in administrator mode) and run:
`"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"`

To stop, press `CTRL+C`.

### Connect to Mongo and Create a Root User
A root user has the most powerful capabilities, useful when administering the database without permission denied errors. However, for security reasons, web apps (dash and website) should only use a regular user account and not the root user when connecting to the database.

To create a root user:

Open the command prompt (preferably in administrator mode) and run:
`"C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe" --port 27017`

In the mongo console, switch to the `admin` database:
`use admin`

Copy and paste the following code:

	db.createUser(
		{
			user: "uRoot",
			pwd: "{get password from credentials.json}",
			roles: [
				"root"
			]
		}
	)


  

### Create Admin User
An admin user is used to administer databases and is less powerful than the `root` user. 

Switch to admin database:
`use admin`

Create admin user:

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
	
### Create Regular Users
These are the regular users used by web apps to connect to the database. They only have the least amount of capabilities to work properly.

Switch to dash database:
`use barcode`

Create user:

	db.createUser(
		{
			user: "uBarcode",
			pwd: "{get password from credentials.json}",
			roles: [ 
		      { 
		        role: "readWrite", 
		        db: "barcode" 
		      }
		    ]
		}
	)


### MongoDB as Service
You can set up the MongoDB server as a Windows Service that starts automatically at boot time.

Stop a MongoDB server if it was run in the command prompt by hitting `CTRL+C`.

From the Command Interpreter, create the following directories:

	cd C:\

If these directories don't exist yet, create:

	md "\data\db" "\data\log"
	
Create a MongoDB configuration file:

`C:\Program Files\MongoDB\Server\4.0\mongod.cfg`

These are the contents of the [configuration file](https://docs.mongodb.com/v4.0/reference/configuration-options/). Set the storage.dbPath and systemLog.path. Include security configuration options as well:

	systemLog:
	  destination: "file"
	  path: "c:\\data\\log\\mongod.log"
	storage:
	  dbPath: "c:\\data\\db"
	security:
	  authorization: "enabled"

Create Windows service by running this in the `Command Prompt` with administrative privileges:

	sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\4.0\mongod.cfg\"" DisplayName= "MongoDB" start= auto
	
Start the service:
`net start MongoDB`

Stop the service:
`net stop MongoDB`

Delete the service:
`sc.exe delete MongoDB`

### Browse the Database Using Robo 3T
Create a connection. Put the following settings:

 1. Switch to **Connection** tab
 2. Type: `Direct Connection`
 3. Name: `local root`
 4. Address: `localhost`
 5. Switch to **Authentication** tab
 6. Check *Perform Authentication*
 7. Database: `admin`
 8. Username: `uRoot`
 9. Password: *copy the password from the Database User section above*
 10. Click the *Test* button. Should be all green if successful.


### Bonus Commands

##### Update a User:

	db.updateUser("uAdmin",
	  {
	    roles: [ 
	        "userAdminAnyDatabase",
	        "readWriteAnyDatabase" 
	    ]
	  }
	)

##### Update User Password:

	db.updateUser("uAdmin",
	  {
	    pwd: "F28wJsVTHFFAxttxR9TkCY2a75d3t9ds",
	  }
	)

##### Delete a User:
`db.dropUser("uAdmin")`


##### Authenticate

	use admin
	db.auth("uAdmin", "F28wJsVTHFFAxttxR9TkCY2a75d3t9ds" )


##### Restore Backup
	mongorestore --host 127.0.0.1:27017 --username uAdmin --password F28wJsVTHFFAxttxR9TkCY2a75d3t9ds --authenticationDatabase admin --db barcode D:/backups/main-api
	
	mongorestore --host 127.0.0.1:27017 --username uAdmin --password F28wJsVTHFFAxttxR9TkCY2a75d3t9ds --authenticationDatabase admin --db barcode -c users /path/file.bson

##### Dump Backup
	mongodump --host 127.0.0.1:27017 --username uAdmin --password F28wJsVTHFFAxttxR9TkCY2a75d3t9ds --authenticationDatabase admin --db barcode --out /home/ubuntu/backups/2018-11-21

## Run the Apps

`npm run dev`

## Good luck have fun!

* prep by Nico Amarilla, April 2020