import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { IAlbum } from "../query/albums.types"
import Icon from 'react-native-vector-icons/Feather';
import useTheme from "../../../utils/theme";

/**
 * Return an Item for Accordion
 * 
 *
 * ```ts
 * const AccordionItem = ({item, onPressIcon}:{item: IAlbum, onPressIcon: () => void})
 * ```
 */

const AccordionItem = ({item, onPressIcon}:{item: IAlbum, onPressIcon: () => void}) => {
    const {colors} = useTheme()
    return (
      <View style={[styles.accordionItemContainer, {backgroundColor: colors.background}]}>
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
        <Text style={{fontSize: 12, textAlign: 'right', flex: 1, color: colors.text}} numberOfLines={2}>{item.title}</Text>
        <TouchableOpacity onPress={onPressIcon}>
          <Icon 
              name={'minus-circle'} 
              size={20} 
              color='red' 
              style={{marginLeft: 20}}
            />
        </TouchableOpacity>
      </View>
    </View>
    )
  }

  const styles = StyleSheet.create({
    accordionItemContainer: {
      margin: 5,
      alignItems: 'flex-end',
      padding: 10,
      borderRadius: 10
    }
  });
  
  export default AccordionItem