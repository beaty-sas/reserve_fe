import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import PlaceIcon from '@mui/icons-material/Place';
import breakpoints from "../../assets/theme/base/breakpoints";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDAvatar from "../../components/MDAvatar";
import { Business } from "../../types/business";

type Props = {
    children: any
    business: Business
}

function Header({ children, business }: Props) {
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");

    useEffect(() => {
        function handleTabsOrientation() {
            return window.innerWidth < breakpoints.values.sm
                ? setTabsOrientation("vertical")
                : setTabsOrientation("horizontal");
        }

        window.addEventListener("resize", handleTabsOrientation);
        handleTabsOrientation();
        return () => window.removeEventListener("resize", handleTabsOrientation);
    }, [tabsOrientation]);

    return (
        <MDBox position="relative" mb={5}>
            <Card
                sx={{
                    position: "relative",
                    py: 2,
                    px: 2,
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    {business.logo?.thumbnail && (
                        <Grid item>
                            <MDAvatar src={business.logo?.thumbnail} alt="profile-image" size="xl" shadow="sm" />
                        </Grid>
                    )}
                    <Grid item>
                        <MDBox height="100%" mt={0.5} lineHeight={1}>
                            <MDTypography variant="h5" fontWeight="medium">
                                {business.display_name}
                            </MDTypography>
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
                        <AppBar position="static">
                            <MDTypography variant="h5" color="text" fontWeight="regular" textAlign="end">
                                {business.location?.name} <PlaceIcon />
                            </MDTypography>
                        </AppBar>
                    </Grid>
                </Grid>
                {children}
            </Card>
        </MDBox>
    );
}

// Setting default props for the Header
Header.defaultProps = {
    children: "",
};

// Typechecking props for the Header
Header.propTypes = {
    children: PropTypes.node,
};

export default Header;
