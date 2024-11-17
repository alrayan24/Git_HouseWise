import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

export default function HomeScreen() {
  const navigation = useNavigation(); // Access navigation
  const handlePress = () => {
    alert('Icon clicked!');
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={require('../assets/HWLogo.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Welcome Text Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subtitleText}>Estimate the Cost of Your Dream House,</Text>
        <Text style={styles.subtitleText}>You plan, we give value</Text>
      </View>

      {/* Button Section */}
      <View style={styles.buttonColumn}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>Have an account?</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>No account?</Text>
          <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Sign up')}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC205', // Yellow background
    justifyContent: 'flex-start', // Align items to the start of the container
    alignItems: 'center',
  },

  header: {
    marginBottom: 5,
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20, // Adjusted for a closer gap to the icon
  },

  subtitleText: {
    fontSize: 15,
    color: '#100',
  },

  iconContainer: {
    marginTop: 40,
    marginBottom: 5, // Space below the icon, adjusted to 20px gap to welcome text
    alignItems: 'center',
  },

  icon: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },

  buttonColumn: {
    marginTop: 20,
    width: '80%',  // Ensures buttons take 80% of the screen width
    alignItems: 'center',
  },

  buttonContainer: {
    alignItems: 'center',
    marginBottom: 15, // Space between the two buttons
    alignSelf: 'stretch', // Ensures button containers take the full width of buttonColumn
  },

  buttonLabel: {
    fontSize: 16,
    color: '#353336',
    marginBottom: 5,
  },

  loginButton: {
    backgroundColor: '#353336',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Button takes the full width of its container
  },

  signUpButton: {
    backgroundColor: '#353336',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Button takes the full width of its container
  },

  loginButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FCC205',
  },
});