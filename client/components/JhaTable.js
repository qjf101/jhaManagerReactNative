import * as React from 'react';
import { useEffect, useState } from 'react';
import DeleteModal from './DeleteModal';
import axios from "axios";
import { View, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import {SERVER_IP} from '@env';

export default function JhaTable({setEditJha, setTab, setViewJha}) {
    const [jhas, setJhas] = useState([]);

    useEffect(() => {
        const getJhas = async () => {
          try {
            const res = await axios.get(SERVER_IP+'/api/jhas');
            setJhas(res.data);
          } catch (err) {console.log(err)}
        };
        getJhas();
    }, []);

    const handleEdit = (id) => {
        setEditJha(id)
        setTab(0)
    };

    const tableHead = ['Job', 'Dept', 'Author', 'Actions'];

    return (
        <View style={{paddingRight: 15}}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                {jhas.map((jha, i) => {
                    const {job, dept, prepared, id} = jha;
                    const tableData = [job, dept, prepared, <DeleteModal id={id} setJhas={setJhas}/>];
                    return (
                        <Row data={tableData} style={styles.row} textStyle={styles.text} key={i}/>
                    )
                })}
            </Table>
        </View>
    );
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff' },
    row: {minHeight: 50},
    text: { margin: 6 }
});
