// Function to display credited message
function creditedMsg(val) {
  let msg = document.querySelector(".creditedAmount");
  let text = `<p>Amount Credited ${Math.abs(val)}</p>
  <span>Hides in 3 seconds</span>`;
  msg.innerHTML = text;
  msg.style.opacity = "1";
  msg.style.zIndex = "100";
  setTimeout(() => {
    msg.style.opacity = "0";
    msg.style.bottom = "10%";
  }, 3000);
}

// Function to display withdrawal message
function withdrawlAmountMsg(val) {
  let msg = document.querySelector(".withdrawlAmount");
  let text = `<p>Amount Withdraw ${Math.abs(val)}</p>
  <span>Hides in 3 seconds</span>`;
  msg.innerHTML = text;
  msg.style.opacity = "1";
  setTimeout(() => {
    msg.style.opacity = "0";
    msg.style.bottom = "10%";
  }, 3000);
}

// Function to display account opening greeting
function accountOpeningGreet(username) {
  let msg = document.querySelector(".createAccountMessage");
  let text = `Thank You ${username} For Creating Your Bank Account in Infra-Bank`;
  msg.textContent = text;
  msg.style.opacity = "1";
  setTimeout(() => {
    msg.style.opacity = "0";
    msg.style.bottom = "10%";
  }, 3000);
}

// Account class
class Account {
  constructor(firstName, lastName, AccountPin, movements) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.AccountPin = AccountPin;
    this.movements = [1000, 200, -450, 600, 800, -1000, 500, -800];
  }
}

// Function to handle welcome page display
function welcomePage() {
  let welcomePageShow = document.querySelector(".WelcomePage");
  setTimeout(() => {
    welcomePageShow.style.opacity = "0";
    setTimeout(() => {
      welcomePageShow.style.display = "none";
    }, 300);
  }, 2000);
}
welcomePage();
// Displaying total balance
function TotalBalance(arr) {
  let TotalBalance = document.querySelector(".balanceShow");
  const TotalBalanceDisplay = arr.reduce((el, acc) => (acc += el));
  if (TotalBalanceDisplay < 0) {
    TotalBalance.classList.add("minusMoney");
    TotalBalance.textContent = `-$${Math.abs(TotalBalanceDisplay)}`;
  } else {
    TotalBalance.classList.remove("minusMoney");
    TotalBalance.textContent = `$${TotalBalanceDisplay}`;
  }
}

// Display total credits
function TotalCreditShow(arr) {
  let TotalCredit = document.querySelector(".CreditShows");
  const TotalCreditDisplay = arr
    .filter((el) => el > 0)
    .reduce((el, acc) => (acc += el));
  TotalCredit.textContent = `$${TotalCreditDisplay}`;
}

// Display total debit
function TotalDebitShow(arr) {
  let TotalWithdrawls = document.querySelector(".WithdrawlShows");
  const TotalWithdrawDisplay = arr
    .filter((el) => el < 0)
    .reduce((el, acc) => (acc += el));
  TotalWithdrawls.textContent = `$${Math.abs(TotalWithdrawDisplay)}`;
}

// Event listener for create account button
let createAccountBtn = document.querySelector(".submitAccountCreation");
createAccountBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let userFirstName = document.querySelector("#fname").value;
  let userLastName = document.querySelector("#sname").value;
  let userPhone = document.querySelector("#num").value;
  let userPin = document.querySelector("#accountPin").value;

  if (
    userFirstName === "" ||
    userLastName === "" ||
    userPhone === "" ||
    userPin === ""
  ) {
    alert("Fill out the form completely");
  } else {
    accountOpeningGreet(userFirstName);
    setTimeout(() => {
      document.querySelector(".createAccountSection").style.opacity = "0";
      document.querySelector(".createAccountSection").style.display = "none";
    }, 1000);

    let acc1 = new Account(userFirstName, userLastName, userPin);
    let UserMovements = acc1.movements;
    let Movements = document.querySelector(".ShowMovements");
    let date = new Date();

    UserMovements.forEach((el) => {
      let html = `<div class="movements ${
        el < 0 ? "money_withdrawl" : "money_credited"
      }">
        <div class="date">Date: ${date.toLocaleDateString()}</div>
        <div class="withdrawl__amount">$${Math.abs(el)}</div>
      </div>`;
      Movements.insertAdjacentHTML("beforeend", html);
    });

    TotalBalance(UserMovements);
    TotalCreditShow(UserMovements);
    TotalDebitShow(UserMovements);

    // Withdraw Money Section
    const withdrawBtn = document.querySelector(".RequestMoneyButton");
    const withdrawAmount = document.querySelector("#RequestLoanMoney");
    withdrawBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Add the new withdrawal to UserMovements
      const newWithdrawal = -parseFloat(withdrawAmount.value);
      UserMovements.unshift(newWithdrawal);
      TotalBalance(UserMovements);
      TotalCreditShow(UserMovements);
      TotalDebitShow(UserMovements);

      // Update the HTML representation of movements with only the new withdrawal
      let date = new Date();
      let html = `<div class="movements money_withdrawl">
            <div class="date">Date: ${date.toLocaleDateString()}</div>
            <div class="withdrawal__amount">$${Math.abs(newWithdrawal)}</div>
      </div>`;

      Movements.insertAdjacentHTML("afterbegin", html);
      withdrawAmount.value = "";
      withdrawAmount.focus();
      withdrawlAmountMsg(newWithdrawal);
    });

    // Add New Credited
    const creditedAmountBtn = document.querySelector(".TransferAmountBtn");
    const creditAmountValue = document.querySelector("#TransferAmount");
    creditedAmountBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const newCredit = parseFloat(creditAmountValue.value);
      UserMovements.unshift(newCredit);
      TotalBalance(UserMovements);
      TotalCreditShow(UserMovements);
      TotalDebitShow(UserMovements);

      let date = new Date();
      let html = `<div class="movements money_credited">
      <div class="date">Date: ${date.toLocaleDateString()}</div>
      <div class="withdrawal__amount">$${newCredit}</div>
      </div>`;

      Movements.insertAdjacentHTML("afterbegin", html);
      creditAmountValue.value = "";
      creditAmountValue.focus();
      creditedMsg(newCredit);
    });

    // Closing Account
    let logOutButton = document.querySelector(".CloseAccountButton");
    logOutButton.addEventListener("click", function (e) {
      let userLogout = document.querySelector("#Logoutusername");
      let userLogoutPin = document.querySelector("#LogoutuserPin");
      let Bank = document.querySelector(".BankingPortal");
      e.preventDefault();

      if (
        userLogout.value === acc1.firstName &&
        userLogoutPin.value === acc1.AccountPin
      ) {
        console.log("Logout");
        Bank.style.opacity = "0";
        setTimeout(() => {
          document.querySelector(".WelcomePage").style.opacity = "1";
          document.querySelector(".WelcomePage").style.display = "flex";
        }, 1000);
      } else {
        alert("Invalid UserName and UserPin");
      }
    });
  }
});
