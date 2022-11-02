import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h1>Technologies used:</h1>
         <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Sagas</li>
          <li>PostgresSQL</li>
          <li>CSS</li>
          <li>HTML</li>
         </ul>
         <h1>Thanks: </h1>
         <ul>
          <li>Prime Digital Academy</li>
          <li>Family</li>
          <li>Chris Black</li>
          <li>Phrygian</li>
         </ul>
      </div>
    </div>
  );
}

export default AboutPage;
