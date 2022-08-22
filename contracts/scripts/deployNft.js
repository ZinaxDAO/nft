const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('ZinarNFTtest');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.

  let txn = await nftContract.mintZinar05(1)
  await txn.wait()
  console.log()
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();