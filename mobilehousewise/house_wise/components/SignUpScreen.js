import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Handle the authentication and get the user info
      console.log(authentication);
      // Navigate to another screen or perform any action after successful sign-up
      navigation.navigate('Home'); // Navigate to Home or any other screen after sign-up
    }
  }, [response]);

  const handleSignUp = () => {
    // Perform sign-up logic here
    console.log('Sign up with:', { name, email, password });
    // For now, just navigate to the Login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/HWLogo.png')} style={styles.logo} />
      </View>

      {/* Sign Up Form */}
      <View style={styles.formContainer}>
        {/* Username Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={name}
            onChangeText={setName}
          />
          <FontAwesome name="user" size={20} color="#000" style={styles.icon} />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <FontAwesome name="envelope" size={20} color="#000" style={styles.icon} />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Create Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <FontAwesome name="lock" size={20} color="#000" style={styles.icon} />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Terms & Privacy Policy */}
        <Text style={styles.termsText}>
          By Signing Up, you agree to our{' '}
          <Text style={styles.linkText}>Terms & Privacy Policy</Text>
        </Text>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity disabled={!request} onPress={() => promptAsync()}>
            <FontAwesome name="google" size={32} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="facebook" size={32} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="twitter" size={32} color="#1DA1F2" />
          </TouchableOpacity>
        </View>

        {/* Already have an account */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.linkText}>Login</Text>
          </Text>
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
  },

  formContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: '#FCC205',
    padding: 30,
    borderRadius: 30,
    marginTop: 5,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 150,
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  icon: {
    marginLeft: 10, // Space between input and icon
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#353336',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#FCC205',
    paddingHorizontal: 10,
  },
  
  input: {
    flex: 1,
    height: 45,
    color: '#000', // Changed to black for better visibility
    padding: 10,
  },

  button: {
    backgroundColor: '#353336',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 200,
    marginLeft: 50,
    borderColor: '#FCC205',
    borderWidth: 1,
    elevation: 10,
    marginTop: 20,
  },

  buttonText: {
    color: '#FCC205',
    fontSize: 16,
    fontWeight: 'bold',
  },

  termsText: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    color: '#000',
  },

  linkText: {
    fontWeight: 'bold',
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },

  loginText: {
    textAlign: 'center',
    color: '#000',
  },
});
