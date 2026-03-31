import type { Access } from "payload";

export const isLoggedIn: Access = ({ req: { user } }) => {
	// Return true if user is logged in, false if not
	return Boolean(user);
};
