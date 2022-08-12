import * as React from 'react';
import { View, Text } from 'react-native';

export default function Header() {
  return (
    <View style={{
      backgroundColor: "blue",
      height: 100,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{fontSize: 18, color: 'white', paddingTop: 30}}>Acme Widgets - JHA Manager</Text>
    </View>
  );
}
