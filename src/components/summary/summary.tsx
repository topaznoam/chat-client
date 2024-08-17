import React from "react";
import {
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Avatar,
} from "@mui/material";
import { GroupProps } from "../../GlobalContext";
import { SelectChangeEvent } from "@mui/material";
import "./summary.css";
import { getSummery } from "../../api/MessagesApiClient";

const SummarySection: React.FC<{ groups: GroupProps[] }> = ({ groups }) => {
  const [selectedGroup, setSelectedGroup] = React.useState<number | string>("");
  const [summaryData, setSummaryData] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    setSelectedGroup(event.target.value as number);
  };

  const handleSummaryClick = async () => {
    if (selectedGroup) {
      try {
        const summary = await getSummery(selectedGroup as number);
        setSummaryData(summary);
      } catch (error) {
        console.error("Failed to get summary:", error);
      }
    }
  };

  return (
    <Grid className="summarycontainer">
      <Paper className="summarypaper">
        <Grid>
          <Grid className="summaryspacing">
            <Typography variant="h6">
              Do you want to summarize a chat?
            </Typography>
          </Grid>
          <Grid className="summaryspaceing">
            <FormControl className="group">
              <InputLabel id="group-select-label">Group</InputLabel>
              <Select
                labelId="group-select-label"
                id="group-select"
                value={selectedGroup}
                label="Group"
                onChange={handleChange}
              >
                <MenuItem value=""></MenuItem>
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    <Grid className="group">
                      <Avatar src={group.avatar} />
                      <h4>{group.name}</h4>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
              <Grid className="summaryspacing">
                <Button color="secondary" onClick={handleSummaryClick}>
                  Summarize!
                </Button>
              </Grid>
            </FormControl>
          </Grid>
          <Grid className="summaryspaceing">
            <Grid className="datastring">
              <h3>{summaryData}</h3>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SummarySection;
