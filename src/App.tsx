import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
    token_ws: string;
    url: string;
}

interface Response {
    url: string;
    token_ws: string;
}

function App() {
    const [credentials, getCredentials] = useState<Response>({
        url: '',
        token_ws: '',
    });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = ({url, token_ws}) => {
      window.location.replace(url);
    }
    ;
    useEffect(() => {
        const getTokenAndUrl = async () => {
            const datos = {
                buy_order: 'ordenCompra12345678',
                session_id: 'sesion1234557545',
                amount: 10000,
                return_url: 'http://localhost:5173',
            };

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                url: 'http://localhost:3002/tbk/getCredentials',
                data: datos,
            };
            const reponse = await axios.request(options);
            getCredentials(reponse.data);
            localStorage.setItem('token_ws', reponse.data.token);
            localStorage.setItem('url', reponse.data.url);
        };
        getTokenAndUrl();
    }, []);
    return (
        <div className="App">
            <div>Transbank!!</div>
            {credentials && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="hidden"
                        defaultValue={localStorage.getItem('token_ws') || ''}
                        {...register('token_ws')}
                    />
                    <input
                        defaultValue={localStorage.getItem('url') || ''}
                        {...register('url')}
                    />
                    <input type="submit" value='Pagar' />
                </form>
            )}
            {credentials && credentials.token_ws}
            <br />
            {credentials && credentials.url}
        </div>
    );
}

export default App;
