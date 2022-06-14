type CookieOptions = Partial<{
  path: string;
  expires: string | Date;
  domain: string;
  'max-age': number;
  secure: boolean;
  samesite: boolean;
}>;

function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  const optionsKeys = Object.keys(options) as Array<keyof CookieOptions>;

  optionsKeys.forEach(key => {
    updatedCookie += '; ' + key;
    const optionValue = options[key];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  });

  document.cookie = updatedCookie;
}

function deleteCookie(name: string): void {
  setCookie(name, '', {
    'max-age': -1,
  });
}

export { getCookie, setCookie, deleteCookie };
