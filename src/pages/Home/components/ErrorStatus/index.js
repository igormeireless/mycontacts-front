import PropTypes from 'prop-types';

import sad from '../../../../assets/images/sad.svg';
import Button from '../../../../components/Button';

import { Container } from './styles';

export default function ErrorStatus({ OnTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="Sad" />

      <div>
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type="button" onClick={() => OnTryAgain()}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  OnTryAgain: PropTypes.func.isRequired,
};
