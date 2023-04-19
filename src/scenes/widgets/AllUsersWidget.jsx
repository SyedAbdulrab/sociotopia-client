import React, { useState,useEffect  } from 'react'
import { Box,Typography,useTheme } from '@mui/material'
import Friend from '../../components/Friend'
import { useSelector } from 'react-redux'
import WidgetWrapper from '../../components/WidgetWrapper'


const AllUsersWidget = () => {
    const [allUsers, setAllUsers] = useState()
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const { palette } = useTheme();

    const getAllUsers = async () => {
        const response = await fetch(`http://localhost:3001/users`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setAllUsers(data)
    }

    useEffect(()=>{
        getAllUsers();
    },[])

    if (!allUsers){
        return null
    }


  return (
   <WidgetWrapper>
    <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{mb:"1.5rem"}}
    >
        All Users
    </Typography>
    <Box flexDirection={'column'} display={'flex'} gap={'1.5rem'}>
        {allUsers.map((user) => (
            <Friend 
                key={user._id}
                name={`${user.firstName} ${user.lastName}`}
                friendId={user._id}
                subtitle={user.occupation}
                userPicturePath={user.picturePath}
            />
        ))}
    </Box>
   </WidgetWrapper>
  )
}

export default AllUsersWidget