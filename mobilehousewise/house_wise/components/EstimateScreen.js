import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EstimateScreen() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation(); // Hook to navigate to another screen

  // Example list of materials and their prices
  const materials = [
    { id: '1', name: 'Cement', price: 1000 },
    { id: '2', name: 'Gravel', price: 800 },
    { id: '3', name: 'Sand', price: 1500 },
    { id: '4', name: 'Rebars', price: 1200 },
    { id: '5', name: 'Aggregates', price: 1000 },
  ];

  // Calculate the total estimated price
  const calculateTotalPrice = () => {
    const totalPrice = materials.reduce((sum, material) => sum + material.price, 0);
    return totalPrice;
  };

  // Function to handle navigation to the SaveProjects screen
  const handleSave = () => {
    navigation.navigate('SavedProjects'); // Redirect to SaveProjects screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Materials & Prices</Text>

      {/* Display the list of materials and their prices */}
      <FlatList
        data={materials}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.materialContainer}>
            <Text style={styles.materialText}>{item.name}</Text>
            <Text style={styles.priceText}>P{item.price}</Text>
          </View>
        )}
      />

      {/* Button to show the total estimated price */}
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>Estimated Total Price</Text>
      </TouchableOpacity>

      {/* Modal to show the total price */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Total Estimated Price</Text>
            <Text style={styles.modalPrice}>P{calculateTotalPrice()}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            {/* Save button added below */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC205', // Match your app's background color
    justifyContent: 'flex-start', // Align content to the top of the screen
    alignItems: 'center',
    paddingTop: 40, // Adds space at the top
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#353336',
    marginBottom: 30, // Increased margin to push title lower
  },
  materialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#353336',
  },
  materialText: {
    fontSize: 18,
    color: '#353336',
  },
  priceText: {
    fontSize: 18,
    color: '#353336',
  },
  dropdownButton: {
    marginBottom: 30, // Adds spacing from the materials list
    paddingVertical: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FCC205',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#353336',
    marginBottom: 20,
  },
  modalPrice: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  closeButton: {
    paddingVertical: 10,
    backgroundColor: '#9E9E9E',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  saveButton: {
    marginTop: 20, // Adds spacing between close and save buttons
    paddingVertical: 10,
    backgroundColor: '#FF9800', // Color for the save button
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});
