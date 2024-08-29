import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, IconButton, Button, ButtonGroup, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const ShowStudents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
         dispatch(deleteUser(deleteID, address))
             .then(() => {
                 dispatch(getAllStudents(currentUser._id));
            })
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'CNE', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName.sclassName,
            id: student._id,
        };
    })

    const StudentButtonHaver = ({ row }) => {
        const options = [' Attendance', ' Marks'];
        const [open, setOpen] = useState(false);
        const anchorRef = useRef(null);
        const [selectedIndex, setSelectedIndex] = useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                navigate("/Admin/students/student/attendance/" + row.id)
            } else if (selectedIndex === 1) {
                navigate("/Admin/students/student/marks/" + row.id)
            }
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <ButtonContainer>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <StyledButton
                    onClick={() => navigate("/Admin/students/student/" + row.id)}>
                    View
                </StyledButton>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <StyledButton onClick={handleClick}>{options[selectedIndex]}</StyledButton>
                    <StyledButton
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </StyledButton>
                </ButtonGroup>
                <Popper
                    sx={{
                        zIndex: 1,
                    }}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                disabled={index === 2}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </ButtonContainer>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id, "Students")
        },
    ];

    return (
        <StyledContainer>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <StyledButton onClick={() => navigate("/Admin/addstudents")}>
                                Add Students
                            </StyledButton>
                        </Box>
                        :
                        <StyledPaper>
                            {Array.isArray(studentsList) && studentsList.length > 0 &&
                                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </StyledPaper>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
};

export default ShowStudents;

const StyledContainer = styled.div`
  background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  min-height: 100vh;
  padding: 20px;
  color: white;
`;

const StyledPaper = styled(Paper)`
  background: transparent;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
 background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  color: white;
  &:hover {
    linear-gradient(109.6deg, rgb(11, 132, 145) 11.2%, rgb(0, 0, 0) 91.1%);
  }
`;