import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MAX_SIZE = 200;

export default function RoomScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { houseLength, houseWidth, crLength, crWidth, CrLengthValue, CrWidthValue, roomCount,houseType } = route.params || {};

  const [room1Dimensions, setRoom1Dimensions] = useState({ length: 0, width: 0 });
  const [room2Dimensions, setRoom2Dimensions] = useState({ length: 0, width: 0 });
  const isRoom2Active = roomCount === 2;

  const blueprintWidth = (houseWidth / Math.max(houseLength, houseWidth)) * MAX_SIZE;
  const blueprintHeight = (houseLength / Math.max(houseLength, houseWidth)) * MAX_SIZE;

  const [errors, setErrors] = useState([]);

  const handleRoomDimensionChange = (room, dimension, value) => {
    let newValue = parseFloat(value) || 0;
    let newErrors = [];
  
    if (dimension === 'width') {
      if (room === 1) {
        // Error if room 1 width exceeds houseWidth - CrWidthValue
        if (newValue > houseWidth - CrWidthValue) {
          newErrors.push(`Room 1 width cannot be greater than ${houseWidth - CrWidthValue}`);
        }
      } else if (room === 2) {
        const room1Width = room1Dimensions.width || 0; // assuming room1Dimensions holds room 1 dimensions
        const room1Length = room1Dimensions.length || 0;
        const room2Length = room2Dimensions.length || 0;
  
        // Apply the custom logic for room 2 width
        if (room1Length === CrLengthValue && room2Length < (houseLength - room1Length)) {
          if (newValue > houseWidth) {
            newErrors.push(`Room 2 width cannot be greater than ${houseWidth}`);
          }
        } else if (room1Length === CrLengthValue && (room1Width + CrWidthValue === houseWidth)) {
          if (newValue > room1Width - 1) {
            newErrors.push(`Room 2 width cannot be greater than ${room1Width - 1}`);
          }
        } else {
          if (newValue > houseWidth - CrWidthValue) {
            newErrors.push(`Room 2 width cannot be greater than ${houseWidth - CrWidthValue}`);
          }
        }
      }
    } else if (dimension === 'length') {
      if (room === 1) {
        const room2Length = room2Dimensions.length || 0; // assuming room2Dimensions holds room 2 dimensions
        if (newValue > houseLength - room2Length) {
          newErrors.push(`Room 1 length cannot be greater than ${houseLength - room2Length}`);
        }
      } else if (room === 2) {
        const room1Length = room1Dimensions.length || 0; // assuming room1Dimensions holds room 1 dimensions
        if (newValue > houseLength - room1Length) {
          newErrors.push(`Room 2 length cannot be greater than ${houseLength - room1Length}`);
        }
      }
    }
  
    setErrors(newErrors);
  
    if (newErrors.length === 0) {
      if (room === 1) {
        setRoom1Dimensions(prev => ({ ...prev, [dimension]: newValue }));
      } else if (room === 2) {
        setRoom2Dimensions(prev => ({ ...prev, [dimension]: newValue }));
      }
    }
  };
  
const getInputBoxStyle = (dimension, room) => {
  let hasError = false;
  if (room === 1 && dimension === 'length' && errors.some(err => err.includes('Room 1 length'))) {
    hasError = true;
  } else if (room === 2 && dimension === 'length' && errors.some(err => err.includes('Room 2 length'))) {
    hasError = true;
  } else if (room === 2 && dimension === 'width' && errors.some(err => err.includes('Room 2 width'))) {
    hasError = true;
  }

  return [
    styles.inputBox,
    hasError && { borderColor: 'red' },
  ];
};


const renderErrorMessages = () => {
  return errors.length > 0 ? (
    <View style={styles.errorContainer}>
      {errors.map((error, index) => (
        <Text key={index} style={styles.errorText}>{error}</Text>
      ))}
    </View>
  ) : null;
};

  const isNextButtonDisabled =
  errors.length > 0 ||
  !(
    (room1Dimensions.length > 0 && room1Dimensions.width > 0) ||
    (isRoom2Active && room2Dimensions.length > 0 && room2Dimensions.width > 0)
  );

  const getRoom2PositionStyle = () => {
    if (isRoom2Active) {
      return { bottom: 0, right: 0 };
    }
    return {};
  };

  const renderRoomDimensions = () => (
  <>
    <View style={styles.roomContainer}>
      <Text style={styles.roomTitle}>Room 1</Text>
      <View style={styles.dimensionsContainer}>
        <TextInput
          style={getInputBoxStyle('length', 1)}
          placeholder="Room 1 Length"
          keyboardType="numeric"
          onChangeText={(value) => handleRoomDimensionChange(1, 'length', value)}
        />
        <TextInput
          style={getInputBoxStyle('width', 1)}
          placeholder="Room 1 Width"
          keyboardType="numeric"
          onChangeText={(value) => handleRoomDimensionChange(1, 'width', value)}
        />
      </View>
    </View>

    {isRoom2Active && (
      <View style={styles.roomContainer}>
        <Text style={styles.roomTitle}>Room 2</Text>
        <View style={styles.dimensionsContainer}>
          <TextInput
            style={getInputBoxStyle('length', 2)}
            placeholder="Room 2 Length"
            keyboardType="numeric"
            onChangeText={(value) => handleRoomDimensionChange(2, 'length', value)}
          />
          <TextInput
            style={getInputBoxStyle('width', 2)}
            placeholder="Room 2 Width"
            keyboardType="numeric"
            onChangeText={(value) => handleRoomDimensionChange(2, 'width', value)}
          />
        </View>
      </View>
    )}
  </>
);

  const renderRoomIllustrations = () => {
    const rooms = [
      { dimensions: room1Dimensions, label: 'Room 1', offset: 0 },
      { dimensions: room2Dimensions, label: 'Room 2', offset: 10 },
    ];
    return rooms.map((room, i) => {
      if (i === 1 && !isRoom2Active) return null;

      const scaledWidth = (room.dimensions.width / houseWidth) * blueprintWidth;
      const scaledLength = (room.dimensions.length / houseLength) * blueprintHeight;

      return (
        <View
          key={i}
          style={[
            styles.roomIllustrationContainer,
            {
              width: scaledWidth,
              height: scaledLength,
              ...(i === 1 ? getRoom2PositionStyle() : { top: room.offset, right: room.offset }),
            },
          ]}
        >
          <Text style={styles.roomLabel}>{room.label}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.illustrationContainer}>
        <Text style={styles.widthLabel}>Width = {houseWidth} m</Text>
        <Text style={styles.lengthLabel}>Length = {houseLength} m</Text>

        <View style={[styles.blueprintIllustration, { width: blueprintWidth, height: blueprintHeight }]}>
          {CrWidthValue > 0 && CrLengthValue > 0 && (
            <View style={[styles.crIllustrationContainer, { width: crWidth, height: crLength }]}>
              <Text style={styles.crWidthLabel}>CR Width = {CrWidthValue} m</Text>
              <Text style={styles.crLengthLabel}>CR Length = {CrLengthValue} m</Text>
              <View style={[styles.crIllustration, { width: crWidth, height: crLength }]} />
              <Text style={styles.crText}>CR</Text>
            </View>
          )}
          {renderRoomIllustrations()}
        </View>
      </View>

      <Text style={styles.houseAreaText}>House Area = {houseLength * houseWidth} sq m</Text>
      <Text style={styles.CrAreaText}>CR Area = {CrLengthValue * CrWidthValue} sq m</Text>

      <View style={styles.Titlecontainer}>
        <Text style={styles.title}>Room Dimensions</Text>
        <View style={styles.roomsContainer}>{renderRoomDimensions()}</View>
      </View>

      <TouchableOpacity
          style={[styles.nextButton, isNextButtonDisabled && styles.nextButtonDisabled]}
          disabled={isNextButtonDisabled}
          onPress={() => {
            // Navigating to the next screen and passing room dimensions as params
            navigation.navigate('RoofScreen', {
              houseLength,
              houseWidth,
              crLength,
              crWidth,
              CrLengthValue,
              CrWidthValue,
              roomCount,
              room1Length: room1Dimensions.length,
              room1Width: room1Dimensions.width,
              room2Length: room2Dimensions.length,
              room2Width: room2Dimensions.width,
              houseType,
            });
          }}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        {renderErrorMessages()}
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
  roomsContainer: {
    flexDirection: 'column', // Ensures Room 1 and Room 2 stack vertically
    marginVertical: 20, // Add some vertical margin for spacing
  },
  roomContainer: {
    flexDirection: 'column', // Aligns each room vertically
    marginBottom: 10, // Adds space between rooms
  },
  room: {
    width: 30,  // Adjust the size as needed based on room scaling
    height: 30,
    backgroundColor: '#8A2BE2',
    margin: 5,
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
    zIndex: 1,
  },
  crLengthLabel: {
    position: 'absolute',
    left: '-15%', // Positioning to the right of CR illustration
    top: '50%',
    transform: [{ translateY: -8 }, { rotate: '-90deg' }], // Center vertically and rotate for length
    color: '#353336',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 1,
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
  roomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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

  roomIllustrationContainer: {
    position: 'absolute',
    backgroundColor: '#ADD8E6',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomLabel: {
    fontSize: 12,
    color: '#353336',
    fontWeight: 'bold',
  },

  errorContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#A9A9A9', // Gray color for disabled button
  },
});

