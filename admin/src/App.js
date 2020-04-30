import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';

import AuthProvider from './Providers/AuthProvider';
import Provider from './Providers/DataProvider';

import {QuestionList, QuestionCreate, QuestionEdit} from './Resources/Question';
import {ThemeList, ThemeCreate, ThemeEdit} from './Resources/Theme';

const baseUrl = 'http://localhost:3333';

const dataProvider = Provider(baseUrl);
const authProvider = AuthProvider(baseUrl)

const App = () => (

  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="questions" list={QuestionList} create={QuestionCreate} edit={QuestionEdit}/>
    <Resource name="themes" list={ThemeList} create={ThemeCreate} edit={ThemeEdit}/>
  </Admin>

);

export default App;