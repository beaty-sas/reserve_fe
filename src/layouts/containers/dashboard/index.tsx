import PropTypes from "prop-types";
import MDBox from "../../../components/MDBox";

function DashboardLayout({ children }: any) {

  return (
    <MDBox
      sx={({ breakpoints, transitions }: any) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </MDBox>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
