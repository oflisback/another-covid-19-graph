import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const SettingsPanel = ({ countries, options, toggleCountryEnabled, toggleCumulative, togglePerCapita }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleKeyDown = e => {
      switch (e.keyCode) {
        case 37:
          setOpen(false);
          break;
        case 39:
          setOpen(true);
          break;
        default:
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = e => {
      if (e.clientX < 50 && !open) {
        setOpen(true);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [open]);

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
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      {/* div needed by ClickAwayListener for placing ref */}
      <div>
        <Drawer
          data-testid="settings-panel"
          open={open}
          onClose={() => setOpen(false)}
          transitionDuration={0}
          variant="persistent"
        >
          <div
            style={{
              height: "100vh",
              backgroundColor: "white",
              margin: "15px",
            }}
          >
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
        </Drawer>
      </div>
    </ClickAwayListener>
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
