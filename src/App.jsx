import React, { useState } from "react";
import { h } from 'preact';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import styles from "./App.module.css";

import * as Pages from './pages';

var firebaseConfig = {
  apiKey: "AIzaSyDXoSFP9NgSGZldHewuSJKaEPQO6pGxFeo",
  authDomain: "dj-gaming-210131.firebaseapp.com",
  projectId: "dj-gaming-210131",
  storageBucket: "dj-gaming-210131.appspot.com",
  messagingSenderId: "679577478150",
  appId: "1:679577478150:web:b5d46361aa5071f0d8cf87",
  measurementId: "G-8RE269JNTK",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase
  .firestore()
  .enablePersistence()
  .catch(function (err) {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

export default function App() {
  const [isCN, setCN] = useState(0);

  const handleLANG = () => {
    setCN(!isCN);
  };

  return (
    <BrowserRouter>
      <div className={styles.Top}>
        <ClanName />
        <Tabs isCN={isCN} handleLANG={handleLANG} />
      </div>
      <div className={styles.Main}>
        <Switch>
          <Route exact path="/" component={Pages.Home} />
          <Route path="/members" component={Pages.Members} />
          <Route path="/activities" component={Pages.Activities} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function ClanName() {
  return (
    <div className={styles.ClanName}>
      <h1
        style={{
          fontWeight: 200,
          letterSpacing: "2px",
          margin: "0",
          fontSize: "2.5rem",
        }}
      >
        DJxGAMING
      </h1>
    </div>
  );
}

function Tabs(props) {
  const { isCN, handleLANG } = props;

  return (
    <div className={styles.Tabs}>
      <Link to="/" style={{'textDecoration': 'none'}} className={styles.item}>
        <h2 style={{ margin: "0", fontWeight: "100", 'color': 'white' }}>Home</h2>
      </Link>
      <Link to="/members" style={{'textDecoration': 'none'}} className={styles.item}>
        <h2 style={{ margin: "0", fontWeight: "100", 'color': 'white' }}>Members</h2>
      </Link>
      <Link to="/activities" style={{'textDecoration': 'none'}} className={styles.item}>
        <h2 style={{ margin: "0", fontWeight: "100", 'color': 'white' }}>Activities</h2>
      </Link>

      <div className={styles.item2}>
        {isCN ? (
          <h2 style={{ margin: "0", fontWeight: "100" }} onClick={handleLANG}>
            English
          </h2>
        ) : (
          <h2 style={{ margin: "0", fontWeight: "100" }} onClick={handleLANG}>
            中文
          </h2>
        )}
      </div>
    </div>
  );
}
