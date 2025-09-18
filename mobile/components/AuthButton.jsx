import {TouchableOpacity,Text} from 'react-native'
import {authStyles} from '../assets/styles/auth.styles'

export default function AuthButton({onPress, loading, title1, title2})
{
    return(
        <TouchableOpacity
        style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
        onPress={onPress}
        disabled={loading}
        activeOpacity={0.8}
        >
            <Text style={authStyles.buttonText}>{loading ? `${title1}...` : title2 }</Text>
        </TouchableOpacity>
    )
}