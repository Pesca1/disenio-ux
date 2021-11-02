import React, {useEffect, useState} from 'react';
import Template from "./Template";
import i18next from 'i18next';
import { withTranslation, useTranslation } from 'react-i18next';
import {
    unstable_Form as Form,
    unstable_FormLabel as FormLabel,
    unstable_FormInput as FormInput,
    unstable_FormMessage as FormMessage,
    unstable_FormSubmitButton as FormSubmitButton,
    unstable_useFormState as useFormState,
    Button
} from 'reakit';

const AddressScreen = (props) => {
    const { t } = useTranslation();
    const [ bigFont, setBigFont ] = useState(props.location && props.location.state && props.location.state.bigFont || false);
    const formProps = useFormState({
        baseId: 'address-form',
        values: { calle: '', numero: '', ciudad: ''},
        onValidate: (values) => {
            if (!values.calle)
                throw { calle: t('AddressScreen_validate1') }
            if (!values.numero)
                throw { numero: t('AddressScreen_validate2') }            
        },
        onSubmit: (values) => {
            
            props.history.push('/address-selection', { ...values, bigFont });
            window.location.reload()
        }
    });

    

    useEffect(() => {
        document.title = t('AddressScreen_title')
    })


    return (
        <Template bigFont={bigFont} toggleBigFont={() => setBigFont(!bigFont)}
            goBack={() => {props.history.push('/', { bigFont }); window.location.reload()}}>
            <h1>{t('AddressScreen_h1')}</h1>
            <Form {...formProps}>            
            <div className='description'>                         
                <div>
                            <FormLabel {...formProps} name='calle'>{t('AddressScreen_label1')}</FormLabel>
                            <br/>                            
                            <FormInput {...formProps} name='calle' placeholder="Av. 7, Calle 115, Diag 75" />                            
                            <FormMessage {...formProps} name='calle'/>
                </div>
                <div>
                      
                            <FormLabel {...formProps} name='numero'>{t('AddressScreen_label2')}</FormLabel>
                            <br/>                            
                            <FormInput {...formProps} name='numero' placeholder="815" />                            
                            <FormMessage {...formProps} name='numero' />
                </div>
                <br/>                
                        <div className='center-content mt-1'>                            
                            <FormSubmitButton {...formProps} className='button'>{t('AddressScreen_submitbutton')}</FormSubmitButton>                            
                            <br/>      
                            <h3>{t('AddressScreen_h3')}</h3>                    
                            <Button className='button' onClick={() => props.history.push('/address-selection', { skipSearch: true, bigFont })}>{t('AddressScreen_button')}</Button>                            
                        </div>
                    
            </div>
            
            </Form>
        </Template>
    );
}

export default AddressScreen;