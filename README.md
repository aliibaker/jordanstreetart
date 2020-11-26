# Amman Street Art

[Amman Street Art](https://www.ammanstreetart.com) is an open source web application which displays the graffiti and murals of Amman on a virtual map. 
![amman street art](/examples/ASA_logo_1.png)

<table>
  <tr>
    <td> <img src="/examples/IMG_5155.jpeg"  alt="1" width = 700px height = 400px ></td>
    <td><img src="/examples/capture2.PNG" alt="2" width=700px height = 400px ></td>
   </tr> 
</table>

![website](/examples/Capture3.PNG)

## Setup Tutorial

To run the website locally on your computer you will need to have the latest versions of: 
* [nodejs](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm) 
* [yarn](https://yarnpkg.com/getting-started/install) 
* [Python >=3.8](https://www.python.org/downloads/)

## Setting up React

This project relies on the framework ReactJS for the frontend. Make sure that you are able to [deploy a base React application](https://reactjs.org/docs/getting-started.html) if you've never done so before.

## Setting up frontend 

To build the frontend you will need to set it up with [yarn](https://yarnpkg.com/getting-started/install). Once yarn is setup on your computer, run `yarn install`. Now you should be able to run `yarn start` to build the program and run it locally on your machine, however the map will not display. You will need to obtain an API key from [mapbox](https://www.mapbox.com/maps/). Once you get an API key, create a file within the root directory named `.env.local` and write `REACT_APP_MAPBOX_TOKEN={YOUR_API_TOKEN_HERE}`. You should now be able to view a plain map. 

## Setting up the backend

To setup the backend, you will need to setup a [virtual environment](https://docs.python.org/3/tutorial/venv.html). Within the root folder, run `python3 -m venv env`. Activate your virtual envrionment by running `source env/bin/activate` and then `run pip install -r requirements.txt` to retrieve all the modules the backend depends on. 

## Running flask

To run flask you will need to run the following command:
`flask run`
The backend should be up and running now. 

## Serving the website

To run the website, you need to run both the frontend server and backend server. When they're both running. Navigate to the frontend server localhost:3000 and you can now see the murals of Amman! 

Note: This is where I setup the frontend server by default, the backend server can be reached at localhost:5000. 

