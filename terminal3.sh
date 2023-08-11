export BIN_PATH=../fabric-samples/bin
export CONFIG_DIRECTORY=$PWD
export FABRIC_CFG_PATH=./
export FABRIC_LOGGING_SPEC=INFO
export CORE_PEER_LISTENADDRESS=localhost:7051
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_FILESYSTEMPATH=$PWD/peerLedger/
export CORE_PEER_MSPCONFIGPATH=./crypto-config/peerOrganizations/simple.com/users/Admin@simple.com/msp
export CORE_LEDGER_STATE_STATEDATABASE=goleveldb

$BIN_PATH/peer channel join -o localhost:7050 -b ./simplechannel.block 

$BIN_PATH/peer channel list
