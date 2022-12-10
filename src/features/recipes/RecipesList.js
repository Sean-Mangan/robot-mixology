import React from 'react'
import { Button, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import './RecipesList.css'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import orderAsks, { explanation } from './bartenderInputs';

const RecipesList = () => {

  const URL = "https://api.alwayshello.com/make_drink"

    const [name, setName] = useState("")
    const [prompt, setOrderAsk] = useState(orderAsks[Math.floor(Math.random()*orderAsks.length)])
    const [recipes, setRecipes] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(URL, {prompt: name})
        .then((resp => {
          var newArray = recipes.slice();    
          newArray.unshift({name: name, recipe: resp.data.recipe});   
          setRecipes(newArray)
        }))
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
      <div className='content-wrapper'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="prompt-text"><strong>{prompt}</strong></div>
          <TextField 
          value={name} 
          className="name-box" 
          label={"Drink Name"} 
          onChange={(e) => setName(e.target.value)}
          required={true}
          />
          <br/>
          <Button type="submit" variant="contained" sx={{backgroundColor: "cyan", color:"rgb(61, 61, 61);"}}>Submit</Button>
        </form>
        {recipes.map((recipe, i) => {
          return (
            <Paper elevation={12} className='recipe-wrap' key={i}>
            <strong className="recipe-name">{recipe.name}</strong>
            <br/>
            {recipe.recipe}
            </Paper>
          )
        })}
        {(recipes.length === 0)
        ? <div className='explanation-box'>
            {explanation}
            <br/>
            <br/>
            <strong>To Get started just enter a name of a drink you would like a recipe for </strong>
          </div>
        : <></>
      }
      </div>
    </div>
  );
}

export default RecipesList