export default {
  call: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#ED3035" d="M14.716 10.502c-.98 0-1.941-.153-2.853-.454-.446-.153-.995-.013-1.268.267l-1.799 1.358C6.71 10.56 5.424 9.275 4.326 7.204l1.318-1.752c.343-.342.465-.842.318-1.31-.302-.917-.456-1.878-.456-2.858C5.506.576 4.93 0 4.222 0H1.284C.576 0 0 .576 0 1.284 0 9.398 6.602 16 14.716 16c.708 0 1.284-.576 1.284-1.284v-2.93c0-.708-.576-1.284-1.284-1.284z" />
    </svg>
  ),
  email: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
      <g fill="#ED3035">
        <path d="M13.258 6.978L20 11.24 20 2.535zM0 2.535L0 11.24 6.742 6.978zM18.75 0H1.25C.626 0 .131.465.038 1.064L10 7.628l9.962-6.564C19.87.465 19.374 0 18.75 0zM12.113 7.732l-1.77 1.166C10.24 8.966 10.12 9 10 9c-.12 0-.239-.034-.344-.102L7.887 7.73.04 12.695c.096.594.589 1.055 1.21 1.055h17.5c.621 0 1.114-.461 1.21-1.055l-7.848-4.963z" transform="translate(0 .5)" />
      </g>
    </svg>
  ),
  'user-profile': () => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40">
      <defs>
        <circle id="prefix__a" cx="20" cy="20" r="20" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="#4C4C4C" d="M19 19H40V40H19z" />
        <mask id="prefix__b" fill="#fff">
          <use xlinkHref="#prefix__a" />
        </mask>
        <use fill="#4C4C4C" xlinkHref="#prefix__a" />
        <g stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" mask="url(#prefix__b)">
          <g transform="translate(12 11)">
            <path d="M16 18v-2c0-2.21-1.79-4-4-4H4c-2.21 0-4 1.79-4 4v2" />
            <circle cx="8" cy="4" r="4" />
          </g>
        </g>
      </g>
    </svg>
  ),
  'power-setting': () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16">
      <path d="M0 0h24v24H0z" fill="none" />
      <path fill="#ED3035" d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
    </svg>
  ),
  'error-info': () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <g fill="none" fillRule="evenodd">
        <path d="M0 0H20V20H0z" />
        <g fillRule="nonzero">
          <path fill="#ED3035" d="M8.333 0C3.738 0 0 3.738 0 8.333c0 4.596 3.738 8.334 8.333 8.334 4.596 0 8.334-3.738 8.334-8.334C16.667 3.738 12.929 0 8.333 0z" transform="translate(1.667 1.667)" />
          <path fill="#ECEFF1" d="M9.028 12.5c0 .384-.311.694-.695.694-.383 0-.694-.31-.694-.694 0-.384.31-.694.694-.694.384 0 .695.31.695.694z" transform="translate(1.667 1.667)" />
          <path fill="#FAFAFA" d="M9.028 9.722c0 .384-.311.695-.695.695-.383 0-.694-.311-.694-.695V4.167c0-.384.311-.695.694-.695.384 0 .695.311.695.695v5.555z" transform="translate(1.667 1.667)" />
        </g>
      </g>
    </svg>
  ),
  cross: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <g fill="none" fillRule="evenodd">
        <path d="M0 0H20V20H0z" />
        <g stroke="#4C4C4C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <path d="M12 0L0 12M0 0L12 12" transform="translate(4 4)" />
        </g>
      </g>
    </svg>
  ),
};
