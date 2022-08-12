import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Nav from './components/Nav';
import JhaTable from './components/JhaTable';
import CreateJHA from './components/CreateJHA';
// import ViewJHA from './components/viewJHA';
import { useState } from 'react';

export default function App() {
  const [tab, setTab] = useState(0);
  const [editJha, setEditJha] = useState(null);
  const [viewJha, setViewJha] = useState(null);

  return (
    <>
    <Header/>
    <Nav tab={tab} setTab={setTab} setEditJha={setEditJha} setViewJha={setViewJha}/>
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* { viewJha ?
      <ViewJHA viewJha={viewJha}/>: */}
      <>
      { !tab ?
      <CreateJHA editJha={editJha} setTab={setTab}/> :
      <JhaTable setEditJha={setEditJha} setTab={setTab} setViewJha={setViewJha}/>
      }
      </>
      {/* }  */}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 15,
    flex: 1,
    backgroundColor: '#fff'
  },
});
