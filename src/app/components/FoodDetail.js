import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../style';

export default class FoodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { id, idCategory, food } = this.props
    return (
      <TouchableOpacity style={{ flexDirection: 'row', width: "100%", marginLeft: 5, marginRight: 5, marginVertical: 5, }}
        onLongPress={() => this.props.navigation.navigate("FoodInputForm", { id, idCategory, food })}
      >
        <View style={{ flex: 1, marginRight: "4%" }}>
          <Image
            style={styles.foodImg}
            source={{ uri: food["photos"][0]["value"] }} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 16 }}>{food["name"]}</Text>
          {food["description"] == "" ? false : true &&
            <Text style={{ fontSize: 14, fontStyle: 'italic' }}>{food["description"]}</Text>
          }
          <Text style={{ fontSize: 16 }}>{food["price"]["value"]}đ</Text>
        </View>

      </TouchableOpacity>
    );
  }
}
