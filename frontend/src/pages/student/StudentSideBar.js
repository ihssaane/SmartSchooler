import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();

    return (
        <>
            <React.Fragment>
                <CustomListItemButton component={Link} to="/" selected={location.pathname === ("/" || "/Student/dashboard")}>
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Student/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </CustomListItemButton>
                <CustomListItemButton component={Link} to="/Student/subjects" selected={location.pathname.startsWith('/Student/subjects')}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Student/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </CustomListItemButton>
                <CustomListItemButton component={Link} to="/Student/attendance" selected={location.pathname.startsWith('/Student/attendance')}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Student/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                </CustomListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            <React.Fragment>
                <ListSubheader component="div" inset sx={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: '1px' }}>
                    User
                </ListSubheader>
                <CustomListItemButton component={Link} to="/Student/profile" selected={location.pathname.startsWith('/Student/profile')}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Student/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </CustomListItemButton>
                <CustomListItemButton component={Link} to="/logout" selected={location.pathname.startsWith('/logout')}>
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </CustomListItemButton>
            </React.Fragment>
        </>
    );
}

const CustomListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
    borderRadius: '8px',
    marginBottom: '8px',
    background: selected ? 'linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)' : 'inherit',
    color: selected ? theme.palette.primary.contrastText : 'inherit',
    '& .MuiListItemIcon-root': {
        color: selected ? theme.palette.primary.contrastText : 'inherit',
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.primary.main,
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
    },
}));

export default StudentSideBar;