import React from 'react';
import Template from "./Template";
import {
    unstable_Form as Form,
    unstable_FormLabel as FormLabel,
    unstable_FormInput as FormInput,
    unstable_FormMessage as FormMessage,
    unstable_FormSubmitButton as FormSubmitButton,
    unstable_useFormState as useFormState
} from 'reakit';

const AddressScreen = (props) => {
    const formProps = useFormState({
        baseId: 'address-form',
        values: { calle: '', numero: '', ciudad: '', provincia: '', pais: '' },
        onValidate: (values) => {
            if (!values.calle)
                throw { calle: 'Ingrese la calle' }
            if (!values.numero)
                throw { numero: 'Ingrese la numero' }
            if (!values.ciudad)
                throw { ciudad: 'Ingrese la ciudad' }
            if (!values.provincia)
                throw { provincia: 'Ingrese la provincia' }
            if (!values.pais)
                throw { pais: 'Ingrese la pais' }
        },
        onSubmit: (values) => {
            console.log("SUBMIT")
            props.history.push('/address-selection', { ...values });
        }
    });

    return (
        <Template
            goBack={() => props.history.push('/')}
            title={<>Proyecto CITADINE<br/>Prevención de Inundaciones</>}>
            <h3>Ingresá tu domicilio</h3>
            <div className='description'>
                <Form {...formProps}>
                    <FormLabel {...formProps} name='calle'>Calle</FormLabel>
                    <br/>
                    <FormInput {...formProps} name='calle' />
                    <FormMessage {...formProps} name='calle' />
                    <br/>
                    <FormLabel {...formProps} name='numero'>Número</FormLabel>
                    <br/>
                    <FormInput {...formProps} name='numero' />
                    <FormMessage {...formProps} name='numero' />
                    <br/>
                    <FormLabel {...formProps} name='ciudad'>Ciudad</FormLabel>
                    <br/>
                    <FormInput {...formProps} name='ciudad' />
                    <FormMessage {...formProps} name='ciudad' />
                    <br/>
                    <FormLabel {...formProps} name='provincia'>Provincia</FormLabel>
                    <br/>
                    <FormInput {...formProps} name='provincia' />
                    <FormMessage {...formProps} name='provincia' />
                    <br/>
                    <FormLabel {...formProps} name='pais'>País</FormLabel>
                    <br/>
                    <FormInput {...formProps} name='pais' />
                    <FormMessage {...formProps} name='pais' />
                    <br/>
                    <div className='center-content mt-1'>
                        <FormSubmitButton {...formProps} className='button'>Buscar mi dirección!</FormSubmitButton>
                    </div>
                </Form>
            </div>
        </Template>
    );
}

export default AddressScreen;