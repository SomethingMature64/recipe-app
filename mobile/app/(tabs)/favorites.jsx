import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import {favoritesStyles} from '../../assets/styles/favorites.styles';
import {COLORS} from '../../constants/colors'
import {Ionicons} from '@expo/vector-icons'
import RecipeCard from '../../components/RecipeCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import NoFavoritesFound from "../../components/NoFavoritesFound";
import {useFavorites} from '../../hooks/useFavorites'

const FavoriteScreen = () => {
    const {signOut} = useClerk();
    const {user} = useUser();
    
    const {favoriteRecipes,loading} = useFavorites(user.id)

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