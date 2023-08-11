export BIN_PATH=../fabric-samples/bin

rm -rf Org1.json simple-channel.tx simple-channel.tx.json ./packages ./ordererLedger Org1Anchors.tx simple-genesis.block ./peerLedger Org1Anchors.tx.json simple-genesis.block.json simplechannel.block ./crypto-config  

$BIN_PATH/cryptogen generate --config=./crypto-config.yaml

$BIN_PATH/configtxgen -outputBlock ./simple-genesis.block -profile SimpleOrdererGenesis -channelID ordererchannel

$BIN_PATH/configtxgen -outputCreateChannelTx ./simple-channel.tx -profile SimpleChannel -channelID simplechannel

$BIN_PATH/orderer