import {useEffect,useState} from 'react'
import {Alert} from 'react-native'
import {API_URL} from '../constants/api'

export function useFavorites(userID)
{
    const [favoriteRecipes, setFavouriteRecipes] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=> {
        const loadFavorites = async () => {
            try {
                const response = await fetch(`${API_URL}/favorites/${user.id}`);
                if(!response.ok) throw new Error("Failed to fetch favorites");

                const favorites = await response.json();

                //transform the data to match the recipe card component's expected
                const transformedFavorites = favorites.map((favorite)=>({
                    ...favorite,
                    if: favorite.recipeID,
                }));

                setFavouriteRecipes(transformedFavorites);

            } catch (error) {
                console.log("Error loading favorites", error);
                Alert.alert("Error","Failed to load favorites");
            }
            finally {
                setLoading(false);
            }
        };

        loadFavorites();
    },[userID]);

    return {favoriteRecipes,loading};
}