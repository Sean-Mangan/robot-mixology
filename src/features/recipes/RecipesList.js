import React, { useEffect } from 'react'
import { Button, Paper, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import './RecipesList.css'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import orderAsks, { explanation } from './bartenderInputs';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';

const RecipesList = () => {

  const URL = "https://api.alwayshello.com"

    const [name, setName] = useState("")
    const [prompt, setOrderAsk] = useState(orderAsks[Math.floor(Math.random()*orderAsks.length)])
    const [open, setOpen] = useState(true)
    const [recipes, setRecipes] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [snack, setSnack] = React.useState(false);
    const {drinkName, drinkIndex} = useParams()

    useEffect(()=>{
      if (drinkName && drinkIndex){
        setLoading(true)
        setName(drinkName)
        axios.get(`${URL}/get_drink?name=${drinkName}&index=${drinkIndex}`)
        .then((resp => {
          var newArray = recipes.slice(0, 10);    
          newArray.unshift({name: name, recipe: resp.data.recipe, shareableLink: resp.data.shareableLink});   
          setRecipes(newArray)
        }))
        .catch((err) => {console.log(err); setError((err?.response?.data?.error) ? err?.response?.data?.error : "An unexpected error occured")})
        .finally(() => setLoading(false))
      }
    }
    ,[])

    const handleClick = (text) => {
      navigator.clipboard.writeText(text)
      setSnack(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSnack(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(URL+"/make_drink", {prompt: name})
        .then((resp => {
          var newArray = recipes.slice(0, 10);    
          newArray.unshift({name: name, recipe: resp.data.recipe, shareableLink: resp.data.shareableLink});   
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
      {(open)
        ? 
        <div className='load-blur'>
          <div className='opener-section' onClick={() => setOpen(false)}>
          <div className='explanation-box'>
            <strong>Welcome to Robot Mixology!</strong>
            <br/>
            <br/>
            {explanation}
            <br/>
            <br/>
            <strong>We cannot gaurantee that all generated drinks are safe for human consumption.</strong>
          </div>
          <Button type="submit" variant="contained" sx={{backgroundColor: "cyan", color:"rgb(61, 61, 61);"}}>Click Here to Get Started!</Button>
          </div>
        </div>
        :
            <>
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
                <div className='card-title-wrap'>
                  <Button className="share-btn" startIcon={<SendIcon/>} type="submit" variant="contained" onClick={() => handleClick(recipe.shareableLink)}>Share</Button>
                  <div className="recipe-name"><strong >{recipe.name}</strong></div>
                  <Snackbar
                    open={snack}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message="Copied Link To Clipboard"
                    action={null}
                  >
                    <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                      Copied Link to Clipboard
                    </Alert>
                  </Snackbar>
                </div>
                <br/>
                {recipe.recipe}
              </Paper>
            )
          })}
        </div>
      </>
    }
    </div>
  );
}

export default RecipesList