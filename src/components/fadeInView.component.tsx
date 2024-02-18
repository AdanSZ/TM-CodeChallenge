import React, { ReactNode, useEffect, useRef } from "react"
import { Animated, StyleProp, ViewProps, ViewStyle } from "react-native"

const FadeInView: React.FC<{
    children: ReactNode
    viewStyle?: StyleProp<ViewStyle>, 
}> 
    =  ({viewStyle, children}) => {
    
        // animate logic
    const fadeAnim = useRef(new Animated.Value(0)).current;
    fadeAnim.addListener(() => {return});
    
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);
  
    return(
        <Animated.View style={[{opacity: fadeAnim}, viewStyle]}>
            {children}
        </Animated.View>
    )
} 

export default FadeInView