import PropTypes from "prop-types";
import MDBox from "../../../components/MDBox";

function PageLayout({ background, children }: any) {

  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </MDBox>
  );
}

PageLayout.defaultProps = {
  background: "default",
};

PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default PageLayout;
