import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  const [buildTitle, setBuildTitle] = useState("You want your house?");
  const route = useRoute();
  const [houseType, setHouseType] = useState(null); // New state for houseType

  const handleNavigate = (type) => {
    setHouseType(type); // Set houseType state
    navigation.navigate('HouseDimension', { houseType: type, buildTitle }); // Pass houseType to the next screen
  };

  return (
    <View style={styles.container}>
      {/* Editable build title */}
      <TextInput
        style={styles.optionBuild}
        value={buildTitle}
        onChangeText={setBuildTitle}
      />

      <View style={styles.row}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => handleNavigate('Concrete')}>
          <Image source={require('../assets/concreteicon.png')} style={styles.icon} />
          <Text style={styles.iconText}>Concrete</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconContainer} onPress={() => handleNavigate('Wooden')}>
          <Image source={require('../assets/woodenicon.png')} style={styles.icon} />
          <Text style={styles.iconText}>Wooden</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC205',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  optionBuild: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#353336',
    marginBottom: 15,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#353336',
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    elevation: 5,
    borderRadius: 15,
    borderColor: '#353336',
    borderWidth: 3,
    width: 120,
    marginHorizontal: 10,
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  iconText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#353336',
  },
});
