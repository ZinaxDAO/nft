const main = async () => {

    const nftContractFactory2 = await hre.ethers.getContractFactory('ZinarStakingSystem');
    const nftContract2 = await nftContractFactory2.deploy();
    await nftContract2.deployed();
    console.log("Contract deployed to:", nftContract2.address);

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