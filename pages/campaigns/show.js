import React from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

const CampaignShow = (props) => {

    const renderCampaign = (props) => {
        const { minimumContribution, balance, requestCount, approversCount, manager } = props
        const items = [{
            header: manager,
            meta: 'Address Of Manager',
            description: 'The Manager created this campaign and can create request',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: minimumContribution,
            meta: 'Minimum Contribution in (wei)',
            description: 'You must contribute atleast this much wei to become approver'
        },
        {
            header: requestCount,
            meta: 'Number of Requests',
            description: 'A request tries to withdraw money from the contract. Request must be approved by approvers.'
        },
        {
            header: approversCount,
            meta: 'Number of Approvers',
            description: 'Number of people who have contributed to the contract'
        },
        {
            header: web3.utils.fromWei(balance, 'ether'),
            meta: 'Campaign Balance (ether)',
            description: 'The balance is how much ether the campaign has to spend.'
        }
        ];
        return <Card.Group items={items} />

    }
    return (
        <Layout>
            <h3>CampaignShow</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCampaign(props)}

                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={props.address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${props.address}/requests`}>
                            <a><Button primary>
                                View Requests
                            </Button></a>
                        </Link>

                    </Grid.Column>

                </Grid.Row>



            </Grid>

        </Layout>
    );
}


CampaignShow.getInitialProps = async (props) => {
    const contract = Campaign(props.query.address);
    const summary = await contract.methods.getSummary().call();
    return {
        address: props.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    }
}


export default CampaignShow;
