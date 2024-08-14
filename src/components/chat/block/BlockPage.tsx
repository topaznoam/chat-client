import { Grid, Paper, Typography } from "@mui/material";
import { BLOCK_MESSAGE } from "../../../Constants";
import LockIcon from "@mui/icons-material/Lock";

const BlockPage: React.FC = () => {
  return (
    <Grid>
      <Paper>
        <Grid container>
          <Typography variant="h5" className="messageText">
            {BLOCK_MESSAGE}
          </Typography>

          <LockIcon></LockIcon>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default BlockPage;
