import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Input } from 'react-native-elements'
import firebase from 'firebase'
import config from '../config';
import { connect } from 'react-redux'
import { login, authInputChange } from '../actions';
import Home from './Home';
import Button from '../components/Button';
class Login extends Component {
    componentDidMount() {
        firebase.initializeApp(config);
        this.login()
    }
    login() {
        // const { email, password } = this.props
        const email = "qtvien@gus.com"
        const password = "123456"
        this.props.login({ email, password })
    }
    render() {
        if (Object.keys(this.props.user).length !== 0) {
            alert('Success')
            this.props.navigation.navigate('Tabs')
        }
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <Input
                    placeholder="email"
                    onChangeText={text => this.props.authInputChange({ field: 'email', value: text })} />
                <Input
                    placeholder="password"
                    onChangeText={text => this.props.authInputChange({ field: 'password', value: text })}
                    secureTextEntry={true} />
                <Button style={{ marginTop: 5, }} title="Login" onPress={this.login.bind(this)} />
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { login, authInputChange })(Login)