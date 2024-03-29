import ListItem from "@mui/material/ListItem";
import {Box, Grid, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import {useContext, useState} from "react";
import {UserContext} from "@/app/providers/user-context";
import {getEnergyConsumption, isChecked} from "@/app/utils/utils-launches";

function Launches({launches} : {launches: Launch[]}) {
    const [checked, setChecked] = useState<string[]>([]);
    const user = useContext(UserContext);

    const toggleCheck = (itemId: string) => {
        if (isChecked(checked, itemId)) {
            setChecked([...checked.filter(id => id !== itemId)]);
        } else {
            setChecked([...checked, itemId]);
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <List dense={true}>
                        {launches.map(launch => <ListItem key={launch.id}>{}
                            <ListItemButton role={undefined} onClick={() => toggleCheck(launch.id)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={isChecked(checked, launch.id)}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': launch.id }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={launch.id} primary={launch.mission_name} />
                            </ListItemButton>
                        </ListItem>)}
                    </List>
                </Grid>
                {!!checked.length && <Grid item xs={8}>
                    <Box
                        height={200}
                        alignItems="center"
                    >
                        <Typography>
                            Estimated energy consumption for the selected launches: {getEnergyConsumption(checked, launches) + '* 10^7 Joules'}
                        </Typography>
                    </Box>
                </Grid>}
            </Grid>
        </>
    );
}

export default Launches;