import { View,Text,TouchableOpacity,ScrollView } from "react-native";
import {Image} from 'expo-image'
import {homeStyles} from "../assets/styles/home.styles"

export default function CategoryFilter({categories,selectedCategory,onSelectCategory})
{
    return(
        <View style={homeStyles.categoryFilterContainer}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={homeStyles.categoryFilterScrollContent}
            >
                {categories.map((category)=>{
                    const isSelected = selectedCategory === category.name;
                    return (
                        <TouchableOpacity
                        key={category.id}
                        style = {[homeStyles.categoryButton, isSelected && homeStyles.selectedCategoryImage]}
                        contentFit = "cover"
                        transition = {300}
                        >
                            <Image
                                source={{uri:category.image}}
                                style={[homeStyles.categoryImage, isSelected && homeStyles.selectedCategoryImage]}
                                contentFit="cover" 
                                // Content fit is to tell the image that it should be over the text 
                                transition={300}
                            />
                            <Text
                                style={[homeStyles.categoryText,isSelected&&homeStyles.selectedCategoryText]}
                            >
                                {category.name}
                            </Text>
                            
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}