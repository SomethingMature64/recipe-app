import {View,Text,TouchableOpacity,Alert} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {favoritesStyles} from '../assets/styles/favorites.styles'
import {COLORS} from '../constants/colors'

export default function ScreenHeader({title,onLogout})
{
    const handleSignOut = () => {
        Alert.alert("Logout","Are you sure you want to logout?",
            [
                {text:"Cancel",style:"cancel"},
                {text:"Logout",style:"destructive",onPress:onLogout},
            ]);
    };

    return (
        <View style={favoritesStyles.header}>
            <Text style = {favoritesStyles.title}>{title}</Text>
            {onLogout && (
            <TouchableOpacity style={favoritesStyles.logoutButton} onPress={handleSignOut}>
                <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
            </TouchableOpacity>
            )}
        </View>
    );
}