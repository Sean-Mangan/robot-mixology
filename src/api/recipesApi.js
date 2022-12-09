import axios from "axios";

const recipeApi = axios.create({baseURL: "https://api.alwayshello.com/make_drink"})

export const getRecipe = async (name) => {
    return await recipeApi.post("", {prompt: name})
}

export default recipeApi;