import React from 'react';
import { StyleSheet, Dimensions, Image , TouchableOpacity} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import beach from '@/assets/images/playa.jpeg';

import { Text, View } from './Themed';

const { width } = Dimensions.get('window');
const {  height } = Dimensions.get('window');

const handleAccept = () => {
    console.log('Accept!');
};

export default function Card({ tittle }: { tittle: string }) {
  return (
    <View>
      <View style={styles.container}>
    
        <Image style={styles.image} source={beach}/>
        <View style={{backgroundColor:"transparent", display:"flex", flexDirection:"column", columnGap: 50, marginTop: 50}}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {tittle}
        </Text>
            <View style={{backgroundColor:"transparent", display:"flex", flexDirection:"row", columnGap: 50, marginTop: 50}}>
                <Button col={"#ee2222"} icon={"close"}></Button>
                <Button col={"#22ee22"} icon={"heart"}></Button>

            </View>
        </View>
      </View>
    </View>
  );
}

function Button(props: {col: string, icon: React.ComponentProps<typeof FontAwesome>['name'];}){
    return(
        <TouchableOpacity style={{
            
            backgroundColor: props.col,
            margin: "auto",
            justifyContent: 'center', // center vertically
            alignItems: 'center',
            width:60,
            height:60,
            borderRadius: 100,
        }} onPress={handleAccept}>
            <FontAwesome size={30} style={{ color:'#fefefe', padding: 10}} name={props.icon}/>
        </TouchableOpacity>
      
    )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#333333',
    width: width * 0.85,

    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 50,
    paddingTop: 15,
    paddingBottom: 45,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height: height*0.30,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#22DD22',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
});
