import React, { Component } from 'react';
import { View, Text, ToastAndroid, PermissionsAndroid } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Button from '../components/Button';
import RNFS from "react-native-fs"
const file_path = RNFS.CachesDirectoryPath
import CameraRoll from "@react-native-community/cameraroll";
import { otherInput, updateData } from '../actions';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
class CustomerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busy: true,
      imageSaved: false,
      qrcodeData: "",
      qrcode: "",
      created: false,
    };
    this.svg = "";
  }

  componentDidMount() {
    this.requestReadPermission()
    this.requestWritePermission()
  }

  async requestReadPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Read File Permission',
          message:
            'App needs access to your storage' +
            'so you can read QR code.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can read file');
      } else {
        console.log('Read File permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async requestWritePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write File Permission',
          message:
            'App needs access to your storage ' +
            'so you can store QR Code.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can write file');
      } else {
        console.log('Write File permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  getDataURL() {
    this.svg.toDataURL((data) => {
      this.setState({ qrcode: data })
    })
  }

  saveQrToDisk() {
    const name = "0702912029";
    this.svg.toDataURL((data) => {
      RNFS.writeFile(`${file_path}/${name}.png`, data, 'base64')
        .then((success) => {
          return CameraRoll.saveToCameraRoll(`${file_path}/${name}.png`, 'photo')
        })
        .then(() => {
          this.setState({ busy: false, imageSaved: true })
          ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
        })
    })
  }

  addNewCustomer = () => {
    return (
      <Input
        placeholder="Số điện thoại"
        onChangeText={text => this.props.otherInput({ field: 'text', value: text })}
      />
    )
  }

  createNewQRCode() {
    this.setState({
      created: true
    })
    this.getDataURL;
  }

  async acceptToCreate() {
    () => this.getDataURL();
    const value = {
      tel: this.props.text,
      score: 0,
      qrcode: this.state.qrcode
    }
    const item = {
      key: "members",
      value: value
    }
    this.props.updateData(item)

  }


  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%" }}>
        <Input
          placeholder="Số điện thoại"
          onChangeText={text => this.props.otherInput({ field: 'text', value: text })}
        />
        <Button title="Tạo mã QR" onPress={() => this.createNewQRCode()} />
        {this.state.created &&
          <View>
            <QRCode
              value={this.props.text}
              size={200}
              backgroundColor="white"
              getRef={(c) => (this.svg = c)}
            />
            <View style={{ marginTop: 10 }}>
              <Button title="Xác nhận" onPress={() => this.acceptToCreate()} />
              <Button title="Show" onPress={() => this.getDataURL()} />
              <Button title="Save" onPress={() => this.saveQrToDisk()} />
            </View>
          </View>}


      </View>

    );
  }
}

const mapStateToProps = state => {
  return {
    text: state.other.text
  }
}

export default connect(mapStateToProps, { otherInput, updateData })(CustomerView)
