import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { API_URL } from "../../constants/api";
import {favoritesStyles} from '../../assets/styles/favorites.styles';
import {COLORS} from '../../constants/colors'
import {Ionicons} from '@expo/vector-icons'
import RecipeCard from '../../components/RecipeCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useState, useEffect } from "react";
import NoFavoritesFound from "../../components/NoFavoritesFound";

const FavoriteScreen = () => {
    const {signOut} = useClerk();
    const {user} = useUser();
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
    },[user.id]);

    const handleSignOut = () => {
        Alert.alert("Logout","Are you sure you want to logout?",
            [
                {text:"Cancel",style:"cancel"},
                {text:"Logout",style:"destructive",onPress:signOut},
            ]);
    };

    if (loading) return <LoadingSpinner message="Loading your favorites..." />

    return (
        <View style={favoritesStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={favoritesStyles.header}>
                    <Text style = {favoritesStyles.title}>Favorites</Text>
                    <TouchableOpacity style={favoritesStyles.logoutButton} onPress={handleSignOut}>
                        <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
                    </TouchableOpacity>
                </View>

                <View style={favoritesStyles.recipesSection}>
                    <FlatList
                        data={favoriteRecipes}
                        renderItem={({item})=><RecipeCard recipe={item}/>}
                        keyExtractor={(item)=>item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={favoritesStyles.recipesGrid}
                        scrollEnabled={false}
                        ListEmptyComponent={<NoFavoritesFound/>}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
export default FavoriteScreen;