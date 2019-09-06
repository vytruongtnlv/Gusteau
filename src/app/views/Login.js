import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Input } from 'react-native-elements'
import firebase from 'firebase'
import config from '../config';
import { connect } from 'react-redux'
import { login, authInputChange } from '../actions';
import TableListView from './TableListView';
class Login extends Component {
    componentDidMount() {
        firebase.initializeApp(config);
    }
    login() {
        const { email, password } = this.props
        this.props.login({ email, password })
    }
    render() {
        if (JSON.stringify(this.props.user) !== "{}") {
            return (
                <TableListView />
                // <Text>Hello</Text>
            )
        }
        else return (
            <View>
                <Input
                    placeholder="email"
                    onChangeText={text => this.props.authInputChange({ field: 'email', value: text })} />
                <Input
                    placeholder="password"
                    onChangeText={text => this.props.authInputChange({ field: 'password', value: text })}
                    secureTextEntry={true} />
                <TouchableWithoutFeedback
                    onPress={this.login.bind(this)}>
                    <Text> Login </Text>
                </TouchableWithoutFeedback>

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