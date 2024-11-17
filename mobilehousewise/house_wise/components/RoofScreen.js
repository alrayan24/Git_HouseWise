import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TrussScreen({ route }) {
  const navigation = useNavigation();
  const { roofType } = route.params || {};  // Get the roof type from the previous screen (e.g., RoofScreen)

  const [selectedTruss, setSelectedTruss] = useState('');
  const { houseLength, houseWidth, crLength, crWidth, CrLengthValue, CrWidthValue,room1Length,room1Width,room2Length,room2Width, roomCount, houseType } = route.params || {};
  console.log(`House Length: ${houseLength}`);
  console.log(`House Width: ${houseWidth}`);
  console.log(`CR Length: ${crLength}`);
  console.log(`CR Width: ${crWidth}`);
  console.log(`CR Length Value: ${CrLengthValue}`);
  console.log(`CR Width Value: ${CrWidthValue}`);
  console.log(`Room 1 Length: ${room1Length}`);
  console.log(`Room 1 Width: ${room1Width}`);
  console.log(`Room 2 Length: ${room2Length}`);
  console.log(`Room 2 Width: ${room2Width}`);
  console.log(`Room Count: ${roomCount}`);
  console.log(`House Type: ${houseType}`);


  // Set truss type based on roof selection
  const handleTrussSelection = (trussType) => {
    if (roofType === 'concrete') {
      setSelectedTruss('steel');  // Automatically select steel truss if concrete roof is selected
      Alert.alert('Truss Type', 'Concrete roof automatically uses steel truss.');
    } else {
      setSelectedTruss(trussType);
    }

    // Navigate to the EstimateScreen and pass the selected truss type
    navigation.navigate('Estimate', { trussType: selectedTruss || trussType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Truss Type</Text>

      {/* Steel Truss Button */}
      <TouchableOpacity
        style={[styles.trussButton, styles.steelTruss]}
        onPress={() => handleTrussSelection('Estimate')}
      >
        <Text style={styles.buttonText}>Steel Truss</Text>
      </TouchableOpacity>

      {/* Wooden Truss Button */}
      <TouchableOpacity
        style={[styles.trussButton, styles.woodenTruss]}
        onPress={() => handleTrussSelection('Estimate')}
      >
        <Text style={styles.buttonText}>Wooden Truss</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC205',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#353336',
    marginBottom: 30,
  },
  trussButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  steelTruss: {
    backgroundColor: '#4CAF50',  // Green for Steel Truss
  },
  woodenTruss: {
    backgroundColor: '#8B4513',  // Brown for Wooden Truss
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
