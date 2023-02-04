import {
  useState, useEffect, useImperativeHandle, useCallback,
} from 'react';
import PropTypes from 'prop-types';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import CategoriesService from '../../services/CategoriesService';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone) ?? '');
      setCategoryId(contact.category.id ?? '');
    },
    setResetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  useEffect(() => {
    async function laodCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }

    laodCategories();
  }, [setCategories, setIsLoadingCategories]);

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }, [setError, removeError]);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }, [setError, removeError]);

  const handlePhoneChange = useCallback((event) => {
    setPhone(formatPhone(event.target.value));
  }, []);

  const handleCategoryChange = useCallback((event) => {
    setCategoryId(event.target.value);
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
  }, [categoryId, email, name, phone, onSubmit]);

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    handleCategoryChange,
    categories,
    isFormValid,
  };
}

useContactForm.propTypes = {
  onSubmit: PropTypes.bool.isRequired,
  ref: PropTypes.shape().isRequired,
};
