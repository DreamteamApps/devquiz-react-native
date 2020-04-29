import React from 'react';
import { Admin, Resource, ListGuesser, List, Datagrid, TextField, SimpleForm, Create, TextInput } from 'react-admin';

import AuthProvider from './AuthProvider';
import Provider from './DataProvider';

const baseUrl = 'http://localhost:3333';

const dataProvider = Provider(baseUrl);
const authProvider = AuthProvider(baseUrl)

const App = () => (

  <Admin dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>

    <Resource name="questions" list={QuestionList} create={QuestionCreate}/>
    <Resource name="themes" list={ListGuesser} />

  </Admin>

);

export const Dashboard = (props) => (
  <div>
    <h1>dashboard</h1>
  </div>
);

export const QuestionList = (props) => (
  <List {...props}>
      <Datagrid>
          <TextField source="id" />
          <TextField source="title" />
          <TextField source="answer1" />
      </Datagrid>
  </List>
);

export const QuestionCreate = (props) => (
  <Create {...props}>
      <SimpleForm>
          <TextInput source="title" />
          <TextInput source="answer1"/>
          <TextInput source="answer2"/>
          <TextInput source="answer3"/>
          <TextInput source="answer4"/>
          <TextInput source="correct_answer"/>
          <TextInput source="theme_id"/>

      </SimpleForm>
  </Create>
);

export default App;