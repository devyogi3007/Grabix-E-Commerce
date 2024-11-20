import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@mui/material";

export default function ControlledRadioButtonsGroup({
  options = [],
  setValue,
  value,
  header,
  getLabel,
  valueId,
  modalOprator
}) {
  //   const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <p
        id="demo-controlled-radio-buttons-group"
        className="font-bold text-black border-b"
      >
        {header}
      </p>
      <div className="my-3">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value[valueId]}
            onChange={handleChange}
          >
            {options.map((option) => {
              return (
                <FormControlLabel
                  value={option[valueId]}
                  control={
                    <Radio onClick={() => modalOprator((prev) => !prev)} />
                  }
                  label={getLabel(option)}
                  key={option.id}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
}
