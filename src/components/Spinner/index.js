import PropTypes from 'prop-types';

import { StyleSpinner } from './styles';

export default function Spinner({ size = 32 }) {
  return <StyleSpinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};
