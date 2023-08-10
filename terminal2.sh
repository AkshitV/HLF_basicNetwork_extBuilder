export BIN_PATH=../fabric-samples/bin
export CONFIG_DIRECTORY=$PWD
# export CONFIG_DIRECTORY=
# export FABRIC_CFG_PATH=
export FABRIC_LOGGING_SPEC=INFO
export CORE_PEER_LISTENADDRESS=localhost:7051
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_FILESYSTEMPATH=$CONFIG_DIRECTORY/peerLedger/
export CORE_PEER_MSPCONFIGPATH=$CONFIG_DIRECTORY/crypto-config/peerOrganizations/simple.com/users/Admin@simple.com/msp
CORE_LEDGER_STATE_STATEDATABASE=goleveldb

$BIN_PATH/peer channel create -o localhost:7050 -c simplechannel -f ./simple-channel.tx 

$BIN_PATH/peer node start 