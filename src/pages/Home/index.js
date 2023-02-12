import { Container } from './styles';

import Loader from '../../components/Loader';

import useHome from './useHome';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

export default function Home() {
  const {
    isLoading,
    contactBeingDelete,
    isDeleteModalVisible,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  const hasContact = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContact);
  const isSearchEmpty = !hasError && (hasContact && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContact && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus OnTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound value={searchTerm} />}

      {hasContact && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
            onToggleOrderBy={handleToggleOrderBy}
            orderBy={orderBy}
          />

          <Modal
            danger
            title={`Tem certeza que deseja remover o contato "${contactBeingDelete?.name}"?`}
            confirmLabel="Deletar"
            visible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>Esta ação não poderá ser desfeita.</p>
          </Modal>
        </>
      )}

    </Container>
  );
}
