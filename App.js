import { StatusBar } from 'expo-status-bar';
import React, {useContext, useState} from 'react';
import { Button, ToastAndroid, Keyboard ,StyleSheet, Text, View } from 'react-native';

import Input from '../components/Input';
import COLORS from '../const/colors';


const App = ({navigation}) => { // Appimizin calismasini saglayan fonksiyon.

  // useState hook yapisi kullanilarak input ve errorler yakalandi.

  const [inputs, setInputs] = React.useState({phone: '',}); // input olarak empty string olarak numara alindi. 

  const [errors, setErrors] = React.useState({phone: '',}); // errors olarak kullanilacak henuz bos olan string yapisi.

  // return icinde cagirilmak uzere kullanilacak fonksiyon tanimlamalari

  const validate = () => { //validasyon islemini yapacak olan fonksiyon

    Keyboard.dismiss(); // Klavyeyi kapatir ve secileni kaldirir.
    const validatePhoneNumber = require('phone-validation-package'); // Yazmis oldugum paketin gerekliligine bakar.

    let phoneNumberIsValidated = validatePhoneNumber(inputs.phone); // input olarak verilen telefon numarasi hook yapisiyle degiskene aktarildi ve aslinda validasyon tamamlandi. phoneNumberIsValidated degiskeninin bool degerine gore yapimiza devam edebiliriz.

    if(phoneNumberIsValidated) { // Eger basarili bir sekilde validasyon tamamlanmissa burasi true olur ve calisir.
      ToastAndroid.show('Succesful!', ToastAndroid.SHORT);
    }
    else{
      handleError('Please input valid phone number','phone');
    };

    const handleOnChange = (text, input) => {
      setInputs(prevState => ({...prevState, [input]: text}));
    };

    const handleError = (errorMessage, input) => {
      setErrors(prevState => ({...prevState, [input] : errorMessage}));
    };

    return (
      <View style={styles_new.container}>
        <View style={styles_new.wrapper}>
          <Input
            onChangeText={text => handleOnChange(text, 'phone')}
            error={errors.phone}
            onFocus={() => {
              handleError(null, 'phone');
            }}
            keyboardType="numeric"
            label="Phone Number"
            placeholder="Enter your phone number"
          />
          <Button title="Validation" onPress={validate} />
          <View style={{flexDirection: 'row', marginTop: 20}}></View>
        </View>
      </View>
    );
  };

  }

// Hazir gelen css yapisi.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Ek olarak yazilan css
const styles_new = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  wrapper: {
    width: '80%',
  },
});


export default App; // Appimizi export ediyoruz.