import React, { Component } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity, } from 'react-native';
class ListScroll extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Anbu',
         },
         {
            id: 1,
            name: 'Jeni',
         },
         {
            id: 2,
            name: 'Preethi',
         },
         {
            id: 3,
            name: 'Nadhini',
         },
         {
            id: 4,
            name: 'jerry',
         },
         {
            id: 5,
            name: 'priya',
         },
         {
            id: 6,
            name: 'divya',
         },
         {
            id: 7,
            name: 'cyril',
         },
         {
            id: 8,
            name: 'ramya',
         },
         {
            id: 9,
            name: 'kavya',
         },
         {
            id: 10,
            name: 'ancy',
         },
         {
            id: 11,
            name: 'Nandy',
         },
         
      ]
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      return (
         <View>
            <ListScroll>
               {
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = {styles.item}>
                        <Text>{item.name}</Text>
                     </View>
                  ))
               }
            </ListScroll>
         </View>
      )
   }
}
export default ListScroll

const styles = StyleSheet.create ({
   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
   }
})