import {
    Container,
    Grid
} from '@material-ui/core';


import { CreateTask } from './CreateTask';
import { TaskList } from './TaskList';

import styles from '../styles/components/ManagerTask.module.css';

export function ManagerTask() {
    return ( 
        <Container maxWidth="md" className={styles.managerTaskContainer}>
            
            <Grid container className={styles.manageTasksItemsContainer}>
                <Grid item xs={4} >
                    <CreateTask />
                </Grid>

                <Grid item xs={1}>&nbsp;  </Grid>
                
                <Grid item xs={7}>
                    <TaskList />  
                </Grid>
            </Grid>

        </Container>
    );
}