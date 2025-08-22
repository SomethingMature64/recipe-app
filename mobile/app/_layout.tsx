import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return(<SafeAreaView style={{flex:1}}> //To prevent our content from falling underneath the status bar
    <Stack screenOptions={{headerShown:false}}/> //! Use this to hide the header bar
  </SafeAreaView>
  )
  
}
