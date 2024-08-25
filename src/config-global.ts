import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
export const MERCHANT_SITE_URL = process.env.NEXT_PUBLIC_MERCHANT_SITE_URL ?? 'https://merchant.reserve.expert';

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
