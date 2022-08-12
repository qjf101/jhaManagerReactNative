import * as React from 'react';
import { View } from 'react-native';
import Button from './Button';

export default function Nav({tab, setTab, setEditJha, setViewJha}) {

  const clearJha = () => {
    setViewJha(null)
    setEditJha(null)
  };

  const handleChange = (t) => {
    setTab(t);
    clearJha();
  };

  const CreateTabSelected = <View style={{flexDirection: 'row'}}>
    <Button width="50%" color="green" onPress={() => handleChange(0)} title="CREATE NEW JHA"/>
    <Button width="50%" color="grey" onPress={() => handleChange(1)} title="VIEW ALL JHAS"/>
  </View>

  const ViewTabSelected = <View style={{flexDirection: 'row'}}>
    <Button width="50%" color="grey" onPress={() => handleChange(0)} title="CREATE NEW JHA"/>
    <Button width="50%" color="green" onPress={() => handleChange(1)} title="VIEW ALL JHAS"/>
  </View>

  const tabs = [CreateTabSelected, ViewTabSelected]

  return (
    <View style={{width: '100%'}}>
        {tabs[tab]}
    </View>
  );
}
