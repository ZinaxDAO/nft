const { expect } = require("chai");

describe('Transact', function () {
  beforeEach(async function() {
    [owner, wallet1, wallet2] = await ethers.getSigners();

    Transact = await ethers.getContractFactory('Transact', owner);
    Busd = await ethers.getContractFactory('Busd', wallet1);
    transact = await Transact.deploy();
    busd = await Busd.deploy();

    busd.connect(wallet1).transfer(wallet2.address, 10000);

    await busd.connect(wallet1).approve(
      transact.address,
      3000
    );
    await busd.connect(wallet2).approve(
      transact.address,
      3000
    );

    BUSD = ethers.utils.formatBytes32String('BUSD');
    await transact.whitelistToken(
      BUSD,
      busd.address
    );
  });

  describe('deployment', function () {
    it('should mint tokens to wallet 1', async function () {
      expect(await busd.balanceOf(wallet1.address)).to.equal(10000);
    })

    it('should transfer tokens to wallet 2', async function () {
      expect(await busd.balanceOf(wallet2.address)).to.equal(10000);
    })

    it('should whitelist busd on the contract', async function () {
      expect(
        await transact.whitelistedTokens(BUSD)
      ).to.equal(busd.address);
    })
  })

  describe('depositTokens', function () {
    it('should deposit busd', async function () {
      await transact.connect(wallet1).depositTokens(
        1000,
        BUSD,
      );
      await transact.connect(wallet2).depositTokens(
        1000,
        BUSD,
      );

      expect(await busd.balanceOf(wallet1.address)).to.equal(9000);
      expect(await busd.balanceOf(wallet2.address)).to.equal(9000);

      expect(
        await transact.accountBalances(wallet1.address, BUSD)
      ).to.equal(1000);
      expect(
        await transact.accountBalances(wallet2.address, BUSD)
      ).to.equal(1000);
    });
  })

  describe('withdraw', function () {
    it('should withdraw busd from the contract', async function () {
      await transact.connect(wallet1).depositTokens(
        1000,
        BUSD,
      );
      await transact.connect(wallet1).withdrawTokens(
        500,
        BUSD,
      );

      expect(await busd.balanceOf(wallet1.address)).to.equal(9500);
      expect(
        await transact.accountBalances(wallet1.address, BUSD)
      ).to.equal(500);
    })

    it('should not allow withdrawing more than has been deposited', async function () {
      await expect(
        transact.connect(wallet1).withdrawTokens(100000, BUSD)
      ).to.be.revertedWith("Insufficent funds")
    })
  })
})