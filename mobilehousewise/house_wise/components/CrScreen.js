import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Define max size for the House Illustration on any screen size
const MAX_SIZE = 200;

export default function CrScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { houseLength, houseWidth, houseType } = route.params;
  const [CrLength, setCrLength] = useState('');
  const [CrWidth, setCrWidth] = useState('');
  const [isAreaValid, setIsAreaValid] = useState(false);
  const [isFirstModalVisible, setIsFirstModalVisible] = useState(false);

  const validateDimensions = (CrLengthValue, CrWidthValue) => {
    return CrLengthValue >= 1.5 && CrLengthValue <= 3 && CrWidthValue >= 1.5 && CrWidthValue <= 3;
  };

  const handleDimensionInput = () => {
    const CrLengthValue = parseFloat(CrLength) || 0;
    const CrWidthValue = parseFloat(CrWidth) || 0;
    setIsAreaValid(validateDimensions(CrLengthValue, CrWidthValue));
  };

  useEffect(() => {
    handleDimensionInput();
  }, [CrLength, CrWidth]);

  const CrLengthValue = parseFloat(CrLength) || 0;
  const CrWidthValue = parseFloat(CrWidth) || 0;
  const CrtotalArea = CrLengthValue * CrWidthValue;

  const [roomCount, setRoomCount] = useState(1);

  // Blueprint dimensions for the House
  const blueprintWidth = (houseWidth / Math.max(houseLength, houseWidth)) * MAX_SIZE;
  const blueprintHeight = (houseLength / Math.max(houseLength, houseWidth)) * MAX_SIZE;

  // Scale CR dimensions relative to the house blueprint
  const scaledCrWidth = CrWidthValue > 0 ? (CrWidthValue / houseWidth) * blueprintWidth : 0;
  const scaledCrLength = CrLengthValue > 0 ? (CrLengthValue / houseLength) * blueprintHeight : 0;

  const handleRoomCountUpdate = (count) => {
    setRoomCount(count);
    if (count === 0) {
      navigation.navigate('BuildRecapScreen', { 
        houseType 
      }); // Pass houseType if count is 0
    } else {
      navigateToRoomScreen(count);
    }
  };

  const navigateToRoomScreen  = (count) => {
    navigation.navigate('RoomScreen', {
      houseLength,
      houseWidth,
      crLength: scaledCrLength,
      crWidth: scaledCrWidth,
      CrLengthValue,
      CrWidthValue,
      roomCount: count,
      houseType,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.illustrationContainer}>
          <Text style={styles.widthLabel}>Width = {houseWidth} m</Text>
          <Text style={styles.lengthLabel}>Length = {houseLength} m</Text>

          <View style={[styles.blueprintIllustration, { width: blueprintWidth, height: blueprintHeight }]}>
            {/* CR Illustration within Blueprint */}
            {CrLengthValue > 0 && CrWidthValue > 0 && (
              <>
                <View style={[styles.crIllustrationContainer, { width: scaledCrWidth, height: scaledCrLength }]}>
                  <Text style={styles.crWidthLabel}>CR Width = {CrWidthValue} m</Text>
                  <Text style={styles.crLengthLabel}>CR Length = {CrLengthValue} m</Text>

                  <View style={[styles.crIllustration, { width: scaledCrWidth, height: scaledCrLength }]} />
                  <Text style={styles.crText}>CR</Text>
                </View>
              </>
            )}
          </View>
        </View>

        <Text style={styles.houseAreaText}>House Area = {houseLength * houseWidth} sq m</Text>
        <Text style={styles.title}>CR Dimensions</Text>

        <View style={styles.CrinputContainer}>
          <View style={styles.CrinputWrapper}>
            <TextInput
              style={[styles.input, (CrLengthValue < 1.5 || CrLengthValue > 3) ? styles.invalidInput : null]}
              placeholder="CR Length"
              keyboardType="numeric"
              value={CrLength}
              onChangeText={(text) => setCrLength(text)}
            />
            <Text style={styles.inputLimitText}>Min 1.5 & Max 3</Text>
          </View>

          <View style={styles.CrinputWrapper}>
            <TextInput
              style={[styles.input, (CrWidthValue < 1.5 || CrWidthValue > 3) ? styles.invalidInput : null]}
              placeholder="CR Width"
              keyboardType="numeric"
              value={CrWidth}
              onChangeText={(text) => setCrWidth(text)}
            />
            <Text style={styles.inputLimitText}>Min 1.5 & Max 3</Text>
          </View>
        </View>

        <Text style={styles.totalAreaIns}>Total CR Area = Length x Width</Text>
        <Text style={styles.totalAreaText}>Total CR Area = {CrtotalArea.toFixed(2)} sq m</Text>

        <TouchableOpacity
          style={[styles.nextButton, !isAreaValid ? styles.disabledButton : null]}
          onPress={() => setIsFirstModalVisible(true)}
          disabled={!isAreaValid}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        {/* First Modal */}
        <Modal visible={isFirstModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsFirstModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>Do you want Rooms in your house?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={() => handleRoomCountUpdate(2)}>
                  <Text style={styles.nextButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => handleRoomCountUpdate(0)}>
                  <Text style={styles.nextButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles
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
  houseAreaText: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#353336',
    textAlign: 'center',
    marginBottom: 15,
  },
  CrinputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  CrinputWrapper: {
    alignItems: 'center',
    width: '40%',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 5,
    textAlign: 'center',
    borderColor: '#CCCCCC',
    borderWidth: 1,
  },
  invalidInput: {
    borderColor: 'red',
  },
  inputLimitText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  totalAreaIns: {
    color: '#353336',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  totalAreaText: {
    color: '#353336',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#353336',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignSelf: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#FCC205',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#888',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#353336',
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#353336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
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
