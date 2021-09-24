import React, {useEffect, useState} from 'react';
import Template from "./Template";
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

    const [ bigFont, setBigFont ] = useState(props.location && props.location.state && props.location.state.bigFont || false);
    const formProps = useFormState({
        baseId: 'address-form',
        values: { calle: '', numero: '', ciudad: ''},
        onValidate: (values) => {
            if (!values.calle)
                throw { calle: 'Ingrese la calle' }
            if (!values.numero)
                throw { numero: 'Ingrese la numero' }            
        },
        onSubmit: (values) => {
            
            props.history.push('/address-selection', { ...values, bigFont });
            window.location.reload()
        }
    });

    

    useEffect(() => {
        document.title = "Ingresar domicilio - Prevención de inundaciones"
    })


    return (
        <Template bigFont={bigFont} toggleBigFont={() => setBigFont(!bigFont)}
            goBack={() => {props.history.push('/', { bigFont }); window.location.reload()}}>
            <h1>Ingresá tu domicilio</h1>
            <Form {...formProps}>            
            <div className='description'>                         
                <div>
                            <FormLabel {...formProps} name='calle'>Calle</FormLabel>
                            <br/>                            
                            <FormInput {...formProps} name='calle' placeholder="Av. 7, Calle 115, Diag 75" />                            
                            <FormMessage {...formProps} name='calle'/>
                </div>
                <div>
                      
                            <FormLabel {...formProps} name='numero'>Número</FormLabel>
                            <br/>                            
                            <FormInput {...formProps} name='numero' placeholder="815" />                            
                            <FormMessage {...formProps} name='numero' />
                </div>
                <br/>                
                        <div className='center-content mt-1'>                            
                            <FormSubmitButton {...formProps} className='button'>Buscar mi domicilio!</FormSubmitButton>                            
                            <br/>      
                            <h3>Si no podés seleccionar tu dirección directamente en el mapa</h3>                    
                            <Button className='button' onClick={() => props.history.push('/address-selection', { skipSearch: true, bigFont })}>Señalar en el mapa</Button>                            
                        </div>
                    
            </div>
            
            </Form>
        </Template>
    );
}

export default AddressScreen;