import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (feedback.trim().length > 0) {
      // Process feedback submission (e.g., save to database, send to server)
      Alert.alert('Thank You!', 'Your feedback has been submitted.');
      setFeedback(''); // Clear feedback input
      Keyboard.dismiss(); // Dismiss the keyboard
    } else {
      Alert.alert('Error', 'Please enter your feedback before submitting.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Send us your Feedback!</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Write your feedback here..."
        placeholderTextColor="#888"
        value={feedback}
        onChangeText={setFeedback}
        multiline
        onSubmitEditing={handleSubmit} // Call handleSubmit when "Return" is pressed
        blurOnSubmit={true} // Dismiss the keyboard on submit
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC205',
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 20, // Space between header and input
    alignItems: 'center', // Center the header text
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#353336',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#353336',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#353336',
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#353336',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FCC205',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
