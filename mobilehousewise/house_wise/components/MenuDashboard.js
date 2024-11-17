import React, { useState, useContext, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

const SaveProjects = ({ navigation }) => {
  const [projects] = useState([]);
  const [isHomeVisible, setHomeVisible] = useState(true);
  const [isSaveVisible, setSaveVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);
  
  const [isPasswordVisible, setPasswordVisible] = useState(false); // Visibility toggle for password
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


  const { user, setUser, authToken, logout } = useContext(AuthContext);

  // console.log("User in MenuDashboard:", user);
  
  const togglePasswordVisibility = (setter) => {
    setter((prev) => !prev);
  };


  const handleCancelChangePassword = () => {
    setChangePasswordVisible(false);
  };

  const handleLogout = () => {
    logout();
    navigation.replace('Login'); // Replace screen to prevent back navigation
  };

  const renderRectangle = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <TouchableOpacity key={index} style={styles.rectangle}>
        <Text style={styles.rectangleText}>Rectangle {index + 1}</Text>
      </TouchableOpacity>
    ));
  };

  const renderProjects = () => {
    return projects.length ? (
      projects.map((project, index) => (
        <View key={index} style={styles.projectItem}>
          <Text style={styles.projectText}>{project}</Text>
        </View>
      ))
    ) : (
      <Text style={styles.modalText}>No projects created yet</Text>
    );
  };

  const handleHomeClick = () => {
    setHomeVisible(true);
    setSaveVisible(false);
    setMenuVisible(false);
  };

  const handleMenuClick = () => {
    setHomeVisible(false);
    setSaveVisible(false);
    setMenuVisible(true);
  };

  const handleSaveClick = () => {
    setHomeVisible(false);
    setSaveVisible(true);
    setMenuVisible(false);
  };

  const handleEditClick = () => {
    setEditModalVisible(true);
  };
  
// Define `updatedData` in the state, initialized with user data or empty strings
const [updatedData, setUpdatedData] = useState({
  name: user?.name || '',
  username: user?.username || '',
  email: user?.email || '',
  age: user?.age ? user.age.toString() : '', // Convert age to string for TextInput
});

useEffect(() => {
  // When user data changes, update `updatedData` as well
  setUpdatedData({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    age: user?.age ? user.age.toString() : '',
  });
}, [user]);

// Handle input changes
const handleInputChange = (field, value) => {
  setUpdatedData((prevData) => ({
    ...prevData,
    [field]: value,
  }));
  setHasChanges(true); // Enable save button when changes occur
};

// Save the updated data
const handleSave = async () => {
  try {
    console.log("Auth Token:", authToken);
    const response = await axios.put(
      'http://192.168.1.7:8000/housewise/update_user/',
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include the token in the header
        },
      }
    );

    console.log('Response:', response.data); 

    Alert.alert('Success', 'Profile updated successfully');
    
    // Update the user data in AuthContext for immediate UI update
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));

    // Close the modal and reset hasChanges
    setEditModalVisible(false);
    setHasChanges(false);

  } catch (error) {
    console.error('Error updating profile:', error);
    Alert.alert('Error', 'Failed to update profile');
  }
};

const handleCancelClick = () => {
  setEditModalVisible(false);
  setHasChanges(false);
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/HWLogo.png')} style={styles.title} />
        </View>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.homebar} onPress={handleHomeClick}>
            <Ionicons name="home" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.savebar} onPress={handleSaveClick}>  
            <Ionicons name="folder" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.menubar}>
            <TouchableOpacity style={styles.navMenu} onPress={handleMenuClick}>
              <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* HomeContainer: Displayed when isHomeVisible is true */}
      {isHomeVisible && (
        <ScrollView contentContainerStyle={styles.homeContainer}>
          {renderRectangle()}
        </ScrollView>
      )}

      {/* SaveContainer: Displayed when isSaveVisible is true */}
      {isSaveVisible && (
        <ScrollView contentContainerStyle={styles.saveContainer} scrollEnabled={projects.length > 3}>
          <View style={styles.modalContent}>
            {renderProjects()}
      
          </View>
        </ScrollView>
      )}

      {/* MenuContainer: Displayed when isMenuVisible is true */}
      {isMenuVisible && user && ( // Check if user is not null
        <View style={styles.menuContainer}>
          <View style={styles.profileDetails}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileCircle} />
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userUsername}>@{user.username}</Text>
          </View>

          <View style={styles.profileOptions}>
            <View style={styles.profileOverview}>
              <TouchableOpacity
                style={styles.userDetailsButton}
                onPress={() => setProfileDropdownVisible(!isProfileDropdownVisible)}
              >
                <Text style={styles.userDetailsText}>User Details</Text>
                <Ionicons
                  name={isProfileDropdownVisible ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>

              {isProfileDropdownVisible && (
              <View style={styles.dropdownContent}>
                <View style={styles.iconTextRow}>
                  <Ionicons name="mail" size={18} color="black" style={styles.icon} />
                  <Text>Email: {user.email}</Text>
                </View>
                <View style={styles.iconTextRow}>
                  <Ionicons name="person" size={18} color="black" style={styles.icon} />
                  <Text>Age: {user.age}</Text>
                </View>
                <View style={styles.iconTextRow}>
                  <Ionicons name="lock-closed" size={18} color="black" style={styles.icon} />
                  <Text>Password: *******</Text>
                </View>
              </View>
            )}


    {
      isEditModalVisible && user && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isEditModalVisible}
          onRequestClose={handleCancelClick}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              
              {/* Label and Name Field */}
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                value={updatedData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholder="Name"
              />
              
              {/* Label and Username Field */}
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.input}
                value={updatedData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                placeholder="Username"
              />
              
              {/* Label and Email Field */}
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={updatedData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Email"
                keyboardType="email-address"
              />
              
              {/* Label and Age Field */}
              <Text style={styles.label}>Age:</Text>
              <TextInput
                style={styles.input}
                value={updatedData.age}
                onChangeText={(text) => handleInputChange('age', text)}
                placeholder="Age"
                keyboardType="numeric"
              />

              {/* Change Password Button */}
              <TouchableOpacity style={styles.passwordButton} onPress={() => setChangePasswordVisible(true)}>
                <Text style={styles.passwordButtonText}>Change Password</Text>
              </TouchableOpacity>

              {/* Save and Cancel Buttons */}
              <View style={styles.editButtonsContainer}>
                <TouchableOpacity
                  style={[styles.saveButton, { backgroundColor: hasChanges ? 'green' : 'gray' }]}
                  onPress={handleSave}
                  disabled={!hasChanges}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelClick}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
      )
    }

    {isChangePasswordVisible && (
            <Modal
              transparent={true}
              animationType="fade"
              visible={isChangePasswordVisible}
              onRequestClose={handleCancelChangePassword}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.passwordModalContainer}>
                  <Text style={styles.label}>Current Password:</Text>
                  <View style={styles.passwordInputContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Enter current password"
                      secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => togglePasswordVisibility(setPasswordVisible)}
                    >
                      <Ionicons
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.label}>New Password:</Text>
                  <View style={styles.passwordInputContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Enter new password"
                      secureTextEntry={!isNewPasswordVisible}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => togglePasswordVisibility(setNewPasswordVisible)}
                    >
                      <Ionicons
                        name={isNewPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.label}>Confirm New Password:</Text>
                  <View style={styles.passwordInputContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Confirm new password"
                      secureTextEntry={!isConfirmPasswordVisible}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => togglePasswordVisibility(setConfirmPasswordVisible)}
                    >
                      <Ionicons
                        name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.passwordButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.saveButton, { backgroundColor: 'gray' }]}
                      disabled={true}
                    >
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancelChangePassword}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
                </View>

                <View style={styles.menuOption}>
                  <TouchableOpacity style={styles.editButton}onPress={handleEditClick }>
                    <Ionicons name="pencil" size={18} color="white" />
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out" size={18} color="white" />
                    <Text style={styles.buttonText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Floating Action Button */}
          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('Options')}
          >
            <Ionicons name="add" size={32} color="white" />
          </TouchableOpacity>
        </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC205',
  },
  header: {
    backgroundColor: '#FCC205',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    width: 330,
    height: 75,
    resizeMode: 'contain',
  },
  navbar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homebar: {
    width: '42.5%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#353336',
    borderRadius: 10,
  },
  savebar: {
    width: '42.5%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#353336',
    borderRadius: 10,
  },
  menubar: {
    width: '15%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#353336',
    borderRadius: 10,
  },
  navMenu: {
    padding: 10,
  },
  homeContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  rectangle: {
    width: '80%',
    aspectRatio: 2,
    marginVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  rectangleText: {
    color: 'black',
    fontSize: 16,
  },
  saveContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalContent: {
    marginHorizontal: '5%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
  },
  projectItem: {
    backgroundColor: '#EFEFEF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  projectText: {
    color: 'black',
  },
  closeText: {
    color: '#353336',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#353336',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  menuContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  profileDetails: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'yellow',
    borderColor: 'blue',
    borderWidth: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userUsername: {
    fontSize: 14,
    color: 'gray',
  },
  profileOptions: {
    paddingHorizontal: 20,
  },
  profileOverview: {
    marginBottom: 20,
  },
  userDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#EFEFEF',
  },
  userDetailsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContent: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  menuOption: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },

  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },


  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)' 
  },
  
  modalContainer: { 
    width: '90%', 
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 20 
  },
  
  label: { 
    fontSize: 16, 
    marginBottom: 5 
  },
  
  input: { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 15, 
    paddingHorizontal: 10 
  },
  
  passwordButton: { 
    alignSelf: 'center', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    width: '100%',
    borderRadius: 20, 
    borderColor: 'red', 
    borderWidth: 1, 
    marginTop: 10 
  },
  
  passwordButtonText: { 
    color: 'red', 
    textAlign: 'center' 
  },
  
  editButtonsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20 
  },
  
  saveButton: { 
    padding: 10, 
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 5 
  },
  
  saveButtonText: { 
    color: 'white' 
  },
  
  cancelButton: { 
    backgroundColor: 'red', 
    padding: 10, 
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 5 
  },
  
  cancelButtonText: { 
    color: 'white' 
  },
  passwordModalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: 'yellow'
  },

  passwordButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },

  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },

  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },

  eyeIcon: {
    padding: 3,
  },
});

export default SaveProjects;
