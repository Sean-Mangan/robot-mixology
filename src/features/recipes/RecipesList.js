import React from 'react'
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import './RecipesList.css'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const RecipesList = () => {

  const URL = "https://api.alwayshello.com/make_drink"

    const [name, setName] = useState("")
    const [recipe, setRecipe] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(URL, {prompt: name})
        .then((resp => {setRecipe(resp.data.recipe)}))
        .catch((err) => {console.log(err); setError((err?.response?.data?.error) ? err?.response?.data?.error : "An unexpected error occured")})
        .finally(() => setLoading(false))
    }

    const openBMAC = () => {
      window.open("https://www.buymeacoffee.com/gymDev", '_blank', 'noopener,noreferrer');
    }

  return (
    <div className='recipe-background'>
    {(isLoading)
      ? 
      <div className='load-blur'>
        <div className='loader-section' onClick={() => openBMAC()}>
          <div className='loading-text loading-title'>Making Your Drink!</div>
          <div className='loader-wrapper'>
            <span class="loader"></span>
          </div>
          <div className='loading-text'>Enjoying your drinks? <a className="linkage" href="#">Consider buying us a coffee!</a></div>
        </div>
      </div>
      :
        <></>
    }
    {(error !== "") 
    ? 
      <Alert 
        className='error-msg'
        onClose={() => {setError("")}} style={(error !== "") ? {textAlign:"left"} : {display: "none"}} 
        severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          {error}
      </Alert>
    : <></>
    }
    <form onSubmit={(e) => handleSubmit(e)}>
      <TextField value={name} onChange={(e) => setName(e.target.value)}></TextField>
      <Button type="submit">Submit</Button>
    </form>
    {recipe}

    </div>
  );
}

export default RecipesList