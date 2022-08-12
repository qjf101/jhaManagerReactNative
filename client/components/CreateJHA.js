import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Button from './Button';
import {SERVER_IP} from '@env';

export default function CreateJHA({editJha, setTab}) {
  const tempJHA = {
    site: '',
    dept: '',
    ap: '',
    br: '',
    job: '',
    supervisor: '',
    prepared: '',
    date: '',
    steps: [{s: 'add task/step', h: ['add a hazard and consequence'], c: ['add a control']}],
    training: ['add required training'],
    ppe: ['add required PPE']
  };

  const [jha, setJha] = useState();
  const [site, setSite] = useState('');
  const [dept, setDept] = useState('');
  const [ap, setAp] = useState('');
  const [br, setBr] = useState('');
  const [job, setJob] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [prepared, setPrepared] = useState('');
  const [date, setDate] = useState('');
  const [steps, setSteps] = useState(tempJHA.steps);
  const [training, setTraining] = useState();
  const [ppe, setPpe] = useState();

  const getJha = () => {
    //if Jha exists
    if (editJha) {
      const getJha = async () => {
        try {
          const res = await axios.get(SERVER_IP+`/api/jhas/${editJha}`);
          const prevJHA = res.data;
          setJha(prevJHA);
          setSite(prevJHA.site);
          setDept(prevJHA.dept);
          setAp(prevJHA.ap);
          setBr(prevJHA.br);
          setJob(prevJHA.job);
          setSupervisor(prevJHA.supervisor);
          setPrepared(prevJHA.prepared);
          setDate(prevJHA.date);
          setSteps(JSON.parse(prevJHA.steps));
          setTraining(JSON.parse(prevJHA.training));
          setPpe(JSON.parse(prevJHA.ppe));
        } catch (err) {console.log(err)}
      };
      getJha();
    } else {
      setJha(tempJHA);
      setSite(tempJHA.site);
      setDept(tempJHA.dept);
      setAp(tempJHA.ap);
      setBr(tempJHA.br);
      setJob(tempJHA.job);
      setSupervisor(tempJHA.supervisor);
      setPrepared(tempJHA.prepared);
      setDate(tempJHA.date);
      setSteps(tempJHA.steps);
      setTraining(tempJHA.training);
      setPpe(tempJHA.ppe);
    }
  };
  
  useEffect(() => {
    getJha();
  }, []);

  const addListItem = (list, step) => {
    const newSteps = [...steps];
    steps[step][list].push(tempJHA.steps[step][list][0]);
    setSteps(newSteps);
  };

  const removeItem = (list, step) => {
    const newSteps = [...steps];
    newSteps[step][list].pop();
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, tempJHA.steps[0]])
  };

  const removeStep = () => {
    setSteps([...steps].splice(0, steps.length-1))
  };

  const updateSteps = (step, item, v) => {
    const newSteps = [...steps];
    if (item === 's') {
      newSteps[step]['s'] = v;
      setSteps(newSteps);
    } else {
      newSteps[step][item] = v;
      setSteps(newSteps);
    }
  };

  const updateJha = async (savedJHA) => {
    try {
      axios.put(SERVER_IP+`/api/jhas/${editJha}`, savedJHA);
      console.log(`jha: ${editJha} updated`)
    } catch (err) {
      console.log(err)
    }
  };

  const createJha = async (savedJHA) => {
    try {
      axios.post(SERVER_IP+`/api/jhas`, savedJHA);
      console.log(`jha created`)
    } catch (err) {
      console.log(err)
      console.log('blah')
    }
  };

  const save = () => {
    const savedJHA = {
      site,
      dept,
      ap,
      br,
      job,
      supervisor,
      prepared,
      date,
      steps: JSON.stringify(steps),
      training: JSON.stringify(training),
      ppe: JSON.stringify(ppe)
    };

    if (editJha) {
      updateJha(savedJHA)
    } else {
      createJha(savedJHA)
    };

    setTab(1);
  };

  return (
    <View>
      <Text>Create/Edit JHA</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSite}
        value={site}
        placeholder="Site"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDept}
        value={dept}
        placeholder="Department"
      />
      <TextInput
        style={styles.input}
        onChangeText={setAp}
        value={ap}
        placeholder="Activity or Process"
      />
      <TextInput
        style={styles.input}
        onChangeText={setBr}
        value={br}
        placeholder="Building/Room"
      />
      <TextInput
        style={styles.input}
        onChangeText={setJob}
        value={job}
        placeholder="Job Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={setSupervisor}
        value={supervisor}
        placeholder="Supervisor"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPrepared}
        value={prepared}
        placeholder="Prepared By"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDate}
        value={date}
        placeholder="Date"
      />
      <Button onPress={() => save()} title="SAVE" color="blue" width="50%" extraStyles={{marginLeft: 10, borderRadius: 5}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
});
