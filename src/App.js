import React, { useEffect } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { PrivateRoute, PublicRoute, NotFound } from './components'
import { Login, Home, Location } from './screens';
import { LOGIN_URL, Home_URL, LOCATION_URL } from './constant'
window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;
function App() {
  useEffect(() => {
    OneSignal.push(() => {
      OneSignal.init(
        {
          appId: "6988fea7-97bb-4dc7-8f94-3f797e872f7a", //STEP 9
          promptOptions: {
            slidedown: {
              enabled: true,
              actionMessage: "We'd like to show you notifications for the latest news and updates about the following categories.",
              acceptButtonText: "OMG YEEEEESS!",
              cancelButtonText: "NAHHH",
              categories: {
                tags: [
                  {
                    tag: "react",
                    label: "ReactJS",
                  },
                  {
                    tag: "angular",
                    label: "Angular",
                  },
                  {
                    tag: "vue",
                    label: "VueJS",
                  },
                  {
                    tag: "js",
                    label: "JavaScript",
                  }
                ]
              }
            }
          },
          welcomeNotification: {
            "title": "One Signal",
            "message": "Thanks for subscribing!",
          }
        },
        //Automatically subscribe to the new_app_version tag
        OneSignal.sendTag("new_app_version", "new_app_version", tagsSent => {
          // Callback called when tag has finished sending
          console.log('new_app_version TAG SENT', tagsSent);
        })
      );
    });
  })
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path={Home_URL} component={Home} />
          <PrivateRoute exact path={LOCATION_URL} component={Location} />
          <PublicRoute exact path={LOGIN_URL} component={Login} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
