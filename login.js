const puppeteer = require('puppeteer');

const ID = {
  login: '#email',
  pass: '#pass',
  submit: '#loginbutton',
  userNavigationLabel: '#userNavigationLabel'
};

const User = {
    user: '01667702486',
    pass: 'qu@ngtruong92'
};

const Profile = {
  headless: false,
  userDataDir: 'D:\\nodejs\\Crawler\\ProfileData'
}

var isLogged = false;

const login = async() => {
  const browser = await puppeteer.launch(Profile)
  const page = await browser.newPage()
    try {
        await page.goto('https://www.facebook.com/', {waitUntil: 'networkidle2'})
        await page.setRequestInterception(true);
        page.on('request', request => {
          if (request.resourceType() === 'image')
            request.abort();
          else
            request.continue();
        });
        await page.$eval(ID.login, input => input.value = '');
        await page.$eval(ID.pass, input => input.value = '');
        await page.type(ID.login, User.user);
        await page.type(ID.pass, User.pass);
        await page.click(ID.submit);
        console.log("login done");
        await page.waitForNavigation();
    } catch(e) {
        console.log('something went wrong: ' + e)
    }
}

login();
