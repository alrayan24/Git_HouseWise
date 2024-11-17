import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MAX_SIZE = 200;

export default function HouseDimension() {
  const navigation = useNavigation();
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [isAreaValid, setIsAreaValid] = useState(false);
  const [maxWidth, setMaxWidth] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomCount, setRoomCount] = useState(1);
  const [isFirstModalVisible, setIsFirstModalVisible] = useState(false);
  const route = useRoute();
  const { houseType } = route.params || {};
  console.log(`House Type: ${houseType}`);

  const [crLength, setCrLength] = useState(0);
  const [crWidth, setCrWidth] = useState(0);
  const [CrLengthValue, setCrLengthValue] = useState(0);
  const [CrWidthValue, setCrWidthValue] = useState(0);


  const validateDimensions = (lengthValue, widthValue) => {
    return lengthValue >= 3 && widthValue >= 3 && lengthValue * widthValue <= 50;
  };

  const handleDimensionInput = () => {
    const lengthValue = parseFloat(length) || 0;
    const widthValue = parseFloat(width) || 0;
    setIsAreaValid(validateDimensions(lengthValue, widthValue));

    setMaxWidth(lengthValue > 0 ? (50 / lengthValue).toFixed(2) : '');
    setMaxLength(widthValue > 0 ? (50 / widthValue).toFixed(2) : '');
  };

  const handleNextButton = () => {
    if (isAreaValid) {
      setIsModalVisible(true); // Show modal instead of navigating directly
    } else {
      Alert.alert("Invalid Input", "Total area cannot exceed 50 square meters.");
    }
  };

  const handleNoPress = () => {
    setCrLength(0);
    setCrWidth(0);
    setCrLengthValue(0);
    setCrWidthValue(0);
    setIsFirstModalVisible(true);
  };

  const handleRoomCountUpdate = (count) => {
    setRoomCount(count);
    navigateToRoomScreen(count);
  };

  const navigateToRoomScreen  = (count) => {
    navigation.navigate('RoomScreen', {
      houseLength: parseFloat(length), // Pass as houseLength
      houseWidth: parseFloat(width),   // Pass as houseWidth
      crLength,
      crWidth,
      CrLengthValue,
      CrWidthValue,
      roomCount: count,
      houseType,
    });
  };

  const updateAndNavigate = (roomCountValue) => {
    // Set the room count to 0 if "No" was selected on both modals
    setRoomCount(roomCountValue);
  
    // Navigate with updated values
    navigation.navigate('RoofScreen', {
      houseLength: parseFloat(length),
      houseWidth: parseFloat(width),
      crLength: crLength,
      crWidth: crWidth,
      CrLengthValue: CrLengthValue,
      CrWidthValue: CrWidthValue,
      roomCount: roomCountValue,
      houseType,
    });
  };

  

  const navigateToScreen  = (screen) => {
    navigation.navigate(screen, {
      houseLength: parseFloat(length), // Pass as houseLength
      houseWidth: parseFloat(width),   // Pass as houseWidth
      houseType,
    });
  };

  useEffect(() => {
    handleDimensionInput();
  }, [length, width])

  const lengthValue = parseFloat(length) || 0;
  const widthValue = parseFloat(width) || 0;
  const totalArea = lengthValue * widthValue;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.illustrationContainer}>
          {lengthValue > 0 && widthValue > 0 && totalArea <= 50 ? (
            <>
              <Text style={styles.widthLabel}>Width = {widthValue} m</Text>
              <Text style={styles.lengthLabel}>Length = {lengthValue} m</Text>
              <View style={[
                styles.blueprintIllustration,
                {
                  width: (widthValue / Math.max(lengthValue, widthValue)) * MAX_SIZE,
                  height: (lengthValue / Math.max(lengthValue, widthValue)) * MAX_SIZE,
                }
              ]} />
            </>
          ) : (
            <Text style={styles.blueprintText}></Text>
          )}
        </View>

        <Text style={styles.title}>House Dimensions</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                lengthValue < 3 ? styles.invalidInput : null
              ]}
              placeholder={`Length (m) - max ${maxLength}m`}
              keyboardType="numeric"
              value={length}
              onChangeText={(text) => setLength(text)}
            />
            <Text style={styles.minimumText}>3 meters minimum</Text>
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                widthValue < 3 ? styles.invalidInput : null
              ]}
              placeholder={`Width (m) - max ${maxWidth}m`}
              keyboardType="numeric"
              value={width}
              onChangeText={(text) => setWidth(text)}
            />
            <Text style={styles.minimumText}>3 meters minimum</Text>
          </View>
        </View>

        <Text style={styles.totalAreaIns}>Total Area = Length x Width</Text>
        <Text style={styles.totalAreaText}>Total Area = {totalArea.toFixed(2)} sq m</Text>
        <Text style={styles.errorText}>Total Area must be 50 sq m or less.</Text>

        <TouchableOpacity
          style={[
            styles.nextButton,
            !isAreaValid ? styles.disabledButton : null
          ]}
          onPress={handleNextButton}
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
                <TouchableOpacity style={styles.modalButton} onPress={() => updateAndNavigate(0)}>
                  <Text style={styles.nextButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={isModalVisible}
          transparent
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>Do you want your house to have a Comfort Room (CR)?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={() => navigateToScreen('CrScreen')}>
                  <Text style={styles.nextButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleNoPress}>
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
  },
  blueprintText: {
    color: '#353336',
    fontWeight: 'bold',
    fontSize: 18,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#353336',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  inputWrapper: {
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
  minimumText: {
    color: '#888888',
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
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  nextButton: {
    backgroundColor: '#353336',
    paddingVertical: 15,
    marginTop: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#AAAAAA',
  },
  nextButtonText: {
    color: '#FCC205',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '20%',
    backgroundColor: '#FCC205',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#353336',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#353336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
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

});
