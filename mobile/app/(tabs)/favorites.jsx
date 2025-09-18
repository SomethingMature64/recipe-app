import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import {favoritesStyles} from '../../assets/styles/favorites.styles';
import RecipeCard from '../../components/RecipeCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import NoFavoritesFound from "../../components/NoFavoritesFound";
import {useFavorites} from '../../hooks/useFavorites'
import ScreenHeader from '../../components/ScreenHeader'

const FavoriteScreen = () => {
    const {signOut} = useClerk();
    const {user} = useUser();
    
    const {favoriteRecipes,loading} = useFavorites(user.id)

    if (loading) return <LoadingSpinner message="Loading your favorites..." />

    return (
        <View style={favoritesStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ScreenHeader 
                    title={"Favorites"}
                    onLogout={signOut}
                />

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