import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import {RkComponent} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';

export class Avatar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let avatar;
    if (this.props.image) {
      avatar = <Image style={styles.imageStyle} source={this.props.image}/>
    } else {
      let firstLetter = this.props.name[0];
      avatar = <Text style={styles.altText}>{firstLetter}</Text>
    }
    return (
      <View>
        {avatar}
      </View>
    )
  }
}

const styles = {
  altText: {
    backgroundColor: '#C0C0C0',
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 20,
    textAlignVertical: 'center',
    marginRight: 5
  },
  image: {
    backgroundColor: '#C0C0C0',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5
  }
}