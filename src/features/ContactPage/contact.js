import { Grid } from '@mui/material'
import React from 'react'

import "./contact.css"

function Contact() {
  return (
    <>
    <div className='contact_wrapper'>
      <p className='contact_title'>
        Contact Us
      </p>
      <p className='contact_text'>
        <strong>Hey There!</strong>
        <br/>
        <br/>
        My name is Sean Mangan, and I am the developer of robotmixology.com!
        I hate to admit that a passion of mine is taking advanced technology and ruining it, 
        whether that be creating drinks or creating a text bot to respond to texts like I would.
        There are no limits to the craziness.
        <br/>
        <br/>
        If you are interested in reaching out to me personally, you can find my information on my personal site:{" "}
        <a href='https://www.seanpmangan.com/'><strong className='linker'>{"www.seanpmangan.com"}</strong></a>.
        <br/>
        <br/>
        If you use the site and enjoy it, consider buying me a cup of coffee here{" "}
        <a href='https://www.buymeacoffee.com/gymDev'><strong className='linker'>{"Buy Me a Coffee"}</strong></a>.
      </p>
      </div>
      <div style={{textAlign:"center"}}>
        <img 
        className=" contact_image contact_center"
        src="https://hattavick.s3.amazonaws.com/chef2.jpg"/>
        <p style={{marginTop:"0"}}>{"^^Chef is the employee of the month"}</p>
        <div style={{marginTop: "1em"}}>
          Credits: <a className='linker' href="https://www.flaticon.com/free-icons/robot" title="robot icons">Robot icons created by Freepik - Flaticon</a>
        </div>
      </div>
    </>
)
}

export default Contact