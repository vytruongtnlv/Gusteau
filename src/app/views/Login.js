import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase'
import config from '../config';
import {connect} from 'react-redux'
import { login } from '../actions';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        firebase.initializeApp(config);
    }
    login() {
        console.log('Log in')
        const email = "qtvien@gus.com"
        const password = "123456"
        this.props.login({email,password})
    }
    render() {
        return (
            <View>
                <TouchableWithoutFeedback
                    onPress={this.login.bind(this)}>
                    <Text> Login </Text>
                </TouchableWithoutFeedback>

            </View>
        );
    }
}
const mapStateToProps = state => {
    return{

    }
}
export default connect(mapStateToProps, {login})(Login)