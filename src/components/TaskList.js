import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput
} from '@material-ui/core';

import {
  AssignmentTurnedIn,
  Edit,
  Delete,
  Search,
  ArrowBack,
  ArrowForward
} from '@material-ui/icons';


const rows = [
  {name:'Tarefa 1'},
  {name:'Tarefa 2'},
  {name:'Tarefa 3'},
  {name:'Tarefa 4'}
];

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export function TaskList() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell colSpan="2" style={{background:'#000', color:'white'}}>Tarefas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan="2" align="center">
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Pesquisar</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                
                  endAdornment={
                    <InputAdornment position="end">
                      <Search color="primary" />
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </TableCell>
          </TableRow>
          
          {rows.map((task) => (
            <TableRow key={task.name}>
              <TableCell component="th" scope="row">
                {task.name}
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <AssignmentTurnedIn style={{ color: 'rgb(76, 175, 80)' }} />
                </IconButton>
                
                <IconButton>
                  <Edit  style={{ color: '#FFFF00' }} />
                </IconButton>
                
                <IconButton>
                  <Delete color="secondary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan="2" align="center">
             
              <ArrowBack color="primary"/>
              &nbsp; &nbsp;
              <span >
              1 &nbsp; 2 &nbsp; 3&nbsp; 4
              </span>
              &nbsp; &nbsp;
              <ArrowForward color="primary"/>
              
            </TableCell>
          </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer>
  );
}
