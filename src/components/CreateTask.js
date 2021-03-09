import {
    Card,
    CardHeader,
    CardContent,
    FormControl,
    Input,
    InputAdornment,
    Button,
    InputLabel
} from '@material-ui/core';

import {
    Send,
    Assignment
} from '@material-ui/icons';
import { useState } from 'react';

import { Task } from '../models/Task.models';

import styles from '../styles/components/CreateTask.module.css';

export function CreateTask() {

    const [task, setTask] = useState('');

    function handleTask(event) {
        setTask(event.target.value);
    }

    function handleSaveTask(){
        console.log(task);

        const tasksDB = localStorage['tasks'];
        const tasks = tasksDB ? JSON.parse(tasksDB) : [];

        tasks.push(new Task(new Date().getTime(), task, false));

        localStorage['tasks'] = JSON.stringify(tasks);
    }

    return (
        <div className={styles.createTaskCardContainer}>
            <Card>
                <CardHeader title="Cadastre sua tarefa" />

                <CardContent>
                    <FormControl>
                        <InputLabel>Tarefa</InputLabel>
                            
                        <Input 
                            label="With a grid"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Assignment />
                                </InputAdornment>
                            } 
                            onChange={handleTask}
                            value={task}
                        />

                        <br />
                                    
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={styles.managerTaskCardButton}
                            endIcon={<Send />}
                            onClick={handleSaveTask}
                        >
                            Cadastrar
                        </Button>
                    </FormControl>

                </CardContent>
            </Card>
        </div>
    );
}