/* eslint-disable no-nested-ternary */

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Container } from './styles';

export default function Header({
  hasError,
  qtyOfContacts,
  qtyFilteredContacts,
}) {
  const alignment = hasError
    ? 'flex-end'
    : (
      qtyOfContacts > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container
      justifyContent={alignment}
    >
      {(!hasError && qtyOfContacts > 0) && (
      <strong>
        {qtyFilteredContacts}
        {qtyFilteredContacts === 1 ? ' contato' : ' contatos'}
      </strong>
      )}
      <Link to="/new">Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyFilteredContacts: PropTypes.number.isRequired,
};
