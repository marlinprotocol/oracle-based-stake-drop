const {
  params,
  whitelistedValidators,
  registeredAddresses,
} = require("../models");
const { polkadot } = require("../constants");
const chainStartEra = parseInt(process.env.CHAIN_START_ERA);
const chainStartBlock = parseInt(process.env.CHAIN_START_BLOCK);

async function init() {
  let latestEra = await params.findOne({ param: polkadot.latestEra });
  if (!latestEra) {
    latestEra = new params({
      param: polkadot.latestEra,
      value: chainStartEra,
    });
    await latestEra.save();
  }

  let confirmedEra = await params.findOne({ param: polkadot.lastConfirmedEra });
  if (!confirmedEra) {
    confirmedEra = new params({
      param: polkadot.lastConfirmedEra,
      value: chainStartEra,
    });
    await confirmedEra.save();
  }

  await check(polkadot.lastConfirmedEraForValidators, chainStartEra);
  await check(polkadot.lastConfirmedEraForDelegators, chainStartEra);
  await check(polkadot.lastConfirmedBlock, chainStartBlock);
  await check(polkadot.latestBlock, chainStartBlock);

  await check(polkadot.feederEra, chainStartEra);
  await check(polkadot.totalStakeFeeder, chainStartEra);
  await check(polkadot.validatorStakeFeeder, chainStartEra);
  await check(polkadot.delegatorStakeFeeder, chainStartEra);
  await check(polkadot.freezeEra, chainStartEra);

  if (process.env.NODE_ENV == "dev") {
    await addValidator([
      "1zugcag7cJVBtVRnFxv5Qftn7xKAnR6YJ9x4x3XLgGgmNnS",
      "15ictvkBL2D3aWxyoqh8roJkRC1tdFw3SCLqjyssjuf6yiC9",
      "14bARWgpfEiURUS7sGGb54V6mvteRhYWDovcjnFMsLfxRxVV",
      "1hJdgnAPSjfuHZFHzcorPnFvekSHihK9jdNPWHXgeuL7zaJ",
      "13eKBARPFWBdXJAKg4fBTNUfcz4YAYfDTetRRApuz1kTDVDg",
      "1zugcajKZ8XwjWvC5QZWcrpjfnjZZ9FfxRB9f5Hy6GdXBpZ",
      "1zugcaiwmKdWsfuubmCMBgKKMLSef2TEC3Gfvv5GxLGTKMN",
      "126y5f2ePBHvYorTEGUYys53tzvno6RNVwpLStJMbVukP9dJ",
      "167UVcopJ1ZEP72wUyK2dZiTF5sz8VRXVD39eAKkRS12zYJN",
      "1xnFYogB642iL4mbqiUrkKV1xK562WMnG9z3e3C5gur4snc",
      "12zuGuVCwx4cQuSSwsFm66Hfb7iBreNGZAZrv5XNrC2NyJdC",
      "12xteUu27nj8zxMJnQyaZyrChrN9USPh3vR1w5GnB7Ur2mUR",
      "13RAsdYFy8Fxoz6ubJvbsUVBUYm9GyHToKBqYFztFTeHqKnd",
      "16Rv9ai3i7ZJnXxdaXkHE6aXtimGdj2BUJM85tMAf8xKJsfe",
      "1Wo6qcrh7wxc1kQY5nfixFuCAFuzkgiwau64SmrPXBE7vVf",
      "1bwZeqrfVQU69WgDg4exZoLp7abmfgP7btcMnfijCyX9zvT",
      "1UBzeeDPZWQxNzobGTi1HLHFQjN8vBcgnbtEYSDzfZuxFPr",
      "11uMPbeaEDJhUxzU4ZfWW9VQEsryP9XqFcNRfPdYda6aFWJ",
      "12ud6X3HTfWmV6rYZxiFo6f6QEDc1FF74k91vF76AmCDMT4j",
      "12Z3Bhjn42TPXy5re2CiYz1fqMd21i2XyBLmbekbjLXrqVBV",
      "12CN2fCWC43fPXMLia1PCTsvE491KZ1KKzG2ExvACPY6puV9",
      "12YP2b7L7gcHabZqE7vJMyF9eSZA9W68gnvb8BzTYx4MUxRo",
      "12GsUt6XbVMHvKt9NZNXBcXFvNCyTUiNhKpVnAjnLBYkZSj1",
      "12WafjZWsgVZGvFzZ7EXYFukSpLEZV3cieRYmtd6xZYGbpXr",
      "12EcabFybCY2iaurUryCRYfHbDUpj2AtA2JNhwCfcdAE55ov",
      "12ws45JuLDFtcyJVXcNbzijvzFSibrwSiRk1UJKVdggPcDcK",
      "13giQQe5CS4AAjkz1roun8NYUmZAQ2KYp32qTnJHLTcw4VxW",
      "13uW7auWPX9WAtqwkBx7yagb78PLcv8FAcPZEVCovbXoNJK4",
      "13eJW8EEepfprmeezKHn9gbgqHAk9izHyUxReA7RjDuuSTyC",
      "13Ei9Xuqwu971JiBAkZx92XgBzX1wpuRnwi5qx76ZueAnGko",
      "13XwbRe9QTAtWADatMiCNhjq7CpRjRGXLvFuRrzWVAzoz8mc",
      "13ovfMxkqtTV5P87aofiyQ3mkzkbm7Uc2BdB36TcoiqtkLk4",
      "13Qe2MpQeYCQhFYWimxxXM6epyMy9zDRd7cguxUjMziLKkPL",
      "14QBQABMSFBsT3pDTaEQdshq7ZLmhzKiae2weZH45pw5ErYu",
      "14AkAFBzukRhAFh1wyko1ZoNWnUyq7bY1XbjeTeCHimCzPU1",
      "14Y626iStBUWcNtnmH97163BBJJ2f7jc1piGMZwEQfK3t8zw",
      "14QShJ8R9gtRd9DHTpWL56etZQLT15JeLNEWHQsQMN3hDtHE",
      "14SRtmkZPGzaV1bKivd7T6xw15YRW53gjE5F2LVbiwChqKGx",
      "14GQkqk2rGYp1cfAPJY9EQWnXk6EHHYjDx44Rx3NAvDpiNau",
      "14aN2MKS7sMrof8ZPbUKs7C8CpuS939ymFf1BKgEGHmHd5jw",
      "15qomv8YFTpHrbiJKicP4oXfxRDyG4XEHZH7jdfJScnw2xnV",
      "15oKi7HoBQbwwdQc47k71q4sJJWnu5opn1pqoGx4NAEYZSHs",
      "15aPXmYSpCxdVEMAdyoED2ZGLXKMr7naU7DzfB2ayBxn6Ncn",
      "15Q4hMef4AGNKwgK5hd7k6zWvyaK8DhfhpaCHDGxdS7buxDf",
      "15MeTQLVSPPXhLHqL7ujSiqDVmkJpf4rd97zDX9Dj1NkqkWP",
      "16DKyH4fggEXeGwCytqM19e9NFGkgR2neZPDJ5ta8BKpPbPK",
      "16Sud9b5uUfUi1HXdfwb3drbYBZBLPVvdKuZhwxz2n7HR12M",
      "16ALLQukR3zfhAC9Uzb6HPYHvQWH6hcricDnskc4XL8kvePF",
      "16pYErtQ2n77cQjtZpKzvpqh1w1iDfdLHn65YYsX74tVbkN",
      "121gZtuuG6sq3BZp1UKg8oRLRZvp89SAYSxXypwDJjaSRJR5",
      "121ZiNk5DKVKUuYQtuNcHC25AD2K8bSNaaFn7qSa4JrSwYBR",
      "129TM37DNpyJqtRYYimSMp8aQZ8QW7Jg3b4qtSrRqjgAChQf",
      "134Bw4gHcAaHBYx6JVK91b1CeC9yWseVdZqyttpaN5zBHn43",
      "135q2jwLPAtsKW6vPLfBqh3Cxmi5Sj7mNL93Cx7AsYD2XRUh",
      "145Vw57NN3Y4tqFNidLTmkhaMLD4HPoRtU91vioXrKcTcirS",
      "158WyuVKFJZaTx36fNdXMg8GTXiGT42dCZA8XsEfYfZDrFyQ",
      "1293x8Max5nQW6J8ubgKWuEFMViQBAxb7CxfFakpApoRXYUC",
      "1342iFZNrBfCP9VWxqt5p39LiHp2ynyq85Ww9K7R8w6BURps",
      "1737bipUqNUHYjUB5HCezyYqto5ZjFiMSXNAX8fWktnD5AS",
      "16Rv9ai3i7ZJnXxdaXkHE6aXtimGdj2BUJM85tMAf8xKJsfe",
      "12NdCS1BNxgiedktuiA9LDWT4aUha1BL86io1bJTS6FXM8nb",
      "14wJEL79NMfcvYSjHmyxdrQxfN8MQLwv1X4iVjdw1XL1qNer",
      "12ovdbZGtHe2RVHmAitofedNiChB29Pwswtd8CShoLoMjqoB",
      "12dvyqCFhVubTDqMdojyjhkxVUMaYVXWLv8uZW1NomUunPmN",
      "126y5f2ePBHvYorTEGUYys53tzvno6RNVwpLStJMbVukP9dJ",
      "167UVcopJ1ZEP72wUyK2dZiTF5sz8VRXVD39eAKkRS12zYJN",
      "1xnFYogB642iL4mbqiUrkKV1xK562WMnG9z3e3C5gur4snc",
      "12zuGuVCwx4cQuSSwsFm66Hfb7iBreNGZAZrv5XNrC2NyJdC",
      "12xteUu27nj8zxMJnQyaZyrChrN9USPh3vR1w5GnB7Ur2mUR",
      "13T9UGfntid52aHuaxX1j6uh3zTYzMPMG1Des9Cmvf7K4xfq",
      "14xKzzU1ZYDnzFj7FgdtDAYSMJNARjDc2gNw4XAFDgr4uXgp",
      "1vEVWfqoLErB6MhhtDijrnmnHqjhrrFA5GzXGNL2HwESQ5r",
      "1EmFhcsr7xt4HiMc8KZz6W6QcjYSFukKGKeDZeBjSmjjpNM",
      "1HZMocNpdw6VYS1aKyrdu1V7kHpbdCvhL8VKayvzVzqTf6H",
      "13asdY4e7sWdJ4hbGW9n2rkNro1mx5YKB6WBCC9gvqKmLvNH",
    ]);
  }

  if (process.env.NODE_ENV == "dev") {
    await addAddresses([
      {
        address: "14GvFJE8hqLyQFXkiEvGkTVtbTRGMU4wRC6jNHHKXykPnLA1",
        ethereumAddress: "0xFC57cBd6d372d25678ecFDC50f95cA6759b3162b"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "16HvKyV9B61hsop3ZY6pWYeV537S29kd9pb9FMrPzx49ym5X",
        ethereumAddress: "0x025D3b4caCcc57D8D2485130AEE349F8C60Ab738"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "14z4r6EJMkCeQyxrAuHfdbVJRESA3veXDcTxcViHuMj5dEEA",
        ethereumAddress: "0xdeFF2Cd841Bd47592760cE068a113b8E594F8553"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "13mbLCRUQyFQWEHniQQLZhkpRbJGw4Dkttec9fUuaKkR95X5",
        ethereumAddress: "0x60fEB537C1412d1C5ea5462a0984F058c347BC13"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "15oqs89aVy6bgk7PwyULibbxzyowGBjPxuQAduxeHor3pn9Y",
        ethereumAddress: "0xd2D0cD3E49Ee6724d1d403E3D4a9ee7AA8aD7627"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "14oUkrAXTfDpYtwuhAt1twZXCQ5VFfqE3dyXXY8WTFyexnez",
        ethereumAddress: "0x46D07d37704B15388d97Ca5F95E64F6d9801f9BF"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "1nfsMtBMV2b5CWr1PGgRhsPp7eg5wog6Aw7QF6rueWASqMU",
        ethereumAddress: "0x90C1AB208Bc7C22a4306BC70899622934BF0F513"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "124abMcBcToayqnaC3XhZZTmEwXR82B7PbwxXw1PuriRLXff",
        ethereumAddress: "0xFB22c0B729BF5F56aD904f71307FC247A82C2AF5"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "14GPSy2ugNGEV2ypB6X6h8yZ8sRiLEsyBHj6SemJPg36Q4P6",
        ethereumAddress: "0x15A9Cdbf563a613d4A07c890aC7A404a17157236"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "138J63FK8DcZMRgfBXmvpMXFVztwwT3MA87pWrTW8YDLjLKZ",
        ethereumAddress: "0x8da03780fcAF72e490c17e4cab8ad63195bE2084"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "15Dk12SYAncNj5vhjszjGetWhPAXrcShnC4tnh9Y3rbgUpis",
        ethereumAddress: "0x2a63a4188082270f172Ff8988fBaB252e4201BEe"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "15Mo7G4HY7c9RvR4ooKS975SQxj8f2Htxxw7VT99BHg1A6ug",
        ethereumAddress: "0x811e09Fd507730E9D42424d828908f714C5A607C"
          .toLowerCase()
          .split("x")[1],
      },
      {
        address: "121fFdzRKVJEPAcK2jqY3iJFwuue1MsUCXbEgdqiV9BsBDsS",
        ethereumAddress: "0xF1A1f124BA6914087f54825b4bCF1907B61d718E"
          .toLowerCase()
          .split("x")[1],
      },
    ]);
  }

  return "Init Complete";
}

module.exports = init;

async function check(param, value) {
  let _param = await params.findOne({ param });
  if (!_param) {
    await new params({ param, value }).save();
  }
  return;
}

async function addAddresses(registrations) {
  for (let index = 0; index < registrations.length; index++) {
    const element = registrations[index];
    let { address, ethereumAddress } = element;
    await addAddress(address, ethereumAddress);
  }
  return;
}

async function addAddress(address, ethereumAddress) {
  let _data = await registeredAddresses.findOne({ address });
  if (!_data) {
    await new registeredAddresses({ address, ethereumAddress }).save();
  }
  return;
}

async function addValidator(validators) {
  for (let index = 0; index < validators.length; index++) {
    const element = validators[index];
    await addWhiteListedValidator(element);
  }
}

async function addWhiteListedValidator(validatorAddress) {
  let _validator = await whitelistedValidators.findOne({ validatorAddress });
  if (!_validator) {
    await new whitelistedValidators({ validatorAddress }).save();
  }
  return;
}
