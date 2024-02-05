import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, Linking, Alert } from 'react-native';
 
class Contact extends PureComponent {
  /**
   *  拨打电话
   * @param {string} phone 版本号
   * @example
   * call('18888888888')
   */
  call = (phone:any) => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          return Alert.alert('提示', `您的设备不支持该功能，请手动拨打 ${phone}`, [
            { text: '确定' }
          ]);
        }
        return Linking.openURL(url);
      })
      .catch();
  };
 
  callMerchant = () => {
    this.call('15598804679');
  };
 
  render() {
    return (
      <TouchableOpacity onPress={this.callMerchant}>
        <Text>联系商家</Text>
      </TouchableOpacity>
    );
  }
}
 
export default Contact;