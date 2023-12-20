import { useFetch } from "../hooks/useFetch";

/** Admin API */
export const MenuApi = () => {

    const getCocktails = async () => {
        const now = new Date()
        console.log(now.getUTCMilliseconds())
        return await fetch(`https://gist.githubusercontent.com/jakewebber/0fed99eb73efd4c1fbd726a3eba065a4/raw/drinks.json?${now.getUTCMilliseconds}`)
        .then(r => r.json())
    }

    const getBatched = async () => {
        const now = new Date()
        return await fetch(`https://gist.githubusercontent.com/jakewebber/7b8a4196ee70dbee0119857fec5f3614/raw/batched.json?${now.getUTCMilliseconds}`)
        .then(r => r.json())
    }
    
    const getShots = async () => {
        const now = new Date()
        return await fetch(`https://gist.githubusercontent.com/jakewebber/d0a7bb972a6a0d4f8c060ccfeeb8463e/raw/shots.json?${now.getUTCMilliseconds}`)
        .then(r => r.json())
    }

    const getMocktails = async () => {
        const now = new Date()
        return await fetch(`https://gist.githubusercontent.com/jakewebber/b02cf87f8e15b04b01011c00f569d96f/raw/mocktails.json?${now.getUTCMilliseconds}`)
        .then(r => r.json())
    }

    return { getCocktails, getBatched, getShots, getMocktails }
}
