import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import RNFS from "react-native-fs";
import FileViewer from 'react-native-file-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDistance, parseISO } from 'date-fns';
import api from '../../services/api';
import styles from './styles';
import socket from "socket.io-client";

import pt from 'date-fns/locale/pt'

export default class Box extends Component {

    state = {
        box: {}
    }

    async componentDidMount() {
        const id = await AsyncStorage.getItem('@rocketbox:box');
        this.subscribeToNewFiles(id);
        const { data } = await api.get(`boxes/${id}`);
        this.setState({ box: data });
    }

    subscribeToNewFiles = box => {
        const io = socket("http://192.168.0.103:3333");

        io.emit("connectRoom", box);

        io.on("file", data => {
            this.setState({
                box: { ...this.state.box, files: [data, ...this.state.box.files] }
            });
        });
    };

    renderItem = ({ item }) => (
        <TouchableOpacity
        style={styles.file}
        onPress={() => this.openFile(item)}
        >
            <View style={styles.fileInfo}>
                <Icon name="insert-drive-file" size={24} color="#a5cfff" />
                <Text style={styles.fileTitle}>{item.title}</Text>
            </View>
            <Text style={styles.fileDate}>
                há {formatDistance(parseISO(item.createdAt), new Date(), { locale: pt })}
            </Text>
        </TouchableOpacity>
    )

    openFile = async file => {
        try {
            const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;
            await RNFS.downloadFile({
                fromUrl: file.url,
                toFile: filePath
            });

            await FileViewer.open(filePath);
        } catch (error) {
            console.log("arquivo nao suportado");
        }
    };

    handleUpload = () => {
        ImagePicker.launchImageLibrary({}, async upload => {
          
            if (!upload.error || !upload.didCancel) {

                const data = new FormData();
            
                const [prefix, suffix] = upload.fileName.split(".");
                const ext = suffix.toLocaleLowerCase() == "heic" ? "jpg" : suffix;

                data.append("file", {
                    uri: upload.uri,
                    type: upload.type,
                    name: `${prefix}.${ext}`
                });

                try {
                    await api.post(`boxes/${this.state.box._id}/files`, data);
                } catch (error) {
                    // Network Error
                    console.error(error);
                }
            }
        });
    };
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.boxTitle}>
                    {this.state.box.title}
                </Text>
                <FlatList 
                    style={styles.list}
                    keyExtractor={file => file._id}
                    data={this.state.box.files}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={this.renderItem}
                />
                <TouchableOpacity style={styles.fab} onPress={this.handleUpload}>
                    <Icon name="cloud-upload" size={24} color="#fff"/>
                </TouchableOpacity>
            </View>
        )
    }
}