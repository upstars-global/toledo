module.exports = async (page, scenario) => {
  let cookies = [];

  // READ COOKIES FROM FILE IF EXISTS
  if (scenario.cookies) {
    const { protocol, hostname} = new URL(scenario.url)
    cookies = scenario.cookies.map(cookie => {
      return {
        "domain": `${protocol}//${hostname}`,
        "path": "/",
        ...cookie,
        "expirationDate": 1798790400,
        "hostOnly": false,
        "httpOnly": false,
        "secure": false,
        "session": false,
        "sameSite": "no_restriction"
      }
    })
  }

  // MUNGE COOKIE DOMAIN
  cookies = cookies.map(cookie => {
    if (cookie.domain.startsWith('http://') || cookie.domain.startsWith('https://')) {
      cookie.url = cookie.domain;
    } else {
      cookie.url = 'https://' + cookie.domain;
    }
    delete cookie.domain;
    return cookie;
  });

  // SET COOKIES
  const setCookies = async () => {
    return Promise.all(
      cookies.map(async (cookie) => {
        await page.setCookie(cookie);
      })
    );
  };
  await setCookies();
  console.log('Cookie state restored with:', JSON.stringify(cookies, null, 2));
};
