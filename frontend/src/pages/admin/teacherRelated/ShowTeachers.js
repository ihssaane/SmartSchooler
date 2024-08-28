import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    if (loading) {
        return <div>Loading...</div>;
    } else if (response) {
        return (
            <ButtonContainer>
                <StyledButton onClick={() => navigate("/Admin/teachers/chooseclass")}>
                    Add Teacher
                </StyledButton>
            </ButtonContainer>
        );
    } else if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
         dispatch(deleteUser(deleteID, address)).then(() => {
            dispatch(getAllTeachers(currentUser._id));
         });
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => {
        return {
            name: teacher.name,
            teachSubject: teacher.teachSubject?.subName || null,
            teachSclass: teacher.teachSclass.sclassName,
            teachSclassID: teacher.teachSclass._id,
            id: teacher._id,
        };
    });

    const actions = [
        {
            icon: <PersonAddAlt1Icon />, name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon />, name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];

    return (
        <StyledContainer>
            <StyledTable>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <StyledTh key={column.id}>
                                {column.label}
                            </StyledTh>
                        ))}
                        <StyledTh>Actions</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <tr key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    if (column.id === 'teachSubject') {
                                        return (
                                            <StyledTd key={column.id}>
                                                {value ? (
                                                    value
                                                ) : (
                                                    <StyledButton
                                                        onClick={() => {
                                                            navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)
                                                        }}>
                                                        Add Subject
                                                    </StyledButton>
                                                )}
                                            </StyledTd>
                                        );
                                    }
                                    return (
                                        <StyledTd key={column.id}>
                                            {value}
                                        </StyledTd>
                                    );
                                })}
                                <StyledTd>
                                    <ButtonContainer>
                                        <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
                                            <PersonRemoveIcon />
                                        </IconButton>
                                        <StyledButton
                                            onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}>
                                            View
                                        </StyledButton>
                                    </ButtonContainer>
                                </StyledTd>
                            </tr>
                        ))}
                </tbody>
            </StyledTable>
            <PaginationContainer>
                <StyledButton onClick={() => setPage(page > 0 ? page - 1 : 0)}>Previous</StyledButton>
                <span>Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}</span>
                <StyledButton onClick={() => setPage(page < Math.ceil(rows.length / rowsPerPage) - 1 ? page + 1 : page)}>Next</StyledButton>
            </PaginationContainer>

            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
};

export default ShowTeachers;

const StyledContainer = styled.div`
  background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  min-height: 100vh;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const StyledButton = styled.button`
  background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const StyledTh = styled.th`
  background-color: #f8f8f8;
  color: #333;
  padding: 15px;
  text-align: left;
  font-weight: bold;
`;

const StyledTd = styled.td`
  padding: 15px;
  border-bottom: 1px solid #f2f2f2;
  color: #333;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 5px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: red;
`;