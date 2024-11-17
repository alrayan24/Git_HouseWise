import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

// MenuItem Component
const MenuItem = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Image source={icon} style={styles.menuIcon} />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
};

// ProfileScreen Component
const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profileName, setProfileName] = useState('Marvin Dala');
  const [address, setAddress] = useState('1234 Elm Street');
  const [email, setEmail] = useState('marvin.dala@example.com');

  const handleSave = () => {
    // Save actions (e.g., to a database or local state)
    setModalVisible(false); // Close modal after saving
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        <Text style={styles.profileName}>{profileName}</Text>
        <Text style={styles.points}>Pinaka Gwapo</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem 
          title="Edit Profile" 
          icon={require('../assets/accountIcon.png')} 
          onPress={() => setModalVisible(true)} 
        />
        <MenuItem 
          title="Saved Project" 
          icon={require('../assets/HistoryIcon.png')} 
          onPress={() => navigation.navigate('SavedProjects')} 
        />
        <MenuItem 
          title="Create Project" 
          icon={require('../assets/CreateIcon.png')} 
          onPress={() => navigation.navigate('Suggest')} 
        />
        <MenuItem 
          title="FeedBack" 
          icon={require('../assets/feedbackIcon.png')} 
          onPress={() => navigation.navigate('FeedBack')} 
        />
        <MenuItem 
          title="Log out" 
          icon={require('../assets/logout.png')} 
          onPress={() => navigation.navigate('Home')} 
        />
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={profileName}
              onChangeText={setProfileName}
            />

            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FCC205',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#353336',
    marginVertical: 10,
  },
  points: {
    fontSize: 18,
    color: '#353336',
    backgroundColor: '#FCC205',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    resizeMode: 'contain',
  },
  menuText: {
    fontSize: 18,
    color: '#6e367c',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#353336',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#353336',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#353336',
    backgroundColor: '#F9F9F9',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#353336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#FCC205',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FCC205',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#353336',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
