import React from 'react';

export default function App() {
  return (
    <>
      <ClanName />
    </>
  )
}

function ClanName() {
  return (
    <div style={{'padding': '20px', 'background': '#19214b', 'borderRadius': '10px'}}>
      <h1 style={{'fontWeight': 200, 'letterSpacing': '2px', 'margin': '0'}}>DJxGAMING</h1>
    </div>
  )
}