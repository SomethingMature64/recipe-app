import {View, Text, TouchableOpacity} from 'react-native'
import {useRouter} from 'expo-router'
import {Ionicons} from '@expo/vector-icons'
import {COLORS} from '../constants/colors'
import {favoritesStyles} from '../assets/styles/favorites.styles'

const NoFavoritesFound = () => {
    return(
        <View style={favoritesStyles.emptyState}>
            <View style={favoritesStyles.emptyIconContainer}>
                <Ionicons name='heart-outline' size={80} color={COLORS.textLight} />
            </View>
            <Text style = {favoritesStyles.emptyTitle}>No favorites yet</Text>
            <TouchableOpacity style={favoritesStyles.exploreButton} onPress={()=>router.push("/")}>
                <Ionicons name='search' size={18} color={COLORS.textLight} />
                <Text style={favoritesStyles.exploreButtonText}>Explore Recipes</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NoFavoritesFound