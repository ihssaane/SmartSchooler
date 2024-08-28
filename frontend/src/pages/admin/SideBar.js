import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Importing icons from Material-UI
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AssignmentIcon from '@mui/icons-material/Assignment'; // Importing AssignmentIcon
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; // Importing AccountCircleOutlinedIcon
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const SideBar = () => {
    const location = useLocation();

    return (
        <>
            <React.Fragment>
                <CustomListItemButton component={Link} to="/" selected={location.pathname === ("/" || "/Admin/dashboard")}>
                    <ListItemIcon>
                        <DashboardIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </CustomListItemButton>
                <CustomListItemButton component={Link} to="/Admin/classes" selected={location.pathname.startsWith('/Admin/classes')}>
                    <ListItemIcon>
                        <SchoolIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                </CustomListItemButton>
                <CustomListItemButton component={Link} to="/Admin/subjects" selected={location.pathname.startsWith('/Admin/subjects')}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </CustomListItemButton>
                <CustomListItemButton component={Link} to="/Admin/teachers" selected={location.pathname.startsWith('/Admin/teachers')}>
                    <ListItemIcon>
                        <GroupIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </CustomListItemButton>
                <CustomListItemButton component={Link} to="/Admin/students" selected={location.pathname.startsWith('/Admin/students')}>
                    <ListItemIcon>
                        <PersonIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </CustomListItemButton>
                <CustomListItemButton component={Link} to="/Admin/notices" selected={location.pathname.startsWith('/Admin/notices')}>
                    <ListItemIcon>
                        <AnnouncementIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Announcement" />
                </CustomListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            <React.Fragment>
                <ListSubheader component="div" inset sx={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: '1px' }}>
                    User
                </ListSubheader>
                <CustomListItemButton component={Link} to="/Admin/profile" selected={location.pathname.startsWith('/Admin/profile')}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
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
    borderRadius: '8px', /* Rounded corners */
    marginBottom: '8px', /* Space between items */
    background: selected ? 'linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)' : 'inherit', /* Gradient background for selected items */
    color: selected ? theme.palette.primary.contrastText : 'inherit', /* Text color for selected items */
    '& .MuiListItemIcon-root': {
        color: selected ? theme.palette.primary.contrastText : 'inherit', /* Icon color for selected items */
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover, /* Hover background color */
        color: theme.palette.primary.main, /* Text color on hover */
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main, /* Icon color on hover */
        },
    },
}));

export default SideBar;
