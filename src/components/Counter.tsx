import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

interface CounterProps {
  count: number;
}

const Counter: React.FC<CounterProps> = ({ count }) => {
  return (
    <Typography variant="h6">
      Total Tasks: {count}
    </Typography>
  );
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Counter;