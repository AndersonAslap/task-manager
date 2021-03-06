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
            
            <Grid container>
                <Grid item xs={4}>
                    <CreateTask />
                </Grid>

                <Grid item xs={8} className={styles.managerTaskGridTable}>
                    <div>
                        <TaskList />
                    </div>          
                </Grid>
            </Grid>

        </Container>
    );
}