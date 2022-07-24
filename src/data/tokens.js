const TokenImageCDN = "https://d2mj1no4zi8uvs.cloudfront.net/token-images/";
import CPGImage from "../../public/images/cpg.jpeg";

export const tokens = [
    {
        id:"eth",
        name: 'Ethereum',
        symbol: 'ETH',
        image: `${TokenImageCDN}ethereum.png`,
        interest: 10,
    },
    {
        id:"eth",
        name: 'Ethereum',
        symbol: 'ETH',
        image: `${TokenImageCDN}ethereum.png`,
        interest: 15,
    },
    {
        id:"cpg",
        name: 'CPG',
        symbol: 'CPG',
        image: CPGImage,
        interest: 17,
    },
];
