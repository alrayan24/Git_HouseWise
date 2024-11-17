import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

export default function App() {
  const navigation = useNavigation(); // Access navigation
  const handlePress = () => {
    alert('Icon clicked!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Image source={require('../assets/ConcreteMix.png')} style={styles.concrete_mix} />
        </View>
      </View>
      
      {/* Build button moved to container */}
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Options')}>
        <Image source={require('../assets/houseiconn.png')} style={styles.icon} />
        <Text style={styles.iconText}>Build</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC205', // Yellow background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },

  startText:{
    fontSize : 20,
    fontWeight: 'bold'
  },
  container2: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '85%',
    borderRadius: 40,
    alignContent: 'center',
    marginTop:-130
  },
  container3: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#FCC205',
    borderWidth: 4,
    alignContent: 'center',
    marginTop:10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation:10
  },


  iconContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FCC205',
    borderWidth: 4,
    borderRadius: 15,
    position: 'absolute', // This makes it absolute within the container
    bottom: 30, // Adjust this value to position it as desired within the yellow container
    padding: 15, // Optional: Adds some space around the button content
  },
  concrete_mix: {
    width: 300, // Adjust the width and height as per your icon's aspect ratio
    height: 300,
    resizeMode: 'contain',
  },
  icon: {
    width: 150, // Adjust the width and height as per your icon's aspect ratio
    height: 100,
    resizeMode: 'contain',

  },

  iconText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
;