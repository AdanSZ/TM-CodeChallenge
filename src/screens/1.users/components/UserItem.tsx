import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, FlatList, Platform, UIManager } from "react-native";
import { IUsers } from "../query/users.types";
import Icon from 'react-native-vector-icons/Feather';
import { useEffect, useState } from "react";
import { useGetAlbums } from "../query/albums.query";
import { IAlbum } from "../query/albums.types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { storeDeleteItems } from "../../../store/albumSlice";
import AccordionItem from "./AccordionItem";
import LoadingComp from "../../../components/loading.component";
import useTheme from "../../../utils/theme";

const UserItem: React.FC<{user: IUsers, onPress: ()=>void}> = ({user, onPress}) => {
    const {colors} = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<IAlbum[]>([])
    const [filteredData, setFilteredData] = useState<IAlbum[]>([])
    const {deletedItems} = useAppSelector((state) => state.albumSlice)
    const dispatch = useAppDispatch()
    
    const {mutateAsync, error, isPending} = useGetAlbums()

    const getFilteredData = () => {
      if(deletedItems && deletedItems[user.id]){
        const currentData = data.filter((item) => !deletedItems[user.id].items.includes(item.id))
        setFilteredData(currentData)
      } else {
        setFilteredData(data)
      }
    }

    useEffect(() => {
      const getAlbums = async () => {
        const albums = await mutateAsync(user.id)
        setData(albums) 
      }
      if(isOpen){
        getAlbums()
      }
    }, [isOpen])

    useEffect(() => {
      if(data){
        getFilteredData()
      }
    }, [data])

    useEffect(() => {
      getFilteredData()
    }, [deletedItems])

    // using ofr animations on android
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  
    const onDeleteItem = (item: IAlbum) => {
      dispatch(storeDeleteItems({userId: item.userId, albumId: item.id}))
    }

    // make animation for dropdown items
    const toggleAccordion = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsOpen(!isOpen);
    }


    const Item: React.FC<{label: string, value: string}> = ({label, value}) => {
      return (
        <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 13, fontWeight: '500', color: colors.text}}>{label}</Text>
            <Text style={{fontSize: 13, fontWeight: '500', color: colors.text}}>{`: `}</Text>
            <Text style={{fontSize: 13, fontWeight: '400', color: colors.text}}>{value}</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.titleContainer, {backgroundColor: colors.buttons}]} onPress={onPress}>
          <View>
            <Text style={{fontSize: 18, fontWeight: '600', color: colors.text}}>{user.name}</Text>
            <Item label="User Name" value={user.username}/>
            <Item label="Company" value={user.company.name}/>
            <Item label="Website" value={user.website}/>
            <Item label="Email" value={user.email}/>
          </View>
          
          <TouchableOpacity 
              onPress={toggleAccordion}
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Icon 
              name={!isOpen ? 'chevron-down' : 'chevron-up'} 
              size={32} 
              color={colors.text}
            />
          </TouchableOpacity>
      </TouchableOpacity>

      {/* Accordion */}
      { isOpen &&
        <View style={[styles.accordionContainer, {backgroundColor: colors.buttons}]}>
          <FlatList
          data={filteredData}
          renderItem={({item}) => 
            <AccordionItem key={item.id} item={item} onPressIcon={() => onDeleteItem(item)}/>
          }
          refreshing={isOpen}
          ListFooterComponent={
            <View style={{paddingVertical: 20}}>
              {
                isPending && 
                <LoadingComp />
              }
              {
                !isPending && !filteredData.length &&
                <View style={{paddingVertical: 20, justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name="list" color={colors.text} size={25}/>
                  <Text style={{color: colors.text}}>Your list is empty</Text>
                </View>
              }
            </View>
          }
        />
        </View> 
        }
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      marginBottom: 25,
    },
    titleContainer: {
      flex: 1,
      padding: 20,
      width: '100%',
      backgroundColor: '#f3f3f3',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 10,
      flexDirection: 'row',
    },
    accordionContainer: {
      paddingHorizontal: 10,
      paddingTop: 10,
      marginTop: -5,
      justifyContent: 'flex-end',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,

    },
  });
  
  export default UserItem