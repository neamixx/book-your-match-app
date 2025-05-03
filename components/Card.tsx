import React, { useState, useRef, useEffect } from 'react';
import { Animated, PanResponder, Easing, GestureResponderEvent, PanResponderGestureState, ViewStyle, StyleProp } from 'react-native';
import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

type CardData = {
  id: Number;
  tittle: string;
  image: string;
};

const Card = ({ tittle, img, offset, onExit}: { tittle: String, img: String, offset: number, onExit: () => void;}) => {
  const [card, setCard] = useState<CardData | null>(null);
  const position = useRef(new Animated.ValueXY()).current;

  const rotate = position.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-15deg', '0deg', '15deg'],
        extrapolate: 'clamp',
    });

    const colorAccept = position.x.interpolate({
        inputRange: [0, 120],
        outputRange: ['rgb(78, 78, 78)', 'rgb(36, 214, 36)'],
        extrapolate: 'clamp',
    });

    const colorReject = position.x.interpolate({
        inputRange: [-120, 0],
        outputRange: ['rgb(219, 39, 39)', 'rgb(78, 78, 78)'],
        extrapolate: 'clamp',
    });

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
    
        onPanResponderGrant: () => {
          position.extractOffset();
        },
    
        onPanResponderMove: Animated.event(
          [null, { dx: position.x, dy: position.y }],
          { useNativeDriver: false } 
        ),
    
        onPanResponderRelease: (e, gesture) => {
          position.stopAnimation()
          if (gesture.dx > 120) {
            Animated.timing(position, {
              toValue: { x: 500, y: 0 },
              duration: 800, // Duration of the animation
              easing: Easing.bezier(0.25, 0.8, 0.25, 1), // Custom Bezier curve easing
              useNativeDriver: false,
            }).start();
            handleAccept();
          } else if (gesture.dx < -120) {
            
            Animated.timing(position, {
              toValue: { x: -500, y: 0 },
              duration: 800, // Duration of the animation
              easing: Easing.bezier(0.25, 0.8, 0.25, 1), // Custom Bezier curve easing
              useNativeDriver: false,
            }).start();
            handleReject();
          } else {

          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
          }).start();
        }
        
        }
      })
    ).current;



  const handleAccept = () => {
    onExit();
  }
  const handleReject = () => {
    onExit();
  }

  const handleDelete = () => {
    console.log("freeze")
  }



  return (
        <Animated.View
        {...panResponder.panHandlers}
        style={[
            {
            position:'absolute',
            transform: [
                { translateX: position.x },
                { translateY: Animated.add(position.y, offset)},
                { rotate: rotate }
            ]
            }
        ]}
        >
          <View style={styles.outerContainer}>

          
      <View style={styles.card}>
          <Image
            style={styles.image}
            source={{ uri: `http://192.168.43.82:8000${img}` }}
          />

        <Text style={styles.title}> {tittle}</Text>

        <View style={styles.buttonRow}>
          <CardButton col={colorReject} icon="close" />
          <CardButton col={colorAccept} icon="heart" />
        </View>
      </View>
      </View>
    </Animated.View>
  );
}

type CardButtonProps = {
  col: string | Animated.AnimatedInterpolation<string>;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
};

const CardButton: React.FC<CardButtonProps> = ({ col, icon }) => (
  <Animated.View style={[styles.button, { backgroundColor: col }]}>
    <FontAwesome size={24} color="#fff" name={icon} />
  </Animated.View>
);
const styles = StyleSheet.create({
    outerContainer: {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
    },

    card: {
      backgroundColor: '#ffffff', // Make the card white
      width: width * 0.9,
      borderRadius: 16,
      alignItems: 'center',
      paddingLeft: 0,
      paddingRight: 0,
      elevation: 3,
      overflow:"hidden",      
    },
    image: {
      width: '100%',
      height: height * 0.3,
      marginBottom: 20,
    },
    title: {
      color: '#222', // Dark text for white card
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 30,
      textAlign: 'center',
    },
    loadingText: {
      color: '#888',
      fontSize: 18,
      marginVertical: 40,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginTop: 10,
    },
    button: {
      width: "50%",
      height: 60,
      margin: "auto",
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  


export default Card;