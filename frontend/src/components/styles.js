import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
} from "@mui/material";

const drawerWidth = 240;


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark, // Darker primary color for header
        color: theme.palette.common.white,
        fontWeight: 'bold', // Bold font for headers
        borderBottom: `2px solid ${theme.palette.primary.main}`, // Bottom border for header
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: '0.875rem', // Adjusted font size
        color: theme.palette.text.primary, // Text color for body cells
        padding: '12px 16px', // Increased padding
        borderBottom: `1px solid ${theme.palette.divider}`, // Bottom border for body cells
        '&:hover': {
            backgroundColor: theme.palette.action.hover, // Background color on hover
        },
    },
}));


export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Light background for odd rows
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.paper, // Slightly different background for even rows
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected, // Highlight row on hover
    },
    // Hide border for last row
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Custom styled AppBar with updated styles
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.main,  // Set primary color background
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Added shadow for elevation effect
    transition: theme.transitions.create(['width', 'margin', 'background-color'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        backgroundColor: theme.palette.primary.dark,  // Change background color when open
        transition: theme.transitions.create(['width', 'margin', 'background-color'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Custom styled Drawer with updated styles
export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,  // Set drawer background color
            borderRight: `1px solid ${theme.palette.divider}`,  // Added a right border
            boxShadow: open ? '2px 0 5px rgba(0, 0, 0, 0.2)' : 'none',  // Drawer shadow
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
