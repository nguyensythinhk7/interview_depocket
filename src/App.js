import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Big from 'big-js';


function App() {
    const [tokeList, setTokenList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const BATCH_SIZE = 10;

    const xWallet = [
        '0xd183f2bbf8b28d9fec8367cb06fe72b88778c86b',
        '0x9442dad1df11c858a900f55291dc1cf645ff66df',
        '0x3ddfa8ec3052539b6c9549f12cea2c295cff5296',
        '0x6a0b3611214d5001fa5efae91b7222a316c12b52',
        '0x41867cc58aece8b570ff1a2a8aa6149014d2a94c',
        '0xe5d9c56b271bc7820eee01bcc99e593e3e7bad44',
        '0x51782e39a0af33f542443419c223434bb4a5a695',
        '0x5da5b71b88c42544b642d4ab781b30831edac341',
        '0xf59cf3866797a6ecc91c9c81e8e6704bd437cfc9',
        '0x3e8734ec146c981e3ed1f6b582d447dde701d90c',
        '0x81b6534f4f7ba45ecf98295cef1450b4a4fc81cd',
        '0x0c54b0b7d61de871db47c3ad3f69feb0f2c8db0b',
        '0x72ac0dac4784d1b0f6f15ceb4ee918c40aada55b',
        '0x9b07deaec22328ebae132875245492d56a57f7bf',
        '0x6914fc70fac4cab20a8922e900c4ba57feecf8e1',
        '0x5448c07cb55adb7ee19185144108b09ed291fded',
        '0x685bfdd3c2937744c13d7de0821c83191e3027ff',
        '0xe7bc2e5fedcaaa2733f8d729bb239d1e6920920c',
        '0xeae874503203283cb6814932ea51f8ff9975e2bd',
        '0xd794988e7c25cb34f58a1f8dcc30a7ca296dcb95',
        '0x69e8305d669d2e1ee037e3dd4cb60547cc17a386',
        '0xedfcb78e73f7ba6ad2d829bf5d462a0924da28ed',
        '0xa9ff08af55b24bb5d064d776a078e8a292b8dfe2',
        '0x469bdca6ce6db9e47cdf65f72517cf68f5736aa9',
        '0x4f49e704469a1782c55c42de7850a5aacfba1a1a',
        '0xfde64760370ad58805900a3e23a1ebeeae9fba2c',
        '0xf8aae8d5dd1d7697a4ec6f561737e68a2ab8539e',
        '0x7524e72a0dd6a7f0f66cb5fd6721cf8d031bbb96',
        '0xe283d0e3b8c102badf5e8166b73e02d96d92f688',
        '0xfff42f23d589ffae3fd757845db28d3cb2684575',
        '0x6dd7abf38c8ef825d5a9cbd3cbff20d2a944e469',
        '0xafd42abff7aee74d62102d8e5071aad4831750ac',
        '0x174b229d397af711da58bfddb142f1babe6bfaad',
        '0x4b296808f414ab3775889fa2863e1d73f958a58e',
        '0xfb6edc6d8a6cb682bbfdda249f1a402b39a57943',
        '0xa625ab01b08ce023b2a342dbb12a16f2c8489a8f',
        '0xcce949de564fe60e7f96c85e55177f8b9e4cf61b',
        '0xceba60280fb0ecd9a5a26a1552b90944770a4a0e',
        '0x7af938f0efdd98dc513109f6a7e85106d26e16c4',
        '0x47607053a078c326fbd5c3e7d6a5c7bc1d7bee27',
        '0x0b45bb25990f4eceee715d5d836fe718d833bba9',
        '0x19457177836d40f09e30b1d692de329c7c42f1a8',
        '0x5c18ad1e3118654d9149148a5438eb681178fe77',
        '0xc72f3295b7fe847ec99e3a3c6dd6e90db5e1061b',
        '0x514bc8e22d055791995fcf137509be95dc20d48c',
        '0x2880620a82bf151b2ab3fda4eab455c151dee9eb',
        '0x9ae0a9aa8864f270e069f7a920d55de120f2f0a8',
        '0xad5c1fdfd5b776d40e22a1451c61aec360029c06',
        '0x74ae87263afa1f1bc60e9ece85b81550ad8da0d3',
        '0x9bc5a78d63feba2337ff2aa9a2e2a0ec4fbf164f',
        '0x4266689ccef11c0ce730e6b990b578cadc4ffaba',
        '0x04399158b219049c93b533b587eb469b2bc79176',
        '0x4228b9d4d4938f9dc938d63bcba7eb42a609141a',
        '0xb7fd1aa31e560550a73e27bf85fc46cd6db83684',
        '0x60d552f33b029547e39ff1e82ad26649ccd3b88a',
        '0xc765bddb93b0d1c1a88282ba0fa6b2d00e3e0c83',
        '0x49caa31dedb03009bbc3a478a4a97763ac63812f',
        '0xf8e4c03a1eed14d5477b877e43435e38c2109204',
        '0xeb3220baabda7110bf758b57b5d4aa2397f87804',
        '0x04b35d8eb17729b2c4a4224d07727e2f71283b73',
        '0x7555b49c45d970411d3b71394aad3a874fc23bdb',
        '0xf8587bfb4d3e0b31029efa09d595ee6179ddfeaa',
        '0xb039df879f41487396c6ef973272ed4db4c88c90',
        '0x1004a537a1c39ee9d38110bfe3042627c2cd5bbe',
        '0xbbd784ee2a785b53c8bf55889245c6e986746234',
        '0x0a603eeb2d3afb3f095d079376241d61c36bcef7',
        '0x4974fdd567d544a9de0e167f094362c4ce5f396c',
        '0x777999be819ffecee44a995560a9d0e97780a30c',
        '0xa3a1f03f7da928a37d5b055764e9cb1831ddfbca',
        '0xdd3316850d2ba7b1265c9f4bf6297c42588ca0ad',
        '0xeeffccd96ed695377587bc958ee8974945cb80ee',
        '0xfe4d98bdc6de4402a12d52dc5012714560b4f60f',
        '0x2c4a246e532542dfae3d575003c7f5c6583bfd8c',
        '0x56b9cf689b11235d351f7ebe9b25499430ba4254',
        '0xd34f9d1b649c7cd5efc355c1cb6b1a481234616d',
        '0x123b83b136f80cabd5ec43a87e03ffa70681ed65',
        '0x4bfe9489937d6c0d7cd6911f1102c25c7cbc1b5a',
        '0xb5845706c2b380b09ddd4a5576c8f2a472509c6d',
        '0x2c69dc18892064da77e4f8b6dccbbe41584edd3e',
        '0x9fa900bba318d96ec0884f0e17f179baf0529110',
        '0x9cd2d1a3214c12bb6dbfa7dbc3b0641c26a2f9a6',
        '0x30c35950f2a8b8b76338bcd0b4d6fe67c98d2439',
        '0x1fb0e9d52ec22f5606a97a4381efb244c653452c',
        '0x8dfe5535576c720896e98b9c9dbaf81ee03ea903',
        '0x5d350f07c1d9245c1ecb7c622c67edd49c6a0a35',
        '0xe90444c38a8cd2dceee9d954042ac817a794e9a9',
        '0x98b7e1e50f0fb7787475acbbb86cc2c367bb13a0',
        '0xb6e2e2f30ae1a5aa18919279b9b7cbd0813f5be7',
        '0xc63f01d94ba3932376d85e3ffc692f9b713aa4e0',
        '0x4191131cd452e9729546b79f9f4e00c12e1d1c22',
        '0x1083926054069aad75d7238e9b809b0ef9d94e5b',
        '0x0c89c0407775dd89b12918b9c0aa42bf96518820',
        '0x9c67dd13645be82695e71c3ebb0e5767532609b5',
        '0x2a7affef37ee145cb9da989a7c93fbf487325b2e',
        '0xe9a90759f6bc4b1bfa64f918ee62291c4b83d128',
        '0xa3eedc686368995cfc00c2d660d3d78681504be8',
        '0x3216845ba8283b29efbc5faefddab13df4b215b9',
        '0x2f82da0d23ab6a0d27a0dcc92239593995b7c7f4',
        '0xfb62ea552eeba8b00cc5db56ba8d7c50429c0001',
        '0x22bb68bd0b113ccf688e0759ac0b4abc013df824'
    ];

    var formatter = new Intl.NumberFormat('en-US', {
        // style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 5
    });

    useEffect(() => {
        loadData();
    }, []);

    const fetchDataWallet = async (address) => {
        try {
            const url = `https://staging-api.depocket.com/v1/account/${address}/balances?chain=bsc`;
            const {data, status} = await axios.post(url);

            if(status !== 200) {
                console.error("address get Failed", address)
                return []
            };

            return data;
        } catch (error) {
            console.error("address get Failed", address)
            return [];
        }
    }

    const promiseAllInBatches = async (task, items, batchSize) => {
        let position = 0;
        let results = [];
        while (position < items.length) {
            const itemsForBatch = items.slice(position, position + batchSize);
            results = [...results, ...await Promise.all(itemsForBatch.map(item => task(item)))];
            position += batchSize;
        }

        return results;
    }

    const loadData = async () => {
        setLoading(true);

        const allTokens = {};
        let totalValue = 0;

        const xWalletTokens = await promiseAllInBatches(fetchDataWallet, xWallet, BATCH_SIZE);

        xWalletTokens.forEach(tokens => {
            tokens.forEach(token => {
                if(allTokens[token.address]) {
                    allTokens[token.address] = {
                        ...allTokens[token.address],
                        balance: Big(allTokens[token.address].balance).plus(token.balance).toString(),
                        total: Big(allTokens[token.address].balance).plus(token.balance).times(token.price).toString()
                    }
                } else {
                    allTokens[token.address] = {
                        ...token,
                        total: Big(token.balance).times(token.price).toString()
                    }
                }

                totalValue = Big(totalValue).plus(Big(token.balance).times(token.price)).toString();
            })
        })

        setTotal(totalValue);
        setTokenList(Object.values(allTokens));
        setLoading(false);
    }

    return <div className="App">
        <h2 className='total'>
            Total Value : <span className='total-value'>{ !loading && total ? formatter.format(total) : '---'}$</span>
        </h2>
        <table className='table-token-list'>
            <tbody>
                <tr>
                    <th>#</th>
                    <th>Token</th>
                    <th>Contract</th>
                    <th>Balance</th>
                    <th>Fiat</th>
                </tr>
            {
                !loading ? tokeList.map((token, index) => (
                    <tr key={index}>
                        <td>{++index}</td>
                        <td>{token.symbol}</td>
                        <td>{token.address}</td>
                        <td>{formatter.format(token.balance)}</td>
                        <td>{formatter.format(token.total)}$</td>
                    </tr>
                )) : <tr>
                    <td className='none-border' colSpan={5}>...đang tải dữ liệu</td>
                </tr>
            }
            </tbody>
        </table>
    </div>
}

export default App;