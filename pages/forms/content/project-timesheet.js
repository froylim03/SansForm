import React, { useState } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const subjectOption = require("../../../json/subject-options.json");
const activityOption = require("../../../json/activity-options.json");
const allowanceOption = require("../../../json/activity-options.json");
const companyOption = require("../../../json/company-options.json");

export default function Form() {
  React.useEffect(() => {
    setShowForm(false);
  }, []);

  const [startDate, setStartDate] = useState(dayjs());
  const [finishDate, setFinishDate] = useState(dayjs());
  const [hourBreak, setHour] = useState();
  const [minuteBreak, setMinute] = useState();
  const [toast, setToast] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState();

  const Subject = () => {
    return (
      <div>
        <br />
        <label>Select Subject</label>
        <p>{`Please select the item you completing "Project Timesheet" for:`}</p>
        <Autocomplete
          disablePortal
          options={subjectOption}
          sx={{ width: 300 }}
          value={subject}
          onChange={(event, newValue) => {
            setSubject(newValue);
            setShowForm(true);
          }}
          renderInput={(params) => (
            <TextField {...params} required placeholder="Select Subject" />
          )}
        />
      </div>
    );
  };

  const timeLimitEvent = (event) => {
    return Math.max(
      event.target.min,
      Math.min(event.target.max, Number(event.target.value))
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setToast(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast(false);
  };

  return (
    <>
      {!showForm ? (
        <Subject />
      ) : (
        <form onSubmit={handleSubmit}>
          <br />
          <label>{subject}</label>
          <br /><br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <label>Start</label>
            <div>
              <DateTimePicker
                required
                renderInput={(params) => <TextField {...params} required />}
                value={startDate}
                selected={startDate}
                onChange={setStartDate}
              />
            </div>
            <br />
            <label>Finish</label>
            <div>
              <DateTimePicker
                required
                renderInput={(params) => <TextField {...params} required />}
                value={finishDate}
                selected={finishDate}
                onChange={setFinishDate}
              />
            </div>
          </LocalizationProvider>
          <br />
          <label>Break</label>
          <div>
            <TextField
              type="number"
              style={{ width: "150px", marginRight: "10px" }}
              placeholder="Hour"
              InputProps={{ inputProps: { min: 0, max: 23 } }}
              value={hourBreak}
              onChange={(e) => setHour(timeLimitEvent(e))}
            />
            <TextField
              style={{ width: "150px" }}
              placeholder="Minutes"
              InputProps={{ inputProps: { min: 0, max: 59 } }}
              type="number"
              value={minuteBreak}
              onChange={(e) => setMinute(timeLimitEvent(e))}
            />
          </div>
          <br />
          <label>Work Activity</label>
          <Autocomplete
            required
            disablePortal
            label="Search from items"
            options={activityOption}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} required placeholder="Search from items" />
            )}
          />
          <br />
          <label>Allowances</label>
          <Autocomplete
            disablePortal
            options={allowanceOption}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Search from items" />
            )}
          />

          <br />
          <label>Note</label>
          <div>
            <TextField required type="text" placeholder="Insert here" />
          </div>

          <br />
          <label>Company</label>
          <Autocomplete
            disablePortal
            options={companyOption}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} required placeholder="Search from items" />
            )}
          />
          <br />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
          <Snackbar
            open={toast}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Form will be available offline."
          />
        </form>
      )}
    </>
  );
}
