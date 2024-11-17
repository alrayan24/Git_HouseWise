import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const LoginScreen = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.7:8000/housewise/auth/login/',
        {
          username_or_email: emailOrUsername,
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        console.log('Login successful');

        // Pass both user data and token to login function in AuthContext
        const { user, token } = response.data;
        console.log('Token:', token); 
        login(user, token);

        // Navigate to the next screen
        navigation.navigate('MenuDashboard');
      }
    } catch (error) {
      console.error('Login failed', error.response ? error.response.data : error);
      alert(error.response ? error.response.data.error : 'An unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source={require('../assets/HWLogo.png')} style={styles.illustration} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email or Username"
            placeholderTextColor="gray"
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
          />
          <FontAwesome name="envelope" size={20} color="#000" style={styles.icon} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="•••••••••••••••••"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <FontAwesome name="lock" size={20} color="#000" style={styles.icon} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.loginButton} onPress={handleLogin}> */}
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('MenuDashboard')}>
        
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.googleButtonWrapper}>
          <View style={styles.line} />
          <Text style={styles.googleButtonText}>or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <FontAwesome name="google" size={32} color="#DB4437" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC205',
    justifyContent: 'center',
    alignItems: 'center',

  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop: 250,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '97.5%',
    height: '80%',
    backgroundColor: '#FCC205',
    padding: 30,
    borderRadius: 30,
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
  icon: {
    marginLeft: 10,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: '#000',
    marginBottom: 30,
  },
  loginButton: {
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
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'yellow',
  },
  googleButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#353336',
    fontSize: 11,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginHorizontal: 1,
    marginTop: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#000',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 65,
  },
  registerText: {
    marginLeft: 10,
    marginTop: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default LoginScreen;