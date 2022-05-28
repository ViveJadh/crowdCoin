import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface), '0xAab74fd9B70A56aF294d13885aC6d6EFB6e3478e'
);

export default instance;