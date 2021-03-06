import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader.js'

export default class SettingScreen extends React.Component{
  constructor(){
    super();
    this.state={
      emailId   : '',
      firstName : '',
      lastName  : '',
      address   : '',
      contact   : '',
      docId     : ''
    }
  }
  getUserDetails() {
    var user = firebase.auth().currentUser;
    var email = user.email;

    db.collection("users").where("email_id" , "==" , email).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        var data = doc.data()
        this.setState({
          emailId : data.email_id,
          firstName : data.first_name,
          lastName  : data.last_name,
          address   : data.address,
          contact   : data.contact,
          docId     : doc.id
        })
      })
    })
  }
  updateUserDetails = () => {
    db.collection("users").doc(this.state.docId)
    .update({
      "first_name": this.state.firstName,
      "last_name" : this.state.lastName,
      "address"   : this.state.address,
      "contact"   : this.state.contact,
    })
    Alert.alert("Profile Updated Successfully");
  }
  componentDidMount() {
    this.getUserDetails();
  }
  render(){
    return(
        <View style={{flex:1}}>
         <MyHeader title="SETTING" navigation = {this.props.navigation}/>
            <KeyboardAvoidingView behavior="padding" style={styles.KeyboardAvoidingView} >
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
                value = {this.state.firstName}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
                value = {this.state.lastName}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
                value = {this.state.contact}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
                value = {this.state.address}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
                value = {this.state.emailId}
              />
              <TouchableOpacity style={styles.button}
                onPress={()=>{
                  this.updateUserDetails()
                }}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'black',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  KeyboardAvoidingView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ffffff',
    borderColor:'black',
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
  },
  buttonText:{
    fontSize:25,
    fontWeight:"bold",
    color:"#fff"
  }
})