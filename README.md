# crowdCoin
CrowdCoin is Decentralized Application built on Ethereum Test Network(Rinkeby network)<br>
* It is platform to get funding for new ideas by creating campaigns.<br>
* A manager creates a campaign specifying minimum contribution. He can also create requests to use the contributed money.<br>
* Public can contribute and become approvers. A simple majority is required for a request to be approved.<br>
Visit [crowdCoin](https://crowdsourcecoin.netlify.app/) to view entire application.
Note: Requires Metamask to be installed to create campaigns

## Home Page
![image](https://user-images.githubusercontent.com/97080149/170812214-6d72d885-427c-4ed7-afb1-8f5ebf0a0efe.png)
* The Home Page shows list of existing Campaigns. It has an option to create campaign.<br>
* The Create Campaign asks for minimum contribution a person needs to pay to take part.<br>

## View Campaign
![image](https://user-images.githubusercontent.com/97080149/170811751-893e0012-2147-4b55-9122-781d51576908.png)
* The View Campaign shows Address of Manager(Person who created campaign), Minimum Contribution,<br>
Number of Requests, Number of Approvers, Balance.<br>
* Public can contribute and become approvers. This updates the Number of Approvers and balance.
## View Request
![image](https://user-images.githubusercontent.com/97080149/170813020-65b8789e-4b6e-4b6a-810e-06306c83a508.png)
* Only Manager can add new request.
* Only Approvers can approve a request
* Once Simple majority is obtained, the Manager can finalize the request.

## Tools Used
* Solidity: To create Smart Contracts
* Ganache CLI: For Local Testing
* Web3 JS: For communicating with deployed contract.
* Next JS: For Front end Application
* Netify: Hosting Service

A Project done with the Udemy Course:[Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/)

