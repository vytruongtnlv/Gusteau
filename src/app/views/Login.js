import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { Input } from 'react-native-elements'
import firebase from 'firebase'
import { config } from '../config';
import { connect } from 'react-redux'
import { login, authInputChange, retrievePermissions } from '../actions';
import Button from '../components/Button';
const logo = require('../../img/lotteria.png');
global.permission = "none";
class Login extends Component {
    async componentDidMount() {
        firebase.initializeApp(config);
        await this.fetchPermission();
        await this.login();
    }
    fetchPermission() {
        this.props.retrievePermissions();
    }
    login() {
        // const { email, password } = this.props
        const email = "qtvien@gus.com"
        const password = "123456"
        this.props.login({ email, password })
    }
    render() {
        if (Object.keys(this.props.user).length !== 0) {
            // alert('Success')
            const uid = this.props.user.user["uid"]
            if (!uid) return null;
            const permission = this.props.permissionList[uid]
            if (!permission) return null;
            this.props.authInputChange({ field: 'permission', value: permission["permission"] })
            this.props.navigation.navigate('Tabs')
        }
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <Image
                    resizeMode="center"
                    source={logo} />
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
        permissionList: state.auth.permissionList,
        email: state.auth.email,
        password: state.auth.password,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { login, authInputChange, retrievePermissions })(Login)