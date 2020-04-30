import React from 'react';
import { List, Datagrid, TextField, SimpleForm, Create, TextInput, Edit, NumberField, ReferenceField, DateField } from 'react-admin';

export const QuestionList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="image" />
            <TextField source="answer1" />
            <TextField source="answer2" />
            <TextField source="answer3" />
            <TextField source="answer4" />
            <NumberField source="correct_answer" />
            <ReferenceField source="theme_id" reference="themes"><TextField source="name" /></ReferenceField>
            <DateField source="created_at" />
            <DateField source="updated_at" />
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
  
  export const QuestionEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="answer1"/>
            <TextInput source="answer2"/>
            <TextInput source="answer3"/>
            <TextInput source="answer4"/>
            <TextInput source="correct_answer"/>
            <TextInput source="theme_id"/>
        </SimpleForm>
    </Edit>
  );