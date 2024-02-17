import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
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
                {business.logo?.thumbnail && (
                    <Grid container justifyContent={'center'}>
                        <MDAvatar src={business.logo?.thumbnail} alt="profile-image" size="xxl" shadow="sm" />
                    </Grid>
                )}
                <Grid container mt={3} justifyContent="center">
                    <MDBox lineHeight={1}>
                        <MDTypography variant="h4" fontWeight="medium">
                            {business.display_name}
                        </MDTypography>
                    </MDBox>
                </Grid>
                <Grid container mt={1} justifyContent="center">
                    <MDTypography variant="h6" fontWeight="regular" textAlign="end">
                        <PlaceIcon /> {business.location?.name}
                    </MDTypography>
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
