import puppeteer from "puppeteer";
import program from "commander";

program
  .version("1.0.0")
  .option("-u, --user [value]", "username for login")
  .option("-p, --pass [value]", "passwd for login");

program
  .command("login")
  .description("login to campus network")
  .action(async () => {
    const { user, pass } = program;
    if (user && pass) {
      await login(user, pass);
    } else {
      console.log("must input user & pass");
    }
  });

program.parse(process.argv);

if (!program.args.length) program.help();

async function login(user, pass) {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto("http://10.36.254.11/");

  page
    .waitForSelector("[name='PageTips']", { timeout: 3000 })
    .then(async () => {
      const pageTips = await page.evaluate(() => document.getElementsByName("PageTips")[0].textContent);
      // 已经登录
      console.log(pageTips);
      process.exit();
    })
    .catch(async () => {
      // 去登陆
      // 执行登录操作
      await page.evaluate(
        new Function(
          "u",
          "p",
          `
        document.getElementsByName("DDDDD")[1].value = u;
        document.getElementsByName("upass")[1].value = p; 
        document.getElementsByName("0MKKey")[1].click();
        `
        ),
        user,
        pass
      );

      page
        .waitForSelector("[name='PageTips']", { timeout: 5000 })
        .then(async () => {
          const pageTips = await page.evaluate(() => document.getElementsByName("PageTips")[0].textContent);
          // 已经登录
          console.log(pageTips);
          process.exit();
        })
        .catch(async () => {
          const errorMsg = await page.evaluate(() => document.getElementById("message").textContent);
          console.log(errorMsg);
          process.exit();
        });
    });
}
