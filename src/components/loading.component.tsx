import React from "react"
import { Text, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import useTheme from "../utils/theme"
import AppContainer from "./container.componenet"

const LoadingComp:React.FC = () => {
    const {colors} = useTheme()
    return (
        <AppContainer>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={colors.text}/>
                <Text style={{color: colors.text}}>Loading...</Text>
            </View>
        </AppContainer>
    )
}

export default LoadingComp