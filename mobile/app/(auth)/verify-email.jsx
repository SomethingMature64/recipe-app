import { View, Text, Alert, KeyboardAvoidingView, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import { useSignUp } from "@clerk/clerk-expo";
import { authStyles } from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";

import { Image } from "expo-image";

import AuthInput from '../../components/AuthInput'
import AuthButton from '../../components/AuthButton'

const VerifyEmail = ({ email, onBack }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code })

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId })
      } else {
        Alert.alert("Error", "Verification failed. Please try again.");
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", err.errors?.[0]?.message || "Verification failed");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Container */}
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i3.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          {/* Title */}
          <Text style={authStyles.title}>Verify Your Email</Text>
          <Text style={authStyles.subtitle}>We&apos;ve sent a verification code to {email}</Text>

          <View style={authStyles.formContainer}>
            {/* Verification Code Input */}
            <AuthInput
              Placeholder="Enter verification code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />

            {/* Verify Button */}
            <AuthButton
              onPress={handleVerification}
              loading={loading}
              title1={"Verifying..."}
              title2={"Verify Email"}
            />

            {/* Back to Sign Up */}
            <TouchableOpacity style={authStyles.linkContainer} onPress={onBack}>
              <Text style={authStyles.linkText}>
                <Text style={authStyles.link}>Back to Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default VerifyEmail