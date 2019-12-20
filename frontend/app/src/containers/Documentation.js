import React from "react";
import "./Documentation.css";

export default function Documentation() {
  return (
    <div className="docs">
     <div className="usefullinks">
      <h1>Useful Links</h1>
      <ul>
        <li>
          <a href="https://en.wikipedia.org/wiki/SuperCollider" target="_blank">What is Supercollider</a>
          
        </li>
        <li>
        <a href="https://supercollider.github.io/" target="_blank">Getting started with Supercollider</a>
          
          </li>
          <li>
          <a href="https://supercollider.github.io/examples/supercollider-code-examples.html" target="_blank">Running a Sample code</a>
          
          </li>
          <li>
          <a href="http://doc.sccode.org/" target="_blank">Supercollider Documentation</a>
          </li>
      </ul>
     </div>
     {/* <div className="guide">
       <h1>Guide</h1>
     </div> */}
     <div className="contact">
       <h1>Contact Us</h1>
       <ul>
         <li>
           Email: jamsession@gmail.com
         </li>
         <li>
           Phone: XXX-XXX-XXXX
         </li>
       </ul>
     </div>
    </div>
  );
}