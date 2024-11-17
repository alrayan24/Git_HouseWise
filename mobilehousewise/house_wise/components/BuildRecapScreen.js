import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MAX_SIZE = 200;

export default function RoomScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { houseLength, houseWidth, crLength, crWidth, CrLengthValue, CrWidthValue, roomCount } = route.params || {};
  console.log(`crLength: ${crLength}, crWidth: ${crWidth}, CrLengthValue: ${CrLengthValue}, CrWidthValue: ${CrWidthValue}, roomCount: ${roomCount}, houseLength: ${houseLength}, houseWidth: ${houseWidth}`);


   // Blueprint dimensions for the House
   const blueprintWidth = (houseWidth / Math.max(houseLength, houseWidth)) * MAX_SIZE;
   const blueprintHeight = (houseLength / Math.max(houseLength, houseWidth)) * MAX_SIZE;
 
  // Navigation functions
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.illustrationContainer}>
        <Text style={styles.widthLabel}>Width = {houseWidth} m</Text>
        <Text style={styles.lengthLabel}>Length = {houseLength} m</Text>

        {/* Blueprint Illustration */}
        <View style={[styles.blueprintIllustration, { width: blueprintWidth, height: blueprintHeight }]}>
          {/* CR Illustration within Blueprint */}
          {CrWidthValue > 0 && CrLengthValue > 0 && (
            <View style={[styles.crIllustrationContainer, { width: crWidth, height: crLength }]}>
              <Text style={styles.crWidthLabel}>CR Width = {CrWidthValue} m</Text>
              <Text style={styles.crLengthLabel}>CR Length = {CrLengthValue} m</Text>

              <View style={[styles.crIllustration, { width: crWidth, height: crLength }]} />
              <Text style={styles.crText}>CR</Text>
            </View>
          )}
        </View>
      </View>

        <Text style={styles.houseAreaText}>House Area = {houseLength * houseWidth} sq m</Text>
        <Text style={styles.CrAreaText}>Cr Area = {CrLengthValue * CrWidthValue} sq m</Text>

        <View style={styles.Titlecontainer}>
          <Text style={styles.title}>This is your HouseWise Preferences</Text>
        </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC205',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 20,
    backgroundColor: '#353336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#FCC205',
    fontWeight: 'bold',
  },
  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    width: MAX_SIZE,
    height: MAX_SIZE,
  },
  blueprintIllustration: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#353336',
    position: 'relative',
  },
  widthLabel: {
    position: 'absolute',
    top: -20,
    textAlign: 'center',
    color: '#353336',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lengthLabel: {
    position: 'absolute',
    left: -60,
    top: '50%',
    transform: [{ rotate: '-90deg' }],
    color: '#353336',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#353336',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#FCC205',
    fontWeight: 'bold',
  },
  crIllustrationContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crIllustration: {
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderWidth:1,
    position: 'absolute',
  },
  crWidthLabel: {
    position: 'absolute',
    bottom: -20, // Positioning below CR illustration
    color: '#353336',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  crLengthLabel: {
    position: 'absolute',
    left: '100%', // Positioning to the right of CR illustration
    top: '50%',
    transform: [{ translateY: -8 }, { rotate: '-90deg' }], // Center vertically and rotate for length
    color: '#353336',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#353336',
    textAlign: 'center',
    marginBottom: 0,
  },

  houseAreaText: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },

  CrAreaText: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
  },

  dimensionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBox: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  crText: {
    position: 'absolute',
    color: '#353336',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

