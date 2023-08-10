export BIN_PATH=../fabric-samples/bin
export CONFIG_DIRECTORY=$PWD
export FABRIC_CFG_PATH=../
export FABRIC_LOGGING_SPEC=INFO
export CORE_PEER_LISTENADDRESS=localhost:7051
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_FILESYSTEMPATH=$PWD/peerLedger/
export CORE_PEER_MSPCONFIGPATH=./crypto-config/peerOrganizations/simple.com/users/Admin@simple.com/msp
export CORE_LEDGER_STATE_STATEDATABASE=goleveldb

$BIN_PATH/peer channel join -o localhost:7050 -b ./simplechannel.block 

$BIN_PATH/peer channel list


cd chaincode-external

tar cfz code.tar.gz connection.json
tar cfz external-chaincode.tgz metadata.json code.tar.gz

cd ..

$BIN_PATH/peer lifecycle chaincode install chaincode-external/external-chaincode.tgz

$BIN_PATH/peer lifecycle chaincode install $PWD/chaincode-external/external-chaincode.tgz

export CHAINCODE_ID=$($BIN_PATH/peer lifecycle chaincode calculatepackageid chaincode-external/external-chaincode.tgz) && echo $CHAINCODE_ID

# new terminal 

npm i and build

export CHAINCODE_ID=$(../../fabric-samples/bin/peer lifecycle chaincode calculatepackageid ../chaincode-external/external-chaincode.tgz) && echo $CHAINCODE_ID

export CHAINCODE_SERVER_ADDRESS=127.0.0.1:9999

npm run start:server-nontls

$BIN_PATH/peer lifecycle chaincode approveformyorg --channelID simplechannel --name basic --version 1 --package-id $CHAINCODE_ID --sequence 1 

$BIN_PATH/peer lifecycle chaincode commit --channelID simplechannel --name basic --version 1 --sequence 1 

$BIN_PATH/peer chaincode invoke -C simplechannel -n basic -c '{"Args":["CreateAsset","1","blue","35","tom","1000"]}' --waitForEvent 

$BIN_PATH/peer chaincode query -C simplechannel -n basic -c '{"Args":["ReadAsset","1"]}'
