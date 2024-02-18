import { FlatList, TouchableOpacity, Image, Text} from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../stackNav";
import { useGetAlbumPhotos, useGetAllAlbumPhotos } from "./query/photos.query";
import Icon from 'react-native-vector-icons/AntDesign';
import { IPhotosResponse } from "./query/photos.types";
import LoadingComp from "../../components/loading.component";
import AppContainer from "../../components/container.componenet";
import useTheme from "../../utils/theme";
import FadeInView from "../../components/fadeInView.component";

const PhotosScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Photos">>();
  const {name, id} = route.params?.item
  const {colors} = useTheme()
  const [isAllPhotos, setIsAllPhotos] = useState(false)
  const [data, setData] = useState<IPhotosResponse[]>([])
  const {data: photos, isPending: photosIsprending, error: errorPhotos} = useGetAlbumPhotos(id)
  const {data: allPhotos, isPending: isPendingAllPhotos, error: errorAll} = useGetAllAlbumPhotos()
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: isAllPhotos ? 'All Photos' : name,
      headerRight: () => (
        <TouchableOpacity onPress={()=>{
          console.log("press star")
          setIsAllPhotos(!isAllPhotos)
        }}>
          <Icon name={isAllPhotos ? "star": "staro"} color={colors.text} size={20} style={{marginRight: 10}}/>
        </TouchableOpacity>
      )
    })
  }, [isAllPhotos])

  useEffect(() => {
    if(photos) {
      setData(photos)
    }
  }, [photos])

  useEffect(() => {
    if(isAllPhotos){
      setData(allPhotos || [])
    } else {
      setData(photos || [])
    }
  }, [isAllPhotos])

  if(isPendingAllPhotos || photosIsprending) {
    return (
      <LoadingComp />
    )
  }

  if(errorPhotos || errorAll){
    return (
      <Text>Error...</Text>
    )
  }


  return (
    <AppContainer>
      <FadeInView viewStyle={{flex: 1}}>
          <FlatList
            data={data}
            keyExtractor={(item)=>item.id.toString()}
            numColumns={3}
            maxToRenderPerBatch={30}
            windowSize={10}
            style={{flex: 1}}
            scrollIndicatorInsets={{ right: 1 }}
            removeClippedSubviews={true}
            renderItem={({item}) => 
              <TouchableOpacity style={{flex: 1}}>
                <Image source={{uri: item.thumbnailUrl}} style={{width: '100%'}} height={150}/>
              </TouchableOpacity>
            }
          />
        </FadeInView>
      </AppContainer>
  );
}

export default PhotosScreen