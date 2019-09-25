const rpc = require("json-rpc2");
const models = require('./app_server/models');
const {
  Keccak
} = require('sha3');
const hash = new Keccak(256);

const server = rpc.Server.$create({
  websocket: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
    'Content-Type': 'application/json'
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function icx_call(args, opt, callback) {
  console.log(args);
  console.log(typeof args.dataType);
  console.log("test");

  let _params = args.params;
  let method = _params.data.method;

  let params = _params.data.params;

  let result;
  let obj;

  switch (method) {

    case "getStake":
      obj = {
        "stake": "0xde0b6b3a7640000",
        "unstake": "0xde0b6b3a7640000",
        "unstakeBlockHeight": "0xa",
        "blockHeight": "0xa"
      };

      try {
        result = models.sequelize.transaction(async () => {
            return await models.Stake.findOne({
              where: {
                EOA: params.address
              }
            }, result);
          })
          .then(result => {
            console.log("데이터 조회 완료");
            callback(null, obj);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 조회 실패");
      };
      break;

    case "getDelegation":
      obj = {
        "status": "0x1",
        "totalDelegated": "0xa688906bd8b0000",
        "votingPower": "0x3782dace9d90000",
      };

      try {
        result = models.sequelize.transaction(async () => {
            return await models.Delegation.findAll({
              where: {
                EOA: params.address
              }
            }, result);
          })
          .then(result => {
            var delegations = [];
            for (var i = 0; i < result.length; i++) {
              var delegation = result[i].dataValues;
              delegations.push(delegation);
            }
            obj['delegations'] = delegations;
            console.log("데이터 조회 완료");
            callback(null, obj);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 조회 실패");
      };
      break;

    case "getProposal":
      aRandom = getRandomInt(0, 4);
      switch (aRandom) {
        case 0:
          obj = {
            "proposer": "hxbe258ceb872e08851f1f59694dac2558708ece11",
            "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
            "status": "0x0",
            "startBlockHeight": "0x1",
            "endBlockHeight": "0x65",
            "voter": {
              "agree": {
                "address": ["hxe7af5fcfd8dfc67530a01a0e403882687528dfcb", "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb"],
                "amount": "0x12345"
              },
              "disagree": {
                "address": ["hxbe258ceb872e08851f1f59694dac2558708ece11"],
                "amount": "0x123"
              },
              "noVote": {
                "address": ["hx31258ceb872e08851f1f59694dac2558708ece11", "hx31258ceb872e08851f1f59694dac2558708eceff"],
                "amount": "0x123"
              }
            },
            "contents": {
              "description": "Disqualify P-Rep A; P-Rep A does not maintain node",
              "type": "0x1",
              "value": {
                "address": "hxbe258ceb872e08851f1f59694dac2558708ece11"
              }
            }
          };
        case 1:
          obj = {
            "proposer": "hxbe258ceb872e08851f1f59694dac2558708ece11",
            "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
            "status": "0x0",
            "startBlockHeight": "0x1",
            "endBlockHeight": "0x65",
            "voter": {
              "agree": {
                "address": ["hxe7af5fcfd8dfc67530a01a0e403882687528dfcb", "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb"],
                "amount": "0x12345"
              },
              "disagree": {
                "address": ["hxbe258ceb872e08851f1f59694dac2558708ece11"],
                "amount": "0x123"
              },
              "noVote": {
                "address": ["hx31258ceb872e08851f1f59694dac2558708ece11", "hx31258ceb872e08851f1f59694dac2558708eceff"],
                "amount": "0x234a"
              }
            },
            "contents": {
              "description": "Disqualify P-Rep A; P-Rep A does not maintain node",
              "type": "0x2",
              "value": {
                "address": "hxbe258ceb872e08851f1f59694dac2558708ece11"
              }
            }
          };
        case 2:
          obj = {
            "proposer": "hxbe258ceb872e08851f1f59694dac2558708ece11",
            "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
            "status": "0x0",
            "startBlockHeight": "0x1",
            "endBlockHeight": "0x65",
            "voter": {
              "agree": {
                "address": ["hxe7af5fcfd8dfc67530a01a0e403882687528dfcb", "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb"],
                "amount": "0x12345"
              },
              "disagree": {
                "address": ["hxbe258ceb872e08851f1f59694dac2558708ece11"],
                "amount": "0x123"
              },
              "noVote": {
                "address": ["hx31258ceb872e08851f1f59694dac2558708ece11", "hx31258ceb872e08851f1f59694dac2558708eceff"],
                "amount": "0x14a"
              }
            },
            "contents": {
              "description": "Disqualify P-Rep A; P-Rep A does not maintain node",
              "type": "0x3",
              "value": {
                "address": "hxbe258ceb872e08851f1f59694dac2558708ece11"
              }
            }
          };
        case 3:
          obj = {
            "proposer": "hxbe258ceb872e08851f1f59694dac2558708ece11",
            "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
            "status": "0x0",
            "startBlockHeight": "0x1",
            "endBlockHeight": "0x65",
            "voter": {
              "agree": {
                "address": ["hxe7af5fcfd8dfc67530a01a0e403882687528dfcb", "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb"],
                "amount": "0x12345"
              },
              "disagree": {
                "address": ["hxbe258ceb872e08851f1f59694dac2558708ece11"],
                "amount": "0x123"
              },
              "noVote": {
                "address": ["hx31258ceb872e08851f1f59694dac2558708ece11", "hx31258ceb872e08851f1f59694dac2558708eceff"],
                "amount": "0x12334a"
              }
            },
            "contents": {
              "description": "Disqualify P-Rep A; P-Rep A does not maintain node",
              "type": "0x4",
              "value": {
                "address": "hxbe258ceb872e08851f1f59694dac2558708ece11"
              }
            }
          };
        case 4:
          obj = {
            "proposer": "hxbe258ceb872e08851f1f59694dac2558708ece11",
            "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
            "status": "0x0",
            "startBlockHeight": "0x1",
            "endBlockHeight": "0x65",
            "voter": {
              "agree": {
                "address": ["hxe7af5fcfd8dfc67530a01a0e403882687528dfcb", "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb"],
                "amount": "0x12345"
              },
              "disagree": {
                "address": ["hxbe258ceb872e08851f1f59694dac2558708ece11"],
                "amount": "0x123"
              },
              "noVote": {
                "address": ["hx31258ceb872e08851f1f59694dac2558708ece11", "hx31258ceb872e08851f1f59694dac2558708eceff"],
                "amount": "0x1212a"
              }
            },
            "contents": {
              "description": "Disqualify P-Rep A; P-Rep A does not maintain node",
              "type": "0x2",
              "value": {
                "address": "hxbe258ceb872e08851f1f59694dac2558708ece11"
              }
            }
          };
        default:
          obj = {
            "proposer": "hxbe258ceb872e08851f1f59694dac2558708ece11",
            "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
            "status": "0x0",
            "startBlockHeight": "0x1",
            "endBlockHeight": "0x65",
            "voter": {
              "agree": {
                "address": ["hxe7af5fcfd8dfc67530a01a0e403882687528dfcb", "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb"],
                "amount": "0x12345"
              },
              "disagree": {
                "address": ["hxbe258ceb872e08851f1f59694dac2558708ece11"],
                "amount": "0x123"
              },
              "noVote": {
                "address": ["hx31258ceb872e08851f1f59694dac2558708ece11", "hx31258ceb872e08851f1f59694dac2558708eceff"],
                "amount": "0x1234a"
              }
            },
            "contents": {
              "description": "Disqualify P-Rep A; P-Rep A does not maintain node",
              "type": "0x0",
              "value": {
                "address": "hxbe258ceb872e08851f1f59694dac2558708ece11"
              }
            }
          };

      }

      callback(null, obj);
      break;

    case "getProposals":
      obj = {
        "proposals": [{
            "id": "0",
            "description": "Disqualify P-Rep A; P-Rep A does not maintain node",
            "type": "0x1",
            "status": "0x0",
            "startBlockHeight": "0x1",
            "endBlockHeight": "0x65"
          },
          {
            "id": "1",
            "description": "handsome",
            "type": "0x2",
            "status": "0x0",
            "startBlockHeight": "0x1",
            "endBlockHeight": "0x65"
          },
          {
            "id": "2",
            "description": "remove",
            "type": "0x4",
            "status": "0x0",
            "startBlockHeight": "0x1",
            "endBlockHeight": "0x65"
          },
          {
            "id": "3",
            "description": "my diary",
            "type": "0x0",
            "status": "0x2",
            "startBlockHeight": "0x1",
            "endBlockHeight": "0x6005"
          },
          {
            "id": "4",
            "description": "go home",
            "type": "0x3",
            "status": "0x1",
            "startBlockHeight": "0x10",
            "endBlockHeight": "0x6500"
          },
          {
            "id": "5",
            "description": "eat eat",
            "type": "0x2",
            "status": "0x0",
            "startBlockHeight": "0x123123",
            "endBlockHeight": "0x6298730945"
          },
          {
            "id": "6",
            "description": "kekekekeke",
            "type": "0x1",
            "status": "0x3",
            "startBlockHeight": "0x132894723897498",
            "endBlockHeight": "0x6238483785"
          }
        ]
      };
      callback(null, obj);
      break;

    case "getPRep":
      aRandom = getRandomInt(0, 4);
      switch (aRandom) {
        case 0:
          obj = {
            "status": "0x0",
            "grade": "0x2",
            "penalty": "0x0",
            "publicKey": "0x04abcd8e137f",
            "irep": "0x2000",
            "irepUpdateBlockHeight": "0x847ea",
            "stake": "0x38372",
            "delegated": "0x74287392847",
            "totalBlocks": "0x83261e7",
            "validatedBlocks": "0x83258a9"
          };
        case 1:
          obj = {
            "status": "0x0",
            "grade": "0x2",
            "penalty": "0x1",
            "publicKey": "0x04abcd8e137f",
            "irep": "0x2000",
            "irepUpdateBlockHeight": "0x84711",
            "stake": "0x38311",
            "delegated": "0x74287392811",
            "totalBlocks": "0x8326111",
            "validatedBlocks": "0x8325811"
          };
        case 2:
          obj = {
            "status": "0x0",
            "grade": "0x2",
            "penalty": "0x2",
            "publicKey": "0x04abcd8e1322",
            "irep": "0x2022",
            "irepUpdateBlockHeight": "0x84722",
            "stake": "0x38322",
            "delegated": "0x74287392822",
            "totalBlocks": "0x8326122",
            "validatedBlocks": "0x8325822"
          };
        case 3:
          obj = {
            "status": "0x0",
            "grade": "0x2",
            "penalty": "0x3",
            "publicKey": "0x04abcd8e1333",
            "irep": "0x2033",
            "irepUpdateBlockHeight": "0x84733",
            "stake": "0x38333",
            "delegated": "0x74287392833",
            "totalBlocks": "0x8326133",
            "validatedBlocks": "0x8325833"
          };
        case 4:
          obj = {
            "status": "0x0",
            "grade": "0x2",
            "penalty": "0x4",
            "p2pEndpoint": "123.45.67.44:7100",
            "publicKey": "0x04abcd8e1344",
            "irep": "0x2044",
            "irepUpdateBlockHeight": "0x84744",
            "stake": "0x38344",
            "delegated": "0x74287392844",
            "totalBlocks": "0x8326144",
            "validatedBlocks": "0x8325844"
          };
        default:
          obj = {
            "status": "0x0",
            "grade": "0x2",
            "penalty": "0x0",
            "publicKey": "0x04abcd8e137f",
            "irep": "0x2000",
            "irepUpdateBlockHeight": "0x847ea",
            "stake": "0x38372",
            "delegated": "0x74280392800",
            "totalBlocks": "0x8326000",
            "validatedBlocks": "0x8325800"
          };
      }

      try {
        result = models.sequelize.transaction(async () => {
            return await models.Prep.findAll({
              where: {
                EOA: params.address
              }
            }, result);
          })
          .then(result => {
            for (var key in obj) {
              result[0].dataValues[key] = obj[key];
            }
            console.log("데이터 조회 완료");
            callback(null, result[0].dataValues);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 조회 실패");
      };
      break;

    case "getPReps":
      obj = {
        "blockHeight": "0x1234",
        "startRanking": "0x1",
        "totalDelegated": "0x2863c1f5cdae42f9540000000",
        "totalStake": "0x193e5939a08ce9dbd480000000",
        "preps": [{
            "name": "Banana node",
            "country": "KOR",
            "city": "Seoul",
            "grade": "0x0",
            "address": "hx8f21e5c54f006b6a5d5fe65486908592151a7c57",
            "irep": "0xc350",
            "irepUpdateBlockHeight": "0x1200",
            "lastGenerateBlockHeight": "-0x1",
            "stake": "0x21e19e0c9bab2400000",
            "delegated": "0x204fce5e3e25026110000000",
            "totalBlocks": "0x2710",
            "validatedBlocks": "0x2328"
          },
          {
            "name": "ABC Node",
            "country": "USA",
            "city": "New York",
            "grade": "0x0",
            "address": "hx1d6463e4628ee52a7f751e9d500a79222a7f3935",
            "irep": "0xc350",
            "irepUpdateBlockHeight": "0x1100",
            "lastGenerateBlockHeight": "0x1200",
            "stake": "0x28a857425466f800000",
            "delegated": "0x9ed194db19b238c000000",
            "totalBlocks": "0x2720",
            "validatedBlocks": "0x2348"
          },
          {
            "name": "TEST Node",
            "country": "KR",
            "city": "Seoul",
            "grade": "0x0",
            "address": "hx1d6463e4628ee52a7f751e9d500a79222a7f3935",
            "irep": "0xc350",
            "irepUpdateBlockHeight": "0x1100",
            "lastGenerateBlockHeight": "0x1200",
            "stake": "0x28a857425466f800000",
            "delegated": "0x9ed194db19b238c000000",
            "totalBlocks": "0x2720",
            "validatedBlocks": "0x2348"
          },
          {
            "name": "ASDFASDF Node",
            "country": "USA",
            "city": "New York",
            "grade": "0x0",
            "address": "hx1d6463e4628ee52a7f751e9d500a79222a7f3935",
            "irep": "0xc350",
            "irepUpdateBlockHeight": "0x1100",
            "lastGenerateBlockHeight": "0x1200",
            "stake": "0x28a857425466f800000",
            "delegated": "0x9ed194db19b238c000000",
            "totalBlocks": "0x2720",
            "validatedBlocks": "0x2348"
          },
          {
            "name": "raynear Node",
            "country": "JPN",
            "city": "New York",
            "grade": "0x0",
            "address": "hx1d6463e4628ee52a7f751e9d500a79222a7f3935",
            "irep": "0xc350",
            "irepUpdateBlockHeight": "0x1100",
            "lastGenerateBlockHeight": "0x1200",
            "stake": "0x28a857425466f800000",
            "delegated": "0x9ed194db19b238c000000",
            "totalBlocks": "0x2720",
            "validatedBlocks": "0x2348"
          },
          {
            "name": "myname Node",
            "country": "CHN",
            "city": "New York",
            "grade": "0x0",
            "address": "hx1d6463e4628ee52a7f751e9d500a79222a7f3935",
            "irep": "0xc350",
            "irepUpdateBlockHeight": "0x1100",
            "lastGenerateBlockHeight": "0x1200",
            "stake": "0x28a857425466f800000",
            "delegated": "0x9ed194db19b238c000000",
            "totalBlocks": "0x2720",
            "validatedBlocks": "0x2348"
          }
        ]
      };
      callback(null, obj);
      break;

    default:
      break;
  }
}
server.expose("icx_call", icx_call);

function icx_sendTransaction(args, opt, callback) {
  console.log(args);
  console.log("test");

  let _params = args.params;
  let method = _params.data.method;

  let params = _params.data.params;

  let result;

  switch (method) {
    case "setStake":

      try {
        result = models.sequelize.transaction(async () => {
            return await models.Stake.create({
              EOA: _params.from,
              value: params.value
            }, result);
          })
          .then(result => {
            console.log("데이터 추가 완료");
            callback(null, result.dataValues);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 추가 실패");
      };

      break;

    case "setDelegation":
      console.log('setDelegation');
      try {
        result = models.sequelize.transaction(async () => {
            return await models.Delegation.create({
              EOA: _params.from,
              address: params.address,
              value: params.value
            }, result);
          })
          .then(result => {
            console.log("데이터 추가 완료");
            callback(null, result.dataValues);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 추가 실패");
      };

      break;

    case "registerPRep":
      console.log('as');

      try {
        result = models.sequelize.transaction(async () => {
            return await models.Prep.create({
              EOA: _params.from,
              name: params.name,
              email: params.email,
              website: params.website,
              country: params.country,
              city: params.city,
              details: params.details,
              p2pEndpoint: params.p2pEndpoint
            }, result);
          })
          .then(result => {
            console.log("데이터 추가 완료");
            callback(null, result.dataValues);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 추가 실패");
      };

      break;

    case "unregisterPRep":
      try {
        result = models.sequelize.transaction(async () => {
            return await models.Prep.destroy({
              where: {
                EOA: _params.from
              }
            }, result);
          })
          .then(result => {
            console.log("데이터 삭제 완료");
            callback(null, result.dataValues);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 삭제 실패");
      };

      break;

    case "setPRep":
      try {
        let obj = {};

        for (var key in params) {
          if (params[key] !== '') {
            obj[key] = params[key];
          }
        }

        result = models.sequelize.transaction(async () => {
            return await models.Prep.update(obj, {
              where: {
                EOA: _params.from,
              }
            }, result);
          })
          .then(result => {
            console.log("데이터 수정 완료");
            callback(null, result.dataValues);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 수정 실패");
      };

      break;

    case "registerProposal":
      hash.update(JSON.stringify(args));
      let _id = "0x" + hash.digest('hex');

      try {
        result = models.sequelize.transaction(async () => {
            return await models.Proposal.create({
              id: _id,
              title: params.title,
              description: params.description,
              type: params.type,
              value: params.value,
            }, result);
          })
          .then(result => {
            console.log("데이터 추가 완료");
            callback(null, result.dataValues);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 추가 실패");
      };

      break;

    case "cancelProposal":

      try {
        result = models.sequelize.transaction(async () => {
            return await models.Proposal.destroy({
              where: {
                id: params.id
              }
            }, result);
          })
          .then(result => {
            console.log("데이터 삭제 완료");
            callback(null, result.dataValues);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 삭제 실패");
      };

      break;

    case "voteProposal":
      try {
        result = models.sequelize.transaction(async () => {
            return await models.Proposal.update({
              vote: params.vote
            }, {
              where: {
                id: params.id,
              }
            }, result);
          })
          .then(result => {
            console.log("데이터 수정 완료");
            callback(null, result.dataValues);
          })
      } catch (err) {
        console.log(err);
        console.log("데이터 수정 실패");
      };

      break;

    default:
      break;
  }
}
server.expose("icx_sendTransaction", icx_sendTransaction);

server.listen(8888, "localhost");
