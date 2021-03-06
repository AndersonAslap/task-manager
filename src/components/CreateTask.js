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

import styles from '../styles/components/CreateTask.module.css';

export function CreateTask() {

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
                        />

                        <br />
                                    
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={styles.managerTaskCardButton}
                            endIcon={<Send />}
                        >
                            Cadastrar
                        </Button>
                    </FormControl>

                </CardContent>
            </Card>
        </div>
    );
}