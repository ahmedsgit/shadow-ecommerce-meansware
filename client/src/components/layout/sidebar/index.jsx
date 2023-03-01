import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    AdminPanelSettingsOutlined,
    CalendarMonthOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    Groups2Outlined,
    HomeOutlined,
    PieChartOutlined,
    PointOfSaleOutlined,
    PublicOutlined,
    ReceiptLongOutlined,
    ShoppingCartOutlined,
    TodayOutlined,
    TrendingUpOutlined,
} from "@mui/icons-material";
import { FlexBetween } from "components";
import { LogoDark, LogoLight } from "assets/";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />,
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Geography",
        icon: <PublicOutlined />,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />,
    },
];

const Sidebar = ({
    isNonMobile,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    {theme.palette.mode === "dark" ? (
                                        <Box
                                            component="img"
                                            src={LogoDark}
                                            alt="dark logo"
                                            width="100%"
                                        />
                                    ) : (
                                        <Box
                                            component="img"
                                            src={LogoLight}
                                            alt="light Logo"
                                            width="100%"
                                        />
                                    )}
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem", fontWeight: '700' }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette.secondary[600]
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette.grey[300]
                                                        : theme.palette.secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.grey[300]
                                                            : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;