import React from 'react';
import { List, Datagrid, TextField, SimpleForm, Create, TextInput, Edit, NumberField, ReferenceField, DateField } from 'react-admin';

export const ThemeList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);

export const ThemeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

export const ThemeEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);