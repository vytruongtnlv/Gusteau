import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { Input } from 'react-native-elements'
import firebase from 'firebase'
import { config } from '../config';
import { connect } from 'react-redux'
import { login, authInputChange, retrievePermissions, logout } from '../actions';
import Button from '../components/Button';
const logo = require('../../img/lotteria.png');

global.permission;
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
        // const email = "vytruong.tnlv@gmail.com"
        // const password = "7472mRJf"
        // const email = "vyb1505869@student.ctu.edu.vn"
        // const password = "654321"
        const email = "vytruong.520@gmail.com"
        const password = "123456"
        this.props.login({ email, password })
    }

    displayLogInForm() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <Image
                    resizeMode="center"
                    source={logo} />
                <Input
                    placeholder="Tài khoản"
                    onChangeText={text => this.props.authInputChange({ field: 'email', value: text })} />
                <Input
                    placeholder="Mật khẩu"
                    onChangeText={text => this.props.authInputChange({ field: 'password', value: text })}
                    secureTextEntry={true} />
                <Button style={{ marginTop: 5, }} title="Đăng nhập" onPress={this.login.bind(this)} />
            </View>
        )
    }
    render() {
        if (Object.keys(this.props.user).length !== 0) {
            // alert('Success')
            const uid = this.props.user.user["uid"]
            if (!uid) return null;
            const account = this.props.permissionList[uid]
            // if (!account) {
            //     this.props.logout()
            //     return (
            //         <View>
            //             {this.displayLogInForm()}
            //         </View>
            //     )
            // } else 
            if (account) {
                const permission = this.props.permissionList[uid]
                if (!permission) return null;
                this.props.authInputChange({ field: 'permission', value: permission["permission"] })
                global.permission = permission["permission"]
                if (permission["permission"] == "all" || permission["permission"] == "half") this.props.navigation.navigate("AdminTabs")
                else
                    this.props.navigation.navigate('Tabs')
            }
        }
        return (
            <View>
                {this.displayLogInForm()}
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

export default connect(mapStateToProps, { logout, login, authInputChange, retrievePermissions })(Login)