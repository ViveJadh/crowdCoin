import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Router, Link } from '../../../routes';

const RequestNew = ({ address }) => {

    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [recipient, setRecipient] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        setErrorMessage('')
        const campaign = Campaign(address);
        try {
            const accounts = await web3.eth.getAccounts()

            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({ from: accounts[0] })
            Router.pushRoute(`/campaigns/${address}/requests`)


        }
        catch (error) {
            setErrorMessage(error.message)
        }
        setIsLoading(false)


    }
    return (
        <Layout>
            <Link route={`/campaigns/${address}/requests`}>
                <a>
                    Back
                </a>
            </Link>
            <h3>Create Request</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label >Description</label>
                    <Input value={description} onChange={event => setDescription(event.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label >Value In Ether</label>
                    <Input value={value} onChange={event => setValue(event.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label >Recipient</label>
                    <Input value={recipient} onChange={event => setRecipient(event.target.value)} />
                </Form.Field>
                <Message error header='Oops!!!' content={errorMessage} />
                <Button primary loading={isLoading}>Create!</Button>
            </Form>
        </Layout>
    );
}

RequestNew.getInitialProps = async (props) => {

    const address = props.query.address;
    return { address }

}

export default RequestNew;
