import React, { useState, useEffect } from "react";
import { h } from 'preact';

import styles from "./Members.module.css";

export default function Members() {
  const [data, setData] = useState();

  useEffect(() => {
    var db = firebase.firestore();
    db.collection("groups")
      .get()
      .then(function (querySnapshot) {
        let temp = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          temp.push(doc.data());
          // console.log(doc.id, " => ", doc.data());
        });
        // console.log(querySnapshot);
        setData(temp);
      })
      .catch(function (error) {
        console.log("Firebase Error: ", error);
      });
  }, []);

  return (
    <div className={styles.Main}>
      {data ? (
        <>
          {data.map(function (group) {
            if (group.humans.length < 1) return <></>;
            return <Card key={group.name} group={group} />;
          })}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

function Card(props) {
  const { group } = props;
  const { name, sub, humans } = group;

  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;

    let temp = [];
    var db = firebase.firestore();
    for (let i = 0; i*10 < humans.length; ++i) {
      var q = humans.slice(i*10, i*10 + 10);
      db.collection("members")
      .where("gameID", "in", q)
      .orderBy("status", "desc")
      .get()
      .then(function (querySnapshot) {
        if(mounted) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data());
            temp.push(doc.data());
            setData(prev => [...prev, doc.data()]);
          });
        }
      })
      .catch(function (error) {
        console.log("Firebase Error: ", error);
      });
    }
    setData(temp);
    console.log(data);

    return function cleanup() {
      mounted = false;
    }
  }, []);

  return (
    <div className={styles.Card}>
      <div className={styles.Title}>
        <h1>{name}</h1>
        <h2>{sub}</h2>
      </div>
      {
        data ? <>
          {data.map(human => {
            return (<Human key={human.gameID} human={human} />)
          })}
        </> : <></>
      }
    </div>
  );
}

function Human(props) {
  const { human } = props;
  const {gameName, name, gameID, status} = human;

  return (
    <div className={`${styles.HumanCard} ${ status === 3 ? `${styles.Leader}` : status === 2 ? `${styles.CoLeader}` : status === 1 ? `${styles.Elite}` : `${styles.Member}`}`}>
      <h3 style={{'margin': 0, 'marginRight': '5px'}}>{gameName}</h3>
      <h3 style={{'margin': 0, 'fontWeight': '200'}}>{`(${name})`}</h3>
      <h5 style={{'margin': 0, 'marginLeft': 'auto', 'alignSelf': 'center', 'fontWeight': '300'}}>
        {
          status === 3 ? 'Leader' : status === 2 ? 'Co-Loader' : status === 1 ? 'Elite' : 'Member'
        }
      </h5>
    </div>
  )
}