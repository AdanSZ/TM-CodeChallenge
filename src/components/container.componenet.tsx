import React, { ReactNode, useEffect } from "react"
import { View } from "react-native"
import useTheme from "../utils/theme"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../stackNav"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

const AppContainer: React.FC<{children: ReactNode}> = ({children}) => {
    const {colors} = useTheme()
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    useEffect(() => {
        navigation.setOptions({
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text
          }
        })
      }, [])
      
    return (
      <BottomSheetModalProvider>
        <View style={{flex: 1, backgroundColor: colors.background}}>
            {children}
        </View>
      </BottomSheetModalProvider>
    )
}

export default AppContainer