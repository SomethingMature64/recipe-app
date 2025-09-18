import {View,Text,TouchableOpacity,Alert} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {favoritesStyles} from '../assets/styles/favorites.styles'
import {COLORS} from '../constants/colors'
import { useClerk } from "@clerk/clerk-expo";

export default function ScreenHeader({title,hidelogout=false})
{
    const {signOut} = useClerk();
    const handleSignOut = () => {
        Alert.alert("Logout","Are you sure you want to logout?",
            [
                {text:"Cancel",style:"cancel"},
                {text:"Logout",style:"destructive",onPress:signOut},
            ]);
    };
    hidelogout = !hidelogout;
    return (
        <View style={favoritesStyles.header}>
            <Text style = {favoritesStyles.title}>{title}</Text>
            
            ({ hidelogout &&
                <TouchableOpacity style={favoritesStyles.logoutButton} onPress={handleSignOut}>
                <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
            </TouchableOpacity>
            })
        </View>
    );
}