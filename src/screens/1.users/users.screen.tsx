import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, StyleSheet,Appearance, Text, FlatList, TouchableOpacity, Platform, Animated} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useGetUSers } from "./query/users.query";
import { RootStackParamList } from '../../stackNav';
import UserItem from './components/UserItem';
import { Button, Searchbar } from 'react-native-paper';
import { IUsers } from './query/users.types';
import { useAppDispatch } from '../../store/hooks'
import Icon from 'react-native-vector-icons/Feather';
import { resetItems } from '../../store/albumSlice';
import LoadingComp from '../../components/loading.component';
import { NativeModules } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppContainer from '../../components/container.componenet';
import useTheme from '../../utils/theme';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import FadeInView from '../../components/fadeInView.component';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


const UsersScreen = () => {
    const {CustomModules} = NativeModules
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const {data, isPending, refetch} = useGetUSers()
    const [searchQuery, setSearchQuery] = useState('');
    const [searchData, setSearchData] = useState<IUsers[]>([]);
    const dispatch = useAppDispatch()
    const {colors} = useTheme()
    
    

    // BottomSheet logic 
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['30%', '35%'], []);

    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleDismissModalPress = useCallback(() => {
      bottomSheetModalRef.current?.dismiss()
    }, []);

    useEffect(() => {
      // header options 
      navigation.setOptions({
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
                handlePresentModalPress()
              }}>
                <Icon name={"trash"} color={'red'} size={20} style={{marginRight: 10}}/>
            </TouchableOpacity>
            {
              
              Platform.OS === 'ios' &&
              <TouchableOpacity onPress={() => {
                CustomModules.customModuleParams('I\'m on iPhone', (callback: string) => {
                  console.log(callback)
                })
              }}>
                <AntDesign name={"apple1"} color={colors.text} size={20} style={{marginRight: 10}}/>
              </TouchableOpacity>
            }
          </View>
        )
      })
      refetch()
    }, [])

    useEffect(() => {
      if(data) {
        setSearchData(data)
      }
    }, [data])

    useEffect(() => {
      // if searchQuery then filter data array to search the information
      if(searchQuery){
        const filter = data?.filter((item) => {
          return item.name.includes(searchQuery)
        })
        if(filter){
          setSearchData(filter)
        } else {
          setSearchData([])
        }
      } else {
        setSearchData(data || [])
      }
    }, [searchQuery])

    // if loading 
    if(isPending) {
      return (
        <LoadingComp />
      )
    }

    return (
      <AppContainer>
        <FadeInView viewStyle={styles.container}>
          <View style={styles.searchCont}>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={{
                  backgroundColor: colors.buttons,
                }}
                inputStyle={{
                  color: colors.text
                }}
                iconColor={colors.text}
                placeholderTextColor={colors.placeHolder}
              />
          </View>
          {
            searchQuery && !searchData.length && 
            <View style={styles.container}>
              <Icon name='search' size={25} />
              <Text>Users not found...</Text>
            </View>
          }
          <FlatList 
            data={searchData}
            renderItem={({item}) => 
              <UserItem 
                user={item} 
                onPress={() => navigation.navigate('Photos', {item})}
              />
            }
            keyExtractor={item => item.id.toString()}
            style={styles.listContainer}
            onRefresh={() => refetch()}
            refreshing={isPending}
          />
        </FadeInView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          backdropComponent={BottomSheetBackdrop}
          snapPoints={snapPoints}
          onChange={()=>{}}
          backgroundStyle={{
            backgroundColor: colors.buttons,
          }}
        >
          <View style={[styles.bottomSheetContainer, {backgroundColor: colors.buttons,} ]}>
            <Text style={{color: colors.text, fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
              Are you sure you want to clear all saved items?
            </Text>
            <View style={{flexDirection:  'row', marginTop: 60, justifyContent: 'space-between'}}>
              <View style={{flex: 1, paddingHorizontal: 20}}>
                <Button 
                  contentStyle={{backgroundColor: colors.recurring.red}}
                  labelStyle={{color: colors.recurring.white}}
                  onPress={() => {
                    handleDismissModalPress()
                    dispatch(resetItems())
                  }}
                >
                  Yes
                </Button>
              </View>
              <View style={{flex: 1, paddingHorizontal: 20}}>
                <Button
                  contentStyle={{backgroundColor: colors.recurring.black}}
                  labelStyle={{color: colors.recurring.white}}
                  onPress={handleDismissModalPress}
                >
                  No
                </Button>
              </View>
            </View>
          </View>
        </BottomSheetModal>
      </AppContainer>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContainer: {
      width: '100%',
      padding: 20,
      marginBottom: 40,
    },
    searchCont: {
      padding: 20,
      width: '100%',
    },
    bottomSheetContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 40,
      paddingHorizontal: 20,
    },
  });
  

  export default UsersScreen