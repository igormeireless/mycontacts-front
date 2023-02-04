import { useCallback, useRef } from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
  const contactFormRef = useRef(null);

  const handleSubmit = useCallback(async (contact) => {
    try {
      await ContactsService.creacteContact(contact);

      contactFormRef.current.setResetFields();
      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
    }
  }, []);

  return { handleSubmit, contactFormRef };
}
