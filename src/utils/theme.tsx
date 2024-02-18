import { Appearance } from "react-native";



const recurring = {
    black: '#000',
    white: '#FFF',
    red: 'red',
}

const darkColors = {
    background: '#000',
    placeHolder: '#dedcdc',
    text: '#FFF',
    buttons: '#5c5c5c',
    recurring
}

const lightColors = {
    background: "#e0e0e0",
    placeHolder: '#706e6e',
    text: '#000',
    buttons: '#FFF',
    recurring
}

const useTheme = () => {
    const colorScheme = Appearance.getColorScheme();
    let colors = lightColors
    if(colorScheme === 'dark'){
        colors = darkColors
    }
    return {colors, colorScheme}
}

export default useTheme