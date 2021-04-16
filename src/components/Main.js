import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { TimePicker } from "@material-ui/pickers";
import CircularProgress from '@material-ui/core/CircularProgress';

import API from '../api/api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    paddingTop: '20px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  fields: {
    margin: theme.spacing(3),
  },
}));

const UTC = [
    '-11',
    '-10',
    '-8',
    '-7',
    '-6',
    '-5',
    '-4',
    '-3',
    '-2.5',
    '-2',
    '-1',
    '+0',
    '+1',
    '+2',
    '+3',
    '+4',
    '+4.5',
    '+5',
    '+5.5',
    '+5.75',
    '+6',
    '+6.5',
    '+7',
    '+8',
    '+9',
    '+9.5',
    '+10',
    '+11',
    '+12',
    '+13',
];

export default function Main() {
  const classes = useStyles();
  const [utcSelected, setUtcSelected] = useState("+0");
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resp, setResp] = useState("");

  const handleChangeUTC = (event) => {
    setUtcSelected(event.target.value);
  };

  const submit = () => {
    setLoading(true);

    API.post(`/TutenBack2/time/timezone/obtain`, {
        dato1: time.toLocaleTimeString('it-IT'),
        dato2: utcSelected
    }).then((response) => {
        setResp(response.data.response.time);
        setLoading(false);
        setError(false);
    }).catch((error) => {
        //console.log(error);
        setLoading(false);
        setError(true);
    });

  };

  return (
    <div className={classes.root}>
        <Typography className={classes.title} variant="h3" gutterBottom> 
            Convertidor TimeZone <LanguageIcon fontSize="large"/>
        </Typography>
        <Grid className={classes.fields} container justify="center" spacing={3}>
            <Grid item xs={3}>
                <TimePicker
                    ampm={false}
                    showTodayButton
                    todayLabel="Ahora"
                    openTo="hours"
                    views={["hours", "minutes", "seconds"]}
                    format="HH:mm:ss"
                    label="Hora"
                    value={time}
                    onChange={setTime}
                />
            </Grid>
            <Grid item xs={3}>
                <InputLabel id="utc">UTC</InputLabel>
                <Select
                    labelId="utc"
                    id="simple-utc"
                    value={utcSelected}
                    onChange={handleChangeUTC}
                >
                    {UTC.map((utc) => (
                        <MenuItem key={utc} value={utc}>
                            {utc}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
            <Button className={classes.button} variant="contained" color="primary" onClick={submit}>
                {loading ? <CircularProgress color="secondary" size="2em"/> : "Calcular"}
            </Button>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={3}>
                <Paper className={classes.paper}>{error ? "Error al conectar con el servicio" : `Resultado= ${resp}`}</Paper>
            </Grid>
        </Grid>
    </div>
  );
}
