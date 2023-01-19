import PropTypes from 'prop-types';

import { StyleSpinner } from './styles';

export default function Spinner({ size }) {
  return <StyleSpinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 32,
};
