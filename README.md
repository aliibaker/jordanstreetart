# Jordan Street Art

[Jordan Street Art](https://www.ammanstreetart.com) is an open source web application which displays the graffiti and murals of Jordan on a virtual map. 
![amman street art](/examples/ASA_logo_1.png)

<table>
  <tr>
    <td> <img src="/examples/IMG_5155.jpeg"  alt="1" width = 700px height = 400px ></td>
    <td><img src="/examples/capture2.PNG" alt="2" width=700px height = 400px ></td>
   </tr> 
</table>

![website](/examples/Capture3.PNG)

## Setup Tutorial

This tutorial assumes that you are using some Unix machine. If you are on Windows, it is recommended to use WSL to set up this project. 

To run the website locally on your computer you will need to have the latest versions of: 
* [nodejs](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm) 
* [yarn](https://yarnpkg.com/getting-started/install) 
* [Python >=3.8](https://www.python.org/downloads/)




## Setting up React

This project relies on the framework ReactJS for the frontend. Make sure that you are able to [deploy a base React application](https://reactjs.org/docs/getting-started.html) if you've never done so before.

## Installing SQLite3

This project currently uses SQLite3 as a temporary solution for the database. We will hopefully upgrade to a more scalable system such as PostgreSQL in the future. For now please make sure you have SQLite3 installed on your system. 

WSL/Linux:
'sudo apt-get install sqlite3'

MacOS (with brew installed):
'brew install sqlite3'

## Virtual Environment

You will need to setup a virtual environment for this project. The following steps below will walk you through how to install virtual environments for python.Make sure you have [pip](https://pip.pypa.io/en/stable/installing/) installed first. 


'sudo pip3 install virtualenv'

## Automatic Setup 

You can use the `mawahebsetup` script to automatically setup the project.
All you have to do is run:
`./bin/mawahebsetup`

You will then need to run `yarn start` and `flask run` on two seperate terminals to get the website running. 
NOTE: You will need an API key from mapbox to have the map rendered on your screen. Please visit [mapbox](https://www.mapbox.com/maps/) to get a key. You will then need to create a folder within the root directory of the project named `.env.local` and insert `REACT_APP_MAPBOX_TOKEN={YOUR_API_TOKEN_HERE}` inside the file. 

## Manual Setup:

The following steps below will show you how to setup the project manually. Note that this is the same setup method the `mawahebsetup` script uses. 

## Setting up the frontend 

To build the frontend you will need to set it up with [yarn](https://yarnpkg.com/getting-started/install). Once yarn is setup on your computer, run `yarn install`. Now you should be able to run `yarn start` to build the program and run it locally on your machine, however the map will not display. You will need to obtain an API key from [mapbox](https://www.mapbox.com/maps/). Once you get an API key, create a file within the root directory named `.env.local` and write `REACT_APP_MAPBOX_TOKEN={YOUR_API_TOKEN_HERE}`. You should now be able to view a plain map. 

## Setting up the backend

To setup the backend, you will need to setup a [virtual environment](https://docs.python.org/3/tutorial/venv.html). Within the root folder, run `python3 -m venv env`. Activate your virtual envrionment by running `source env/bin/activate` and then run `pip install -r requirements.txt` to retrieve all the modules the backend depends on. 

## Running flask

To run flask you will need to run the following command on a terminal which has activated the virtual environment:
`flask run`
The backend should be up and running now. 

## Setting up the database

To setup the database, you will need to run `./bin/mawahebdb create`. Note that a fresh clone of the repository already has the database setup, so you will not need to run this script. In the case your database is not working, please run the following commands:

`./bin/mawahebdb destroy`
`./bin/mawahebdb create`

Note that this process might take a while, so be patient. In any scenario where you need to reset the database, please run `./bin/mawahebdb reset`

## Serving the website

To run the website, you need to run both the frontend server and backend server. When they're both running. Navigate to the frontend server localhost:3000 and you can now see the murals of Amman! 

Note: This is where I setup the frontend server by default, the backend server can be reached at localhost:5000. 

## LICENSE 

Distributed under the GNU General Public License v3.0. See LICENSE for more information.

