import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error)
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
     dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
       })
  }

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Add Students & Subjects">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <h5>Add</h5>
              <SpeedDialIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: styles.styledPaper,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action, index) => (
            <MenuItem key={index} onClick={action.action}>
              <ListItemIcon fontSize="small">
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <StyledContainer>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {getresponse ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <StyledButton onClick={() => navigate("/Admin/addclass")}>
                Add Class
              </StyledButton>
            </Box>
          ) : (
            <>
              <ClassGrid>
                {Array.isArray(sclassesList) && sclassesList.length > 0 && sclassesList.map((sclass) => (
                  <ClassCard key={sclass._id}>
                    <ClassName>{sclass.sclassName}</ClassName>
                    <ButtonContainer>
                      <IconButton onClick={() => deleteHandler(sclass._id, "Sclass")} color="secondary">
                        <DeleteIcon color="error" />
                      </IconButton>
                      <StyledButton onClick={() => navigate("/Admin/classes/class/" + sclass._id)}>
                        View
                      </StyledButton>
                      <ActionMenu 
                        actions={[
                          { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + sclass._id) },
                          { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + sclass._id) },
                          
                        ]} 
                      />
                    </ButtonContainer>
                  </ClassCard>
                ))}
              </ClassGrid>
              <SpeedDialTemplate actions={actions} />
            </>
          )}
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }
}

const StyledContainer = styled.div`
  background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  min-height: 100vh;
  padding: 20px;
  color: white;
`;

const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const ClassCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const ClassName = styled.h3`
  color: white;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 10px;
`;

const StyledButton = styled.button`
  background: linear-gradient(109.6deg, rgb(11, 132, 145) 11.2%, rgb(0, 0, 0) 91.1%);
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
    background: linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);
  }
`;