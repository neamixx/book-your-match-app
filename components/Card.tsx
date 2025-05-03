import React, {Ref, useState, useEffect, useCallback, useRef, forwardRef } from 'react';
import { StyleSheet, Dimensions, Image , Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import beach from '@/assets/images/playa.jpeg';


const { width } = Dimensions.get('window');
const {  height } = Dimensions.get('window');

type card = {
    tittle: string,
    image: string,
}
export default function Card(){
    const [card, setCard] = useState<card | null>(null);
    const [loading, setLoading] = useState(true);

    const request_new_card = async () => {
        console.log("hola")
        try {
            setLoading(true)
            const response = await fetch('http://192.168.43.82:8000/card');
            const data = await response.json();
            console.log(data)
            console.log(`http://192.168.43.82:8000/${card?.image}`)

            setCard(data);
            setLoading(false);
        } catch {
        console.log("bug")
            return 'error'
        }
    };

    const handle_accept = async () => {
        request_new_card()
    }

    const handle_reject = async () => {
        request_new_card()
    }

    useEffect(() => {
        request_new_card(); // Call the handleAccept function when the component mounts
      }, []);
    
  return (
    <View>
      <View style={styles.container}>
            {loading ? <Text>"Loading"</Text>
            : <Image style={styles.image} source={{uri: `http://192.168.43.82:8000${card?.image}`}} />
        }
        
        <View style={{backgroundColor:"transparent", display:"flex", flexDirection:"column", columnGap: 50, marginTop: 50}}>
        <Text>
            {loading ? "loading" : card?.tittle}
        </Text>
            <View style={{backgroundColor:"transparent", display:"flex", flexDirection:"row", columnGap: 50, marginTop: 50}}>
                <Button col={"#ee2222"} icon={"close"} onPress={handle_accept}></Button>
                <Button col={"#22ee22"} icon={"heart"} onPress={handle_reject}></Button>
            </View>
        </View>
      </View>
    </View>
  );
}

const Button = ({ col, icon, onPress }: { col: string, icon: React.ComponentProps<typeof FontAwesome>['name'], onPress: () => void }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: col }]}
            onPress={onPress} // Use onPress to trigger the function
        >
            <FontAwesome size={30} style={styles.icon} name={icon} />
        </TouchableOpacity>
    );
};
  
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
  icon:{

  }
});
