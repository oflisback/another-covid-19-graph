import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const SettingsPanel = ({ countries, options, toggleCountryEnabled, toggleCumulative, togglePerCapita }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  return (
    <div
    style={{
        borderRight: '1px solid lightgray',
        height: "100vh",
        backgroundColor: "white",
        padding: "15px",
        maxWidth: '200px',
        width: '200px'
    }}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Countries</FormLabel>
        <FormGroup>
          {countries.map(country => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={country.enabled}
                  onChange={e => toggleCountryEnabled(country.name)}
                  name={country.name}
                />
              }
              key={country.name}
              label={country.name}
           />
          ))}
        </FormGroup>
        <FormLabel component="legend">Options</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={options.cumulative}
                onChange={() => toggleCumulative()}
                name="Cumulative"
              />
            }
            key="cumulative"
            label="Cumulative"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={options.perCapita}
                onChange={() => togglePerCapita()}
                name="Cumulative"
              />
            }
          key="perCapita"
          label="Per 100k inhabitants"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

SettingsPanel.propTypes = {
  countries: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  toggleCountryEnabled: PropTypes.func.isRequired,
  toggleCumulative: PropTypes.func.isRequired,
  togglePerCapita: PropTypes.func.isRequired
};

export default SettingsPanel;
