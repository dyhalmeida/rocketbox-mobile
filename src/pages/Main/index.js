import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import logo from '../../assets/logo.png';

import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class Main extends Component {

    state = {
        boxName: ''
    }

    async componentDidMount() {
        const box = await AsyncStorage.getItem("@rocketbox:box");
        if (box) {
            this.props.navigation.navigate("Box");
        }
    }

    handleSignIn = async () => {
        const { data } = await api.post('boxes', { title: this.state.boxName });
        await AsyncStorage.setItem("@rocketbox:box", data._id);
        this.props.navigation.navigate("Box");
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={logo} />
                <TextInput 
                    style={styles.input}
                    placeholder="Crie um box"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    value={this.state.boxName}
                    onChangeText={text => this.setState({ boxName: text })}
                />
                <TouchableOpacity
                    onPress={this.handleSignIn}
                    style={styles.button}
                >
                    <Text style={styles.buttonText} >Criar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}