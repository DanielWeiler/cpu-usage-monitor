# CPU Usage Monitor

A single-page application that monitors the CPU usage of the host device. It was built to monitor a personal computer running Windows. A line chart displays the CPU usage percentage for each second for the past 100 seconds. The chart updates in near real-time without a need for refreshing the browser. 


## Technologies

- React
- Node.js
- NPM
- Express
- Axios
- Recharts
- ESLint

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

- Clone the project repository
- Install the dependencies in the root folder and react-ui folder with npm.

```
# Clone this repository
C:/> git clone https://github.com/DanielWeiler/cpu-usage-monitor.git

# Navigate to the project
C:/> cd cpu-usage-monitor

# Install dependencies
C:/> npm install

# Navigate to the react-ui folder
C:/> cd cpu-usage-monitor/react-ui

# Install dependencies
C:/> npm install
```

- Additionally, create a .env file in the root folder declaring a port for the backend to run on. Such as: 

```
PORT=4000
```

### Running frontend and backend in development mode

- Navigate to the root folder and run the backend with the command:

```
C:/> cd cpu-usage-monitor
C:/> npm run dev
```

- Navigate to the react-ui folder in a different terminal window and run the frontend with the command:

```
C:/> cd cpu-usage-monitor/react-ui
C:/> npm start
```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser. The backend is running on [http://localhost:4000](http://localhost:4000/api) (Or on the port you have declared).

### Creating and running a production build

- To create a production build, navigate to the react-ui folder run the following command:

```
C:/> cd cpu-usage-monitor/react-ui
C:/> npm run build
```

- To run the production build, navigate to the root folder and run the following command:

```
C:/> cd cpu-usage-monitor
C:/> npm start
```

Now you can open [http://localhost:4000](http://localhost:4000) (Or on the port you have declared) to view the production build in the browser.

## Author

Daniel Weiler
