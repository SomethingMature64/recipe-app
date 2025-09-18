import {View, TextInput, TouchableOpacity} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {authStyles} from '../assets/styles/auth.styles'
import {COLORS} from '../constants/colors'
import { useState } from "react";

export default function AuthInput({
    value,
    Placeholder,
    onChangeText,
    keyboardType="default",
    secure=false,
})
{
    const [showPassword,setShowPassword] = useState(false);
    return (
        <View style={authStyles.inputContainer}>
                    <TextInput
                        style={authStyles.textInput}
                        placeholder= {Placeholder}
                        placeholderTextColor={COLORS.textLight}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={secure && !showPassword}
                        autoCapitalize="none"
                        keyboardType={keyboardType}
                    />
                    {secure && (
                    <TouchableOpacity
                        style={authStyles.eyeButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                    <Ionicons
                          name={showPassword ? "eye-outline" : "eye-off-outline"}
                          size={20}
                          color={COLORS.textLight}
                    />
                    </TouchableOpacity>
                    )}
                    
        </View>
    )
}