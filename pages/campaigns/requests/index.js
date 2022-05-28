import React from 'react';
import { Button, Header, Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

const CampaignRequest = ({ address, requestCount, requests, approversCount }) => {
    const { Header, Row, HeaderCell, Body } = Table

    const renderRows = () => {
        return requests.map((request, index) => {
            return <RequestRow key={index} request={request} address={address} id={index} approversCount={approversCount
            } />
        })

    }
    return (
        <Layout>
            <h3 style={{ display: 'inline' }}>Request List</h3>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary floated='right' style={{ marginBottom: 10 }}>Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRows()}
                </Body>
            </Table>
            <div>Found {requestCount} requests</div>
        </Layout>

    );
}

CampaignRequest.getInitialProps = async (props) => {
    const address = props.query.address;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element, index) => {
            return campaign.methods.requests(index).call();
        })
    )
    return { address, requestCount, requests, approversCount }
}

export default CampaignRequest;
