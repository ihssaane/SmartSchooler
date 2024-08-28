import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import styled from 'styled-components';
import { Typography, ButtonGroup, Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import TableChartIcon from '@mui/icons-material/TableChart';

const TeacherClassDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);

    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`)
            } else if (selectedIndex === 1) {
                navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`)
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
            <ButtonGroup variant="contained" ref={anchorRef}>
                <StyledButton onClick={handleClick}>{options[selectedIndex]}</StyledButton>
                <StyledButton
                    size="small"
                    onClick={handleToggle}
                >
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </StyledButton>
                <Popper
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
            </ButtonGroup>
        );
    };

    return (
        <StyledContainer>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <SectionTitle variant="h4" align="center" gutterBottom>
                        Students
                    </SectionTitle>
                    {getresponse ? (
                        <Typography variant="body1" align="center">
                            No Students Found
                        </Typography>
                    ) : (
                        <StyledPaper>
                            <SectionTitle variant="h5" gutterBottom>
                                Students List:
                            </SectionTitle>

                            {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                                <StyledTable>
                                    <thead>
                                        <tr>
                                            {studentColumns.map((column) => (
                                                <th key={column.id}>{column.label}</th>
                                            ))}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentRows.map((row) => (
                                            <tr key={row.id}>
                                                {studentColumns.map((column) => (
                                                    <td key={column.id}>{row[column.id]}</td>
                                                ))}
                                                <td>
                                                    <StudentsButtonHaver row={row} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </StyledTable>
                            )}
                        </StyledPaper>
                    )}
                    <ButtonContainer>
                        <StyledButton>
                            <TableChartIcon />
                            Table
                        </StyledButton>
                    </ButtonContainer>
                </>
            )}
        </StyledContainer>
    );
};

export default TeacherClassDetails;

const StyledContainer = styled.div`
  background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  min-height: 100vh;
  padding: 20px;
  color: white;
`;

const StyledPaper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const SectionTitle = styled(Typography)`
  color: white;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: rgba(255, 255, 255, 0.1);
  }

  tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  &.MuiButton-root {
    background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
    color: white;
    display: flex;
    align-items: center;
    gap: 5px;
    
    &:hover {
      background: linear-gradient(109.6deg, rgb(11, 132, 145) 11.2%, rgb(0, 0, 0) 91.1%);
    }
  }
`;