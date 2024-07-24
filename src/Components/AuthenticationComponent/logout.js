import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, ButtonGroup, Button, Typography, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../Service";

const Logout = ({ logoutfunction }) => {
    const navigate = useNavigate();
    let currentLocation = window.location.hash;
    const [path, setPath] = useState()
    const user = sessionStorage.getItem("admin") ;
    const admin = sessionStorage.getItem("name");
    const phoneNumber = sessionStorage.getItem("phoneNumber");

    useEffect(() => {
        console.log('89798',currentLocation);
        if (currentLocation === '#/admin/analytics') {
            setPath('/admin');
        } else {
            setPath('/');
        }
    }, [currentLocation])

    const handleLogout = () => {
        logout({phoneNumber:phoneNumber});
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('admin');
        sessionStorage.removeItem('phoneNumber');
        logoutfunction(false);
        navigate(path)
    };
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            position={'absolute'}
            zIndex={1}
            top={2}
            right={0}
        >
            <ButtonGroup className='btn glow-on-hover' style={{ height: '40px', cursor: 'pointer' }}>
                <Tooltip title={admin ? admin : user}>
                    <Typography sx={{
                        width: '90px',
                        whiteSpace: 'nowrap',
                        color: 'white',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>{admin ? admin : user}</Typography>
                </Tooltip>
                <Tooltip title="Logout">
                    <Button onClick={handleLogout} style={{ padding: 0, cursor: 'pointer' }}>
                        <LogoutIcon />
                    </Button>
                </Tooltip>
            </ButtonGroup>
        </Box>
    );
};

export default Logout;
