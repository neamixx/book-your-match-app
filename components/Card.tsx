import React, { useState, useRef, useEffect } from 'react';
import { Animated, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
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

export default function Card() {
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);

  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-15deg', '0deg', '15deg'],
        extrapolate: 'clamp',
    });
    const panResponder = useRef(
    PanResponder.create({
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
        position.setOffset({
            x: position.x._value,
            y: position.y._value
        });
        position.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { 
            useNativeDriver: false,
            listener(event) {
                console.log("hola")
            },
        }
        ),
        onPanResponderRelease: (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
        console.log('Released', gesture.dx, gesture.dy);

        // Optional: reset or swipe logic
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
        },
    })
    ).current;

  const requestNewCard = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://192.168.43.82:8000/card');
      const data = await response.json();
      setCard(data);
    } catch {
      console.log('Failed to fetch card');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => requestNewCard();
  const handleReject = () => requestNewCard();

  useEffect(() => {
    requestNewCard();
  }, []);

  return (
        <Animated.View
        {...panResponder.panHandlers}
        style={[
            {
            transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate: rotate }
            ]
            }
        ]}
        >
      <View style={styles.card}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <Image
            style={styles.image}
            source={{ uri: `http://192.168.43.82:8000${card?.image}` }}
          />
        )}

        <Text style={styles.title}>{loading ? 'Loading...' : card?.tittle}</Text>

        <View style={styles.buttonRow}>
          <CardButton col="#ee2222" icon="close" onPress={handleReject} />
          <CardButton col="#22ee22" icon="heart" onPress={handleAccept} />
        </View>
      </View>
    </Animated.View>
  );
}

const CardButton = ({
  col,
  icon,
  onPress,
}: {
  col: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: col }]}
    onPress={onPress}
  >
    <FontAwesome size={24} color="#fff" name={icon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    outerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 30,
    },
    card: {
      backgroundColor: '#ffffff', // Make the card white
      width: width * 0.9,
      borderRadius: 16,
      alignItems: 'center',
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 3,
    },
    image: {
      width: '100%',
      height: height * 0.3,
      borderRadius: 12,
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
      justifyContent: 'space-around',
      width: '60%',
      marginTop: 10,
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  