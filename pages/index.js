import React, { useEffect } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import { Link } from '../routes';

const CampaignIndex = ({ campaigns }) => {

    const renderCampaigns = () => {
        const items = campaigns.map(address => {
            return {
                header: address, description: <Link route={`/campaigns/${address}`}><a>ViewCampaign</a></Link>, fluid: true
            }
        });
        return <Card.Group items={items} />;

    }

    return (
        <Layout>
            <div>
                <h3>Open Campaigns</h3>
                <Link route='/campaigns/new'>
                    <a>
                        <Button content='Create Campaign' icon='add circle' primary floated='right' />
                    </a>
                </Link>
                {renderCampaigns()}
            </div>
        </Layout>
    );
}


CampaignIndex.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns }

}

export default CampaignIndex;
