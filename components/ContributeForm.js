import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = ({ address }) => {

    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('')
        const campaign = Campaign(address)
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0], value: web3.utils.toWei(value, 'ether')
            });
            Router.replaceRoute(`/campaigns/${address}`);

        }
        catch (error) {
            setErrorMessage(error.message)

        }
        setIsLoading(false);
        setValue('')
    }
    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount To Contribute</label>
                <Input label='ether' labelPosition='right' value={value} onChange={e => setValue(e.target.value)} />
            </Form.Field>
            <Message error header="Oops!!!" content={errorMessage} />
            <Button primary loading={isLoading}>Contribute!</Button>
        </Form>
    );
}

export default ContributeForm;
