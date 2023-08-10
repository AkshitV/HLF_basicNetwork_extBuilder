
# Overview
- [Overview](#overview)
- [Prereqs](#prereqs)
  - [To run the chaincode as a service](#to-run-the-chaincode-as-a-service)
- [Instructions for starting network](#instructions-for-starting-network)
  - [Running each component separately](#running-each-component-separately)
  - [Instructions for deploying and running the chaincode](#instructions-for-deploying-and-running-the-chaincode)
  - [Activate the chaincode](#activate-the-chaincode)
  - [Interact with the chaincode](#interact-with-the-chaincode)
- [Stopping the network](#stopping-the-network)

Basic network with an external chaincode 

# Prereqs

- Follow the Fabric documentation for the [Prereqs](https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html)
- Follow the Fabric documentation for [downloading the Fabric samples and binaries](https://hyperledger-fabric.readthedocs.io/en/latest/install.html). You can skip the docker image downloads by using `./install-fabric.sh binary samples`
- Nodejs 
- Setting up the path to the hyperledger binaries in terminal1/2/3 shell scripts.
- Giving mod access to the three scripts : chmod 777 ./terminal1.sh

## To run the chaincode as a service

You need to configure the peer to use the `ccaas` external builder downloaded with the binaries above.
The path specified in the default config file is only valid within the peer container which you won't be using.

Edit the `./core.yaml` file and modify the `externalBuilders` field to point to the correct path.
The configuration should look something like the following:

```yaml
externalBuilders:
  - name: ccaas_builder
    path: /Users/username/fabric-samples/builders/ccaas  
    propagateEnvironment:
      - CHAINCODE_AS_A_SERVICE_BUILDER_CONFIG
```

# Instructions for starting network

## Running each component separately

Open 4 terminals to accomodate one orderer, peer, peer operations(joining channel, chaincode lifecycle commands, invoke & query chaincode) and chaincode service.

The following instructions will have you run simple bash scripts that set environment variable overrides for a component and then runs the component.
The scripts contain only simple single-line commands so that they are easy to read and understand.
If you have trouble running bash scripts in your environment, you can just as easily copy and paste the individual commands from the script files instead of running the script files.

- In the first terminal, run `./terminal1.sh` to generate crypto material (calls cryptogen) and application channel genesis block and configuration transactions (calls configtxgen). The artifacts will be created in the `crypto-config`. After these operations, orderer will start.
- In the second terminal, run `./terminal2.sh` to run the peer node.
- In the third terminal, run `./terminal3.sh` to join the channel. 

## Instructions for deploying and running the chaincode

Package and install the external chaincode on peer1 with the following simple commands:

In terminal 3 :

```shell
cd chaincode-external

tar cfz code.tar.gz connection.json
tar cfz external-chaincode.tgz metadata.json code.tar.gz

cd ..

$BIN_PATH/peer lifecycle chaincode install chaincode-external/external-chaincode.tgz

$BIN_PATH/peer lifecycle chaincode install $PWD/chaincode-external/external-chaincode.tgz

export CHAINCODE_ID=$($BIN_PATH/peer lifecycle chaincode calculatepackageid chaincode-external/external-chaincode.tgz) && echo $CHAINCODE_ID

```

In terminal 4, navigate to `/chaincode-typescript` and build the chaincode::

```shell
export BIN_PATH=../fabric-samples/bin

export CHAINCODE_ID=$($BIN_PATH/peer lifecycle chaincode calculatepackageid chaincode-external/external-chaincode.tgz) && echo $CHAINCODE_ID
```

```shell
npm install
npm run build
```

Set the chaincode server address:

```shell
export CHAINCODE_SERVER_ADDRESS=127.0.0.1:9999
```

And start the chaincode service:

```shell
npm run start:server-nontls
```

## Activate the chaincode

In terminal 3, approve and commit the chaincode (only a single approver is required based on the lifecycle endorsement policy of any organization):

```shell
$BIN_PATH/peer lifecycle chaincode install chaincode-external/external-chaincode.tgz

$BIN_PATH/peer lifecycle chaincode install $PWD/chaincode-external/external-chaincode.tgz
```

## Interact with the chaincode

Invoke the chaincode to create an asset (only a single endorser is required based on the default endorsement policy of any organization).
Then query the asset, update it, and query again to see the resulting asset changes on the ledger. Note that you need to wait a bit for invoke transactions to complete.

``` shell
export BIN_PATH=../fabric-samples/bin

$BIN_PATH/peer chaincode invoke -C simplechannel -n basic -c '{"Args":["CreateAsset","1","blue","35","tom","1000"]}' --waitForEvent 

$BIN_PATH/peer chaincode query -C simplechannel -n basic -c '{"Args":["ReadAsset","1"]}'

```

# Stopping the network

If you started the Fabric components individually, utilize `Ctrl-C` in the orderer and peer terminal windows to kill the orderer and peer processes. You can run the scripts again to restart the components with their existing data, or run `./terminal1.sh` again to clean up the existing artifacts and data if you would like to restart with a clean environment.